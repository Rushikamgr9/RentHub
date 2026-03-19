import { Link } from "react-router-dom"

export default function Sidebar(){

  const role = localStorage.getItem("role")

  return(
    <div className="w-64 h-screen bg-gray-800 text-white p-5 flex flex-col">

      <h2 className="text-2xl font-bold mb-8">RentHub</h2>

      <nav className="flex flex-col gap-3">

        <Link to="/dashboard" className="hover:bg-gray-700 p-2 rounded">
          Dashboard
        </Link>

        {/* LANDLORD MENU */}
        {role === "landlord" && (
          <>
            <Link to="/add-room" className="hover:bg-gray-700 p-2 rounded">
              Add Room
            </Link>

            <Link to="/rooms" className="hover:bg-gray-700 p-2 rounded">
              My Rooms
            </Link>

            <Link to="/bookings" className="hover:bg-gray-700 p-2 rounded">
              Booking Requests
            </Link>
          </>
        )}

        {/* TENANT MENU */}
        {role === "tenant" && (
          <>
            <Link to="/rooms" className="hover:bg-gray-700 p-2 rounded">
              Search Rooms
            </Link>

            <Link to="/bookings" className="hover:bg-gray-700 p-2 rounded">
              My Bookings
            </Link>
          </>
        )}

        {/* BOTH ROLES */}
        <Link to="/chat" className="hover:bg-gray-700 p-2 rounded">
          Chat
        </Link>

      </nav>

    </div>
  )
}