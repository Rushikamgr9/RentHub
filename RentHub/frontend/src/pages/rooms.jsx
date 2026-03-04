import { useState, useEffect } from "react"
import RoomForm from "../components/rooms/RoomForm"
import RoomCard from "../components/rooms/RoomCard"
import RoomSearch from "../components/rooms/RoomSearch";


function Rooms() {
  const role = localStorage.getItem("userRole")

  const [rooms, setRooms] = useState([])
  const [editingRoom, setEditingRoom] = useState(null)
  const [search, setSearch] = useState("")
  const [bookings, setBookings] = useState([])

  // Load rooms from localStorage
  useEffect(() => {
    const storedRooms = JSON.parse(localStorage.getItem("rooms")) || []
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || []
    
    setRooms(storedRooms)
    setBookings(storedBookings)
  }, [])

  // Save rooms to localStorage whenever rooms change OR bookings change
  useEffect(() => {
    localStorage.setItem("rooms", JSON.stringify(rooms))
    localStorage.setItem("bookings", JSON.stringify(bookings))
   }, [rooms, bookings])

  const addRoom = (room) => {
    setRooms([...rooms, room])
  }

  const updateRoom = (updatedRoom) => {
    setRooms(
      rooms.map(room =>
        room.id === updatedRoom.id ? updatedRoom : room
      )
    )
    setEditingRoom(null)
  }

  const deleteRoom = (id) => {
    setRooms(rooms.filter(room => room.id !== id))
  }

  const toggleStatus = (id) => {
    setRooms(
      rooms.map(room =>
        room.id === id
          ? {
              ...room,
              status: room.status === "Available" ? "Booked" : "Available"
            }
          : room
      )
    )
  }
// Filter rooms for tenant if needed
  const filteredRooms = rooms.filter(room =>
    room.title.toLowerCase().includes(search.toLowerCase()) ||
    room.location.toLowerCase().includes(search.toLowerCase())
  )

  // Optionally, show **only available rooms to tenants**
  const displayRooms = filteredRooms

  const handleBooking = (room) => {
    const newBooking = {
      id: Date.now(),
      roomId: room.id,
      title: room.title,
      price: room.price,
      location: room.location,
      bookedBy: "Tenant User"
    }

    setBookings([...bookings, newBooking])

    // Change room status to Booked
    setRooms(
      rooms.map(r =>
        r.id === room.id ? { ...r, status: "Booked" } : r
      )
    )
  }

  return (
    <div>
      <h2>Rooms Management</h2>

      {/* Search Bar */}
      <RoomSearch search={search} setSearch={setSearch} />

      {/* Landlord Add/Edit Form */}
      {role === "landlord" && (
        <RoomForm
          addRoom={addRoom}
          updateRoom={updateRoom}
          editingRoom={editingRoom}
        />
      )}

      {/* Room List */}
      {displayRooms.length === 0 ? (
        <p>No rooms found.</p>
      ) : (
        displayRooms.map(room => (
          <RoomCard
            key={room.id}
            room={room}
            deleteRoom={deleteRoom}
            toggleStatus={toggleStatus}
            setEditingRoom={setEditingRoom}
            role={role}
            handleBooking={handleBooking}
          />
        ))
      )}
    </div>
  )
}

export default Rooms