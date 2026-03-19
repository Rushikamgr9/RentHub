import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const API_URL = process.env.REACT_APP_API_URL || '';
const API_BASE = API_URL || '';
const TOKEN_KEY = 'roughrenthub_token';
const USER_KEY = 'roughrenthub_user';

const DEMO_USERS = [
  { id: '1', email: 'tenant@test.com', password: 'password123', role: 'tenant' },
  { id: '2', email: 'landlord@test.com', password: 'password123', role: 'landlord' },
];

function mockLogin(email, password, selectedRole) {
  const u = DEMO_USERS.find(
    (x) => x.email.toLowerCase() === email.toLowerCase() && x.password === password
  );
  if (u) return { id: u.id, email: u.email, role: u.role };
  if (selectedRole && (email && password)) return { id: 'demo', email, role: selectedRole };
  return null;
}

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(!!localStorage.getItem(TOKEN_KEY));
  const [demoMode, setDemoMode] = useState(false);

  const setToken = (newToken, newUser) => {
    if (newToken) {
      localStorage.setItem(TOKEN_KEY, newToken);
      setTokenState(newToken);
    } else {
      localStorage.removeItem(TOKEN_KEY);
      setTokenState(null);
    }
    if (newUser !== undefined) {
      if (newUser) localStorage.setItem(USER_KEY, JSON.stringify(newUser));
      else localStorage.removeItem(USER_KEY);
      setUser(newUser);
    }
  };

  const login = async (email, password, selectedRole = 'tenant') => {
    setDemoMode(false);
    const url = `${API_BASE}/api/auth/login`;
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setToken(data.token, data.user);
        return data.user;
      }
      if (res.status === 401)
        throw new Error("That email and password don't match. Double-check and try again.");
      throw new Error(data.error || "Something went wrong. Please try again.");
    } catch (err) {
      setDemoMode(true);
      const fallback = mockLogin(email, password, selectedRole);
      if (fallback) {
        setToken('demo-' + Math.random().toString(36).slice(2), fallback);
        return fallback;
      }
      throw new Error(
        "Use tenant@test.com or landlord@test.com with password: password123 — or pick a role and use any email."
      );
    }
  };

  const logout = () => {
    setToken(null, null);
    setDemoMode(false);
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    if (token.startsWith('demo-')) {
      setLoading(false);
      return;
    }
    const url = `${API_BASE}/api/auth/me`;
    fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .catch(() => setToken(null, null))
      .finally(() => setLoading(false));
  }, []);

  const value = {
    token,
    user,
    loading,
    demoMode,
    login,
    logout,
    isAuthenticated: !!token && !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
