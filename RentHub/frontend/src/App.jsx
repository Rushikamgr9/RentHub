import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Layout from "./components/layout"
import ProtectedRoute from "./utils/protectedRoute"

import Home from "./pages/home"
import Login from "./pages/login"
import Dashboard from "./pages/dashboard"
import Rooms from "./pages/rooms"
import Bookings from "./pages/bookings"
import Chat from "./pages/chat"

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/chat" element={<Chat />} />

        </Route>

      </Routes>
    </Router>
  )
}

export default App