# 🌱 Farmer2Gov

### Digital Public Infrastructure for Agricultural Procurement

Farmer2Gov is a **full-stack agricultural platform** designed to streamline the journey from pre-harvest crop registration to government procurement.

The platform connects farmers, procurement officers, administrators, and customers through a unified digital workflow that includes **crop registration, computer-vision-based quality assessment, procurement slot booking, direct-to-customer marketplace functionality, and procurement management**.

---

## 🚀 Live Application

**Frontend:** [farmer2-gov.vercel.app](https://farmer2-gov.vercel.app/)

**Backend API:** [farmer2gov.onrender.com](https://farmer2gov.onrender.com/)

**API Documentation:** [Swagger UI](https://farmer2gov.onrender.com/docs)

---

## ✨ Key Features

### 🌾 Farmer Portal

* Farmer registration and authentication
* Crop registration
* Crop quantity and harvest details
* Crop image upload
* Computer-vision-based crop quality assessment
* Moisture, impurity, and uniformity analysis
* Procurement center slot booking
* Marketplace product management
* Order fulfillment
* Sales and activity tracking

### 👮 Procurement Officer Portal

* View scheduled farmer registrations
* Inspect crop submissions
* Record procurement measurements
* Review moisture and quality information
* Approve procurement submissions
* Generate procurement receipts
* Print procurement records

### 🛠️ Administrator Dashboard

* Platform statistics
* Crop registration analytics
* State-level metrics
* Procurement monitoring
* User and platform management
* Analytics and forecast visualization

### 🛒 Direct-to-Customer Marketplace

* Browse farm products
* Product search and category filtering
* Shopping cart
* Coupon support
* Checkout workflow
* Simulated payment options
* Tax invoice generation
* Order tracking
* Delivery tracking interface
* Farmer-side order fulfillment

### 🌐 Multilingual Interface

The application supports multiple languages, including:

* English
* తెలుగు
* हिंदी

---

## 🧠 Computer Vision Quality Assessment

Farmer2Gov includes a computer-vision module for analyzing uploaded crop samples.

The system processes crop images and provides quality-related measurements such as:

* Moisture estimation
* Impurity detection
* Uniformity assessment

The analysis is implemented using **OpenCV** on the backend.

---

## 🏗️ System Architecture

```text
                         ┌──────────────────────┐
                         │        Users         │
                         │ Farmer / Customer    │
                         │ Officer / Admin      │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   React + Vite UI    │
                         │   Tailwind CSS       │
                         └──────────┬───────────┘
                                    │
                              REST API
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │     FastAPI Backend  │
                         │ Authentication       │
                         │ Crop Management      │
                         │ Procurement          │
                         │ Marketplace          │
                         │ Quality Analysis     │
                         └──────────┬───────────┘
                                    │
                  ┌─────────────────┼─────────────────┐
                  ▼                 ▼                 ▼
           ┌────────────┐   ┌──────────────┐   ┌─────────────┐
           │ PostgreSQL │   │    SQLite    │   │   OpenCV    │
           │ Production │   │   Fallback   │   │ Crop        │
           │ Database   │   │ Development  │   │ Analysis    │
           └────────────┘   └──────────────┘   └─────────────┘
```

---

## 🛠️ Technology Stack

### Frontend

| Technology    | Purpose                           |
| ------------- | --------------------------------- |
| React         | User interface                    |
| TypeScript    | Type-safe frontend development    |
| Vite          | Frontend build tooling            |
| Tailwind CSS  | Responsive styling                |
| React Context | Authentication and language state |
| Leaflet       | Interactive maps and tracking     |

### Backend

| Technology | Purpose                         |
| ---------- | ------------------------------- |
| Python     | Backend development             |
| FastAPI    | REST API framework              |
| SQLAlchemy | Database ORM                    |
| Pydantic   | Request and response validation |
| JWT        | Authentication                  |
| bcrypt     | Password security               |
| OpenCV     | Crop image analysis             |

### Database

| Technology | Purpose                               |
| ---------- | ------------------------------------- |
| PostgreSQL | Production database                   |
| SQLite     | Local development / fallback database |

### Deployment

| Platform     | Usage               |
| ------------ | ------------------- |
| Vercel       | Frontend deployment |
| Render       | Backend deployment  |
| Git & GitHub | Version control     |

---

## 📂 Project Structure

```text
Farmer2Gov/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── auth.py
│   │   └── ai.py
│   │
│   ├── requirements.txt
│   ├── seed.py
│   ├── migrate.py
│   └── runtime.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.*
│
├── uploads/
├── ORIGINAL_SUBMISSION.md
├── runtime.txt
└── README.md
```

---

# ⚙️ Local Development

## Prerequisites

Install:

* Python 3.10+
* Node.js 18+
* npm
* Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/Akshitha363/Farmer2Gov.git
cd Farmer2Gov
```

---

## 2. Backend Setup

Navigate to the backend:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### macOS / Linux

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Initialize sample data:

```bash
python seed.py
```

Run database migrations:

```bash
python migrate.py
```

Start the FastAPI server:

```bash
uvicorn app.main:app --reload --port 8000
```

Backend:

```text
http://localhost:8000
```

Swagger API documentation:

```text
http://localhost:8000/docs
```

---

## 3. Frontend Setup

Open a second terminal and navigate to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Set the backend API URL using the frontend environment configuration.

Example:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Start the development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🔐 Authentication & Access Control

The application provides role-based authentication for different users.

| Role                | Main Capabilities                                                |
| ------------------- | ---------------------------------------------------------------- |
| Farmer              | Crop registration, quality assessment, slot booking, marketplace |
| Customer            | Product browsing, cart, checkout, orders                         |
| Procurement Officer | Crop inspection, approval, procurement records                   |
| Administrator       | Analytics and platform monitoring                                |

Authentication uses **JWT-based authorization**, with protected frontend routes and backend API validation.

---

## 🔄 Core Workflow

### Farmer → Government Procurement

```text
Farmer Registration
        │
        ▼
Crop Registration
        │
        ▼
Crop Image Upload
        │
        ▼
Computer Vision Quality Assessment
        │
        ▼
Procurement Slot Booking
        │
        ▼
Officer Inspection
        │
        ▼
Procurement Approval
        │
        ▼
Procurement Receipt
```

### Farmer → Customer Marketplace

```text
Farmer Product Listing
        │
        ▼
Customer Browses Marketplace
        │
        ▼
Add Products to Cart
        │
        ▼
Checkout
        │
        ▼
Simulated Payment
        │
        ▼
Order Confirmation
        │
        ▼
Farmer Fulfillment
        │
        ▼
Order Tracking
```

---

## 🧪 Testing

Backend tests can be executed using:

```bash
cd backend
pytest -v
```

The test environment uses SQLite for isolated backend testing.

---

## 🌐 Deployment

### Frontend

The React/Vite frontend is deployed using **Vercel**.

Production frontend:

**https://farmer2-gov.vercel.app/**

The frontend uses the `VITE_API_BASE_URL` environment variable to connect to the deployed backend.

### Backend

The FastAPI backend is deployed using **Render**.

Production API:

**https://farmer2gov.onrender.com/**

Interactive API documentation:

**https://farmer2gov.onrender.com/docs**

The backend supports PostgreSQL for production deployments and SQLite as a local fallback.

---

## 📊 API Documentation

The backend provides interactive Swagger documentation through FastAPI.

**[Open Swagger API Documentation](https://farmer2gov.onrender.com/docs)**

The API covers areas including:

* Authentication
* Farmer management
* Crop registration
* Quality assessment
* Procurement
* Marketplace
* Orders
* Administrative analytics

---

## 🗄️ Database

Farmer2Gov is designed to work with:

### PostgreSQL

Used for production database deployments.

### SQLite

Used as a local development and fallback database.

The backend selects the configured database through environment configuration, allowing the application to run locally without requiring a PostgreSQL server.

---

## 🔒 Security Considerations

The project demonstrates several application-security concepts:

* JWT-based authentication
* Password hashing
* Protected API routes
* Role-based access control
* Request validation using Pydantic
* Environment-based API configuration
* Separation of frontend and backend services

> The application is a student/hackathon project and should not be considered production-ready without additional security hardening, infrastructure controls, and security testing.

---

## 📚 Project Documentation

Additional documentation is available in the repository:

* [`ORIGINAL_SUBMISSION.md`](ORIGINAL_SUBMISSION.md) — Original project submission
* [`backend/`](backend/) — FastAPI backend
* [`frontend/`](frontend/) — React frontend

---

## 🚀 Future Enhancements

* Production-grade notification system
* Advanced crop quality models
* Expanded government procurement integrations
* Real payment gateway integration
* Real-time delivery tracking
* Advanced farmer analytics
* Cloud object storage for crop images
* Enhanced accessibility
* Comprehensive automated testing
* Production monitoring and observability

---

## 📖 Learning Outcomes

This project provided practical experience with:

* Full-stack application development
* React and TypeScript
* FastAPI REST API development
* JWT authentication
* Role-based access control
* SQLAlchemy and relational databases
* PostgreSQL and SQLite
* Computer vision with OpenCV
* Responsive UI development
* REST API integration
* Environment-based configuration
* Vercel and Render deployment
* Git and GitHub collaboration

---

## 👩‍💻 Contributors

**Akshitha Gasikanti**
B.Tech Information Technology Student

---

## 📜 License

See the repository for the applicable project licensing information.
