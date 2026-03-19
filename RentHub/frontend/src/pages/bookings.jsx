import { useEffect, useState } from "react";
import axios from "axios";

export default function Bookings(){
  const [bookings,setBookings] = useState([]);
  const token = localStorage.getItem("token");

  const fetchBookings = async()=>{
    const res = await axios.get("http://localhost:5000/api/bookings",{headers:{Authorization:`Bearer ${token}`}});
    setBookings(res.data);
  }

  useEffect(()=>{
    fetchBookings();
  },[])

  const handleStatus = async(id,status)=>{
    await axios.put(`http://localhost:5000/api/bookings/${id}`,{status},{headers:{Authorization:`Bearer ${token}`}});
    fetchBookings();
  }

  return(
    <table className="min-w-full bg-white shadow rounded">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2">Room</th>
          <th className="px-4 py-2">Tenant ID</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map(b=>(
          <tr key={b.id} className="border-t">
            <td className="px-4 py-2">{b.title}</td>
            <td className="px-4 py-2">{b.tenant_id}</td>
            <td className="px-4 py-2">{b.status}</td>
            <td className="px-4 py-2">
              {b.status==="pending" && (
                <>
                  <button className="bg-green-500 text-white px-2 py-1 rounded mr-1" onClick={()=>handleStatus(b.id,"approved")}>Approve</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={()=>handleStatus(b.id,"rejected")}>Reject</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}