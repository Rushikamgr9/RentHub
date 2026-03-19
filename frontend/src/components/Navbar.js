import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar({ role }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const effectiveRole = role ?? user?.role;

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      {effectiveRole === "tenant" && <Link to="/tenant">Dashboard</Link>}
      {effectiveRole === "landlord" && <Link to="/landlord">Dashboard</Link>}
      <button type="button" className="logout-btn" onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
