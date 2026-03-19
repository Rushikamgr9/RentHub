import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import TenantDashboard from './pages/TenantDashboard';
import LandlordDashboard from './pages/LandlordDashboard';

function ProtectedRoute({ children, allowedRoles }) {
  const { token, user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="loading-wrap">Just a moment…</div>;
  if (!token || !user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (allowedRoles && !allowedRoles.includes(user.role))
    return <Navigate to={user.role === 'tenant' ? '/tenant' : '/landlord'} replace />;
  return children;
}

function AppRoutes() {
  return (
    <div className="app-wrap">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tenant" element={<ProtectedRoute allowedRoles={['tenant']}><TenantDashboard /></ProtectedRoute>} />
        <Route path="/landlord" element={<ProtectedRoute allowedRoles={['landlord']}><LandlordDashboard /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
