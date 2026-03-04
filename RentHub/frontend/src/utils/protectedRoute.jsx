// src/utils/protectedRoute.jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const userRole = localStorage.getItem("userRole");

  if (!userRole) return <Navigate to="/login" />;
  if (role && userRole !== role) return <Navigate to="/unauthorized" />;

  return children;
}

export default ProtectedRoute;