// src/pages/dashboard.jsx
import { useEffect, useState } from "react";

function Dashboard() {
  const [rooms, setRooms] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedRooms = JSON.parse(localStorage.getItem("rooms")) || [];
    setRooms(storedRooms);

    const storedRole = localStorage.getItem("userRole"); // FIXED
    setRole(storedRole);

    console.log("Current Role:", storedRole);
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <p><b>User Role:</b> {role}</p>

      <p>Total Rooms: {rooms.length}</p>
      <p>Available Rooms: {rooms.filter(r => r.status === "Available").length}</p>
      <p>Booked Rooms: {rooms.filter(r => r.status === "Booked").length}</p>
    </div>
  );
}

export default Dashboard;