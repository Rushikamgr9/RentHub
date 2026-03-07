import { useRooms } from "../hooks/useRooms";

function Bookings() {
  const { bookings } = useRooms();

  return (
    <div>
      <h2>Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking.id} className="room-card">
            <h3>{booking.title}</h3>
            <p>Location: {booking.location}</p>
            <p>Price: Rs. {booking.price}</p>
            <p>Status: Confirmed</p>
          </div>
        ))
      )}    </div>
  )
}

export default Bookings