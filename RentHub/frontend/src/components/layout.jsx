import Sidebar from "./sidebar"
import Topbar from "./topbar"
import { Outlet } from "react-router-dom"

function Layout() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Topbar />
        <div style={{ padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout