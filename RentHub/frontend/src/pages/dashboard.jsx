import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard(){

  const [rooms,setRooms] = useState([]);
  const [bookings,setBookings] = useState([]);
  const [role,setRole] = useState("");

  const token = localStorage.getItem("token");

  useEffect(()=>{

    const userRole = localStorage.getItem("role");
    setRole(userRole);

    axios.get("http://localhost:5000/api/rooms",{
      headers:{Authorization:`Bearer ${token}`}
    })
    .then(res=>setRooms(res.data))

    axios.get("http://localhost:5000/api/bookings",{
      headers:{Authorization:`Bearer ${token}`}
    })
    .then(res=>setBookings(res.data))

  },[]);

  return(
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* LANDLORD DASHBOARD */}
      {role === "landlord" && (
        <div className="grid grid-cols-3 gap-6">

          <div className="bg-white p-5 shadow rounded">
            <h4 className="font-bold">Total Rooms</h4>
            <p className="text-2xl">{rooms.length}</p>
          </div>

          <div className="bg-white p-5 shadow rounded">
            <h4 className="font-bold">Bookings</h4>
            <p className="text-2xl">{bookings.length}</p>
          </div>

          <div className="bg-white p-5 shadow rounded">
            <h4 className="font-bold">Available Rooms</h4>
            <p className="text-2xl">
              {rooms.filter(r=>r.status==="available").length}
            </p>
          </div>

        </div>
      )}

      {/* TENANT DASHBOARD */}
      {role === "tenant" && (
        <div className="grid grid-cols-3 gap-6">

          <div className="bg-white p-5 shadow rounded">
            <h4 className="font-bold">Available Rooms</h4>
            <p className="text-2xl">
              {rooms.filter(r=>r.status==="available").length}
            </p>
          </div>

          <div className="bg-white p-5 shadow rounded">
            <h4 className="font-bold">My Bookings</h4>
            <p className="text-2xl">{bookings.length}</p>
          </div>

          <div className="bg-white p-5 shadow rounded">
            <h4 className="font-bold">Pending Requests</h4>
            <p className="text-2xl">
              {bookings.filter(b => b.status === "pending").length}
            </p>
          </div>
        </div>
      )}
      
    </div>
  )
}