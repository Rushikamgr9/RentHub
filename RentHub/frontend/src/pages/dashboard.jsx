// src/pages/dashboard.jsx
import { useRooms } from "../hooks/useRooms";
import { useAuth } from "../hooks/useAuth";

function Dashboard() {
  const { rooms } = useRooms();
  const { user } = useAuth();
  const role = user?.role;

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