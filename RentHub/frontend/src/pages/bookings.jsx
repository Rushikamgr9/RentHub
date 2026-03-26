import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBookings();
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update booking status.");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {role === "landlord" ? "Booking Requests" : "My Bookings"}
          </h2>
          <p className="text-slate-500 mt-1 font-medium">Manage and track property reservations</p>
        </div>
      </div>

      <Card className="overflow-hidden border-slate-100 shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Property</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">
                  {role === "landlord" ? "Tenant Details" : "Landlord Details"}
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {bookings.length > 0 ? (
                bookings.map((b) => (
                  <tr key={b.booking_id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {b.room_title || b.title}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 font-medium italic">ID: #{b.booking_id}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600 shadow-sm">
                          {(role === "landlord" ? b.tenant_name : "L")?.[0] || "?"}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-bold text-slate-900 truncate max-w-[150px]">
                              {role === "landlord" ? b.tenant_name : b.landlord_name || `Landlord of ${b.room_title}`}
                            </div>
                            
                            <Link 
                              to={`/chat?user_id=${role === "landlord" ? b.tenant_id : b.landlord_id}&user_name=${role === "landlord" ? b.tenant_name : b.landlord_name}`}
                              className="w-8 h-8 rounded-lg hover:bg-indigo-50 flex items-center justify-center text-indigo-400 hover:text-indigo-600 transition-all active:scale-90"
                              title="Send Message"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                              </svg>
                            </Link>
                          </div>
                          
                          {role === "landlord" && (
                            <div className="text-[10px] font-medium text-slate-400 mt-0.5 flex items-center gap-1 truncate max-w-[200px]">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                              </svg>
                              {b.tenant_address || "No address provided"}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        b.status === "approved" || b.status === "confirmed"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                        : b.status === "pending"
                        ? "bg-amber-50 text-amber-600 border-amber-100"
                        : "bg-red-50 text-red-600 border-red-100"
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      {role === "landlord" && b.status === "pending" ? (
                        <div className="flex justify-end gap-2">
                          <Button 
                            className="bg-emerald-500 hover:bg-emerald-600 h-8 px-3 text-[10px] font-bold uppercase tracking-wider" 
                            onClick={() => handleStatus(b.booking_id, "approved")}
                          >
                            Approve
                          </Button>
                          <Button 
                            variant="danger"
                            className="h-8 px-3 text-[10px] font-bold uppercase tracking-wider" 
                            onClick={() => handleStatus(b.booking_id, "rejected")}
                          >
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <Button variant="ghost" className="h-8 px-3 text-[10px] font-bold uppercase tracking-wider" onClick={() => fetchBookings()}>
                          Refresh
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-20 text-center">
                    <div className="text-slate-400 italic">No bookings found in your history</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}