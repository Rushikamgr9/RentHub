import Sidebar from "./sidebar"
import Topbar from "./topbar"
import { Outlet } from "react-router-dom"

function Layout() {
  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>
      {/* Fixed sidebar - always full height */}
      <aside style={{ position: "fixed", top: 0, left: 0, bottom: 0, width: "18rem", zIndex: 30, backgroundColor: "#0f172a" }}>
        <Sidebar />
      </aside>

      {/* Main content - offset by sidebar width */}
      <div className="flex-1 ml-72 min-h-screen">
        <Topbar />
        <div style={{ padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout