import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
import sys

# Ensure backend directory is in python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.main import app, get_db
from app.database import Base

TEST_DATABASE_URL = "sqlite:///./test_temp.db"

engine = create_engine(
    TEST_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Override database dependency in FastAPI
def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture(scope="module", autouse=True)
def setup_db():
    # Create tables
    Base.metadata.create_all(bind=engine)
    yield
    # Clean up
    Base.metadata.drop_all(bind=engine)
    engine.dispose()
    if os.path.exists("./test_temp.db"):
        try:
            os.remove("./test_temp.db")
        except Exception:
            pass

def test_otp_request():
    response = client.post(
        "/api/auth/otp/request",
        json={"phone": "9812345678", "role": "farmer"}
    )
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["success"] is True
    assert "otp" in json_data
    assert len(json_data["otp"]) == 6

def test_register_farmer():
    response = client.post(
        "/api/auth/register/farmer",
        json={
            "name": "Test Farmer",
            "phone": "9999999999",
            "land_area": 5.5,
            "state": "Andhra Pradesh",
            "district": "Guntur",
            "mandal": "Tenali",
            "village": "Angalakuduru",
            "language_preference": "te"
        }
    )
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["success"] is True
    assert "Registration successful" in json_data["message"]

def test_otp_verify_invalid():
    # Verify with wrong OTP
    response = client.post(
        "/api/auth/otp/verify",
        json={"phone": "9999999999", "otp": "000000", "role": "farmer"}
    )
    assert response.status_code == 400

def test_otp_verify_correct_mock_override():
    # Register the user first in this session
    client.post(
        "/api/auth/register/farmer",
        json={
            "name": "Test Farmer OTP",
            "phone": "9876543201",
            "land_area": 3.0,
            "state": "Telangana",
            "district": "Medchal",
            "mandal": "Medchal",
            "village": "Medchal",
            "language_preference": "en"
        }
    )
    # Using the universal OTP '123456' which is overridden in main.py for demo purposes
    response = client.post(
        "/api/auth/otp/verify",
        json={"phone": "9876543201", "otp": "123456", "role": "farmer"}
    )
    assert response.status_code == 200
    json_data = response.json()
    assert "access_token" in json_data
    assert json_data["role"] == "farmer"
    assert json_data["name"] == "Test Farmer OTP"
