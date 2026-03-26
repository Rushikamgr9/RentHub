import { Link, useLocation } from "react-router-dom"

const NavLink = ({ to, children, icon: Icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        isActive 
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
      }`}
    >
      <Icon className={`w-5 h-5 ${isActive ? "text-white" : "group-hover:text-white transition-colors"}`} />
      <span className="font-medium text-sm">{children}</span>
    </Link>
  );
};

export default function Sidebar() {
  const role = localStorage.getItem("role")

  const Icons = {
    Dashboard: () => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    Rooms: () => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5-1.5l-1.5.545m-3.182 4.909l2.424-.882M4.5 18.75h3m-3-4.5h3m-3-4.5h3m-3-4.5h3M12.75 12h.008v.008h-.008V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.008v.008h-.008v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
    Search: () => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    Bookings: () => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
      </svg>
    ),
    Chat: () => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    Add: () => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    )
  }

  return (
    <div className="w-72 h-full bg-slate-900 text-white p-6 flex flex-col border-r border-slate-800 relative z-20">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
          <span className="text-xl font-bold">RH</span>
        </div>
        <h2 className="text-xl font-bold tracking-tight">RentHub</h2>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2 ml-4">Main Menu</div>
        <NavLink to="/dashboard" icon={Icons.Dashboard}>Dashboard</NavLink>

        {/* LANDLORD MENU */}
        {role === "landlord" && (
          <>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-6 mb-2 ml-4">Management</div>
            <NavLink to="/add-room" icon={Icons.Add}>Add Room</NavLink>
            <NavLink to="/rooms" icon={Icons.Rooms}>My Rooms</NavLink>
            <NavLink to="/bookings" icon={Icons.Bookings}>Booking Requests</NavLink>
          </>
        )}

        {/* TENANT MENU */}
        {role === "tenant" && (
          <>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-6 mb-2 ml-4">Discovery</div>
            <NavLink to="/rooms" icon={Icons.Search}>Search Rooms</NavLink>
            <NavLink to="/bookings" icon={Icons.Bookings}>My Bookings</NavLink>
          </>
        )}

        <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-6 mb-2 ml-4">Communication</div>
        <NavLink to="/chat" icon={Icons.Chat}>Messenger</NavLink>
      </nav>

      <div className="pt-6 border-t border-slate-800 mt-auto">
        <div className="bg-slate-800/50 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
            {role?.[0].toUpperCase()}
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="text-sm font-bold truncate">Logged in as</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">{role}</div>
          </div>
        </div>
      </div>
    </div>
  )
}