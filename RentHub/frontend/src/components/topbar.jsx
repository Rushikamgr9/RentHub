import { useNavigate, useLocation } from "react-router-dom";
import Button from "./ui/Button";

export default function Topbar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  }

  // Map route to Title
  const getTitle = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "Overview";
    if (path === "/rooms") return "Manage Rooms";
    if (path === "/add-room") return "Post New Listing";
    if (path === "/bookings") return "Bookings & Requests";
    if (path === "/chat") return "Messages";
    return "RentHub";
  }

  return (
    <header className="h-20 bg-white/70 backdrop-blur-md border-b border-slate-100 flex justify-between items-center px-8 sticky top-0 z-10">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">{getTitle()}</h1>
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-0.5">RentHub Management Suite</p>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">System Active</span>
        </div>
        
        <Button 
          variant="secondary"
          className="px-4 py-2 text-xs border-red-100 text-red-600 hover:bg-red-50 hover:border-red-200"
          onClick={logout}
        >
          Sign Out
        </Button>
      </div>
    </header>
  )
}