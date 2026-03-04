// src/pages/dashboard.jsx
import { useEffect, useState } from "react";

function Dashboard() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    setRooms(JSON.parse(localStorage.getItem("rooms")) || []);
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total Rooms: {rooms.length}</p>
      <p>Available Rooms: {rooms.filter(r => r.status === "Available").length}</p>
      <p>Booked Rooms: {rooms.filter(r => r.status === "Booked").length}</p>
    </div>
  );
}

export default Dashboard;