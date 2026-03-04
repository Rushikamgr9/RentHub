import { Link } from "react-router-dom"

function Sidebar() {
  const role = localStorage.getItem("userRole")

  return (
    <div style={{
      width: "220px",
      height: "100vh",
      backgroundColor: "#1e293b",
      color: "white",
      padding: "20px"
    }}>
      <h2>RentHub</h2>

      <nav style={{ marginTop: "30px" }}>
        <p><Link to="/dashboard" style={{ color: "white" }}>Dashboard</Link></p>

        {role === "landlord" && (
          <>
            <p><Link to="/rooms" style={{ color: "white" }}>Manage Rooms</Link></p>
            <p><Link to="/bookings" style={{ color: "white" }}>Bookings</Link></p>
          </>
        )}

        {role === "tenant" && (
          <>
            <p><Link to="/rooms" style={{ color: "white" }}>Browse Rooms</Link></p>
            <p><Link to="/bookings" style={{ color: "white" }}>My Bookings</Link></p>
          </>
        )}

        <p><Link to="/chat" style={{ color: "white" }}>Chat</Link></p>
      </nav>
    </div>
  )
}

export default Sidebar