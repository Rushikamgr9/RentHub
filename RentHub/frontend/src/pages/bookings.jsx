import { useState, useEffect } from "react"

function Bookings() {
  const role = localStorage.getItem("userRole")
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || []
    setBookings(storedBookings)
  }, [])

  return (
    <div>
      <h2>Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map(booking => (
          <div
            key={booking.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px"
            }}
          >
            <h3>{booking.title}</h3>
            <p>Location: {booking.location}</p>
            <p>Price: Rs. {booking.price}</p>
            <p>Status: Confirmed</p>
          </div>
        ))
      )}
    </div>
  )
}

export default Bookings