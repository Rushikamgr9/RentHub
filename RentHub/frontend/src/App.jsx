import { BrowserRouter, Routes, Route } from "react-router-dom"
import Sidebar from "./components/sidebar"
import Topbar from "./components/topbar"
import Dashboard from "./pages/dashboard"
import Rooms from "./pages/rooms"
import AddRoom from "./pages/addRoom"
import Bookings from "./pages/bookings"
import Chat from "./pages/chat"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/home"
import VideoCall from "./pages/videoCall"

function Layout({children}){
  return(
    <div className="min-h-screen bg-slate-50 font-sans">
      <div style={{ position: "fixed", top: 0, left: 0, bottom: 0, width: "18rem", zIndex: 30 }}>
        <Sidebar/>
      </div>
      <div style={{ marginLeft: "18rem" }} className="flex-1 flex flex-col min-h-screen">
        <Topbar/>
        <main className="p-8 flex-1 max-w-7xl mx-auto w-full">{children}</main>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Layout><Dashboard/></Layout>}/>
        <Route path="/add-room" element={<Layout><AddRoom/></Layout>}/>
        <Route path="/rooms" element={<Layout><Rooms/></Layout>}/>
        <Route path="/bookings" element={<Layout><Bookings/></Layout>}/>
        <Route path="/chat" element={<Layout><Chat/></Layout>}/>
        <Route path="/video-call/:roomId" element={<VideoCall/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App