import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { AuthProvider } from "./context/AuthContext";
import { RoomsProvider } from "./context/RoomsContext";
import Layout from "./components/layout"
import ProtectedRoute from "./routes/ProtectedRoute"

import Home from "./pages/home"
import Login from "./pages/login"
import Unauthorized from "./pages/unauthorized";
import Dashboard from "./pages/dashboard"
import Rooms from "./pages/rooms"
import Bookings from "./pages/bookings"
import Chat from "./pages/chat"

function App() {
  return (
    <AuthProvider>
      <RoomsProvider>
        <Router>
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />            <Route path="/unauthorized" element={<Unauthorized />} />
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
      </RoomsProvider>
    </AuthProvider>
  )
}

export default App