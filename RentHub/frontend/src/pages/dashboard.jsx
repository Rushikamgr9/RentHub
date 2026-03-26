import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);

    const fetchData = async () => {
      try {
        const [roomsRes, bookingsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/rooms", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get("http://localhost:5000/api/bookings", {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        setRooms(roomsRes.data);
        setBookings(bookingsRes.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const StatCard = ({ title, value, icon: Icon, colorClass }) => (
    <Card className="p-6 relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-110 ${colorClass}`} />
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg ${colorClass}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        </div>
      </div>
    </Card>
  );

  const Icons = {
    Home: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5-1.5l-1.5.545m-3.182 4.909l2.424-.882M4.5 18.75h3m-3-4.5h3m-3-4.5h3m-3-4.5h3M12.75 12h.008v.008h-.008V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.008v.008h-.008v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>,
    Users: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
    Check: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    Alert: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Statistics</h2>
          <p className="text-slate-500 mt-1">Real-time overview of your RentHub activity</p>
        </div>
        <Link to={role === "landlord" ? "/add-room" : "/rooms"}>
          <Button className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            {role === "landlord" ? "Add New Room" : "Find a Room"}
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {role === "landlord" ? (
          <>
            <StatCard title="Total Rooms" value={rooms.length} icon={Icons.Home} colorClass="bg-indigo-600" />
            <StatCard title="Total Bookings" value={bookings.length} icon={Icons.Users} colorClass="bg-blue-600" />
            <StatCard title="Available Now" value={rooms.filter(r => r.status === "available").length} icon={Icons.Check} colorClass="bg-emerald-600" />
          </>
        ) : (
          <>
            <StatCard title="Available Rooms" value={rooms.filter(r => r.status === "available").length} icon={Icons.Home} colorClass="bg-indigo-600" />
            <StatCard title="My Bookings" value={bookings.length} icon={Icons.Users} colorClass="bg-blue-600" />
            <StatCard title="Pending Requests" value={bookings.filter(b => b.status === "pending").length} icon={Icons.Alert} colorClass="bg-amber-600" />
          </>
        )}
      </div>

      {/* Activity and Management Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest cursor-pointer hover:underline text-slate-400">View All</span>
          </div>
          
          <div className="space-y-6">
            {bookings.length > 0 ? (
              bookings.slice(0, 3).map((booking, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-colors">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    booking.status === "confirmed" || booking.status === "approved" ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                  }`}>
                    <Icons.Check />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">{booking.room_title || `Room #${booking.room_id}`}</p>
                    <p className="text-xs text-slate-500 italic">Status: {booking.status}</p>
                  </div>
                  <Button variant="ghost" className="text-xs py-1.5 px-3">View Details</Button>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 text-sm italic">No recent activity detected</p>
              </div>
            )}
          </div>
        </Card>

        <div className="p-8 bg-indigo-600 text-white border-none rounded-2xl shadow-xl shadow-indigo-600/30 sticky top-6">
          <h3 className="text-lg font-bold mb-4">Quick Insights</h3>
          <p className="text-indigo-100 text-sm mb-6 leading-relaxed italic">
            "Your listings have seen a 24% increase in views this week. Consider updating your photos for better conversion."
          </p>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm border-b border-indigo-500/50 pb-3">
              <span className="text-indigo-200">Profile Strength</span>
              <span className="font-bold uppercase tracking-wider text-xs">Strong</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-indigo-500/50 pb-3">
              <span className="text-indigo-200">Response Rate</span>
              <span className="font-bold uppercase tracking-wider text-xs">98%</span>
            </div>
          </div>
          <Button className="w-full mt-8 bg-white/10 hover:bg-white/20 border-white/20 text-white">
            Get Pro Tips
          </Button>
        </div>
      </div>
    </div>
  );
}
