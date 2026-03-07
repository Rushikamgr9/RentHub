import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth";

function Topbar() {
  const navigate = useNavigate()
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  }

  return (
    <div style={{
      height: "60px",
      backgroundColor: "#f1f5f9",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px"
    }}>
      <h3>Rental Room Management System</h3>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Topbar