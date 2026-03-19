import { BrowserRouter, Routes, Route } from "react-router-dom"
import Sidebar from "./components/sidebar"
import Topbar from "./components/topbar"
import Dashboard from "./pages/dashboard"
import Rooms from "./pages/rooms"
import AddRoom from "./pages/addRoom"
import Bookings from "./pages/bookings"
import Chat from "./pages/chat"
import Login from "./pages/Login"
import Home from "./pages/home"

function Layout({children}){
  return(
    <div className="flex min-h-screen">
      <Sidebar/>
      <div className="flex-1 flex flex-col">
        <Topbar/>
        <main className="p-6 bg-gray-50 flex-1">{children}</main>
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
        <Route path="/dashboard" element={<Layout><Dashboard/></Layout>}/>
        <Route path="/add-room" element={<Layout><AddRoom/></Layout>}/>
        <Route path="/rooms" element={<Layout><Rooms/></Layout>}/>
        <Route path="/bookings" element={<Layout><Bookings/></Layout>}/>
        <Route path="/chat" element={<Layout><Chat/></Layout>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App