import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  token: string | null;
  role: string | null;
  userId: number | null;
  name: string | null;
  isAuthenticated: boolean;
  login: (token: string, role: string, userId: number, name: string) => void;
  logout: () => void;
  apiFetch: (url: string, options?: RequestInit) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  useEffect(() => {
    const savedToken = localStorage.getItem('f2g_token');
    const savedRole = localStorage.getItem('f2g_role');
    const savedUserId = localStorage.getItem('f2g_user_id');
    const savedName = localStorage.getItem('f2g_name');

    if (savedToken && savedRole && savedUserId && savedName) {
      setToken(savedToken);
      setRole(savedRole);
      setUserId(parseInt(savedUserId));
      setName(savedName);
    }
    setLoading(false);
  }, []);

  const login = (token: string, role: string, userId: number, name: string) => {
    setToken(token);
    setRole(role);
    setUserId(userId);
    setName(name);
    localStorage.setItem('f2g_token', token);
    localStorage.setItem('f2g_role', role);
    localStorage.setItem('f2g_user_id', userId.toString());
    localStorage.setItem('f2g_name', name);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUserId(null);
    setName(null);
    localStorage.removeItem('f2g_token');
    localStorage.removeItem('f2g_role');
    localStorage.removeItem('f2g_user_id');
    localStorage.removeItem('f2g_name');
  };

  const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const headers = new Headers(options.headers || {});
    
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    // Set JSON content-type if not uploading file (multipart/form-data sets boundary itself)
    if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Network response was not ok' }));
        let errMsg = 'An error occurred';
        if (errorData && errorData.detail) {
          if (typeof errorData.detail === 'string') {
            errMsg = errorData.detail;
          } else if (Array.isArray(errorData.detail)) {
            errMsg = errorData.detail.map((err: any) => {
              const loc = err.loc ? err.loc.join('.') : 'field';
              return `${loc}: ${err.msg}`;
            }).join(', ');
          } else {
            errMsg = JSON.stringify(errorData.detail);
          }
        }
        throw new Error(errMsg);
      }

      return response.json();
    } catch (error: any) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error(`Failed to fetch from backend at ${API_BASE_URL}. Please ensure the FastAPI server is running on port 8000.`);
      }
      throw error;
    }
  };

  const isAuthenticated = !!token;

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gov-green-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ token, role, userId, name, isAuthenticated, login, logout, apiFetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
