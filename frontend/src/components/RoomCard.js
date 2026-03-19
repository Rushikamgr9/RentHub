function RoomCard({ room }) {
  return (
    <div className="room-card">
      <img src={room.image} alt={room.title} />
      <div className="body">
        <h3>{room.title}</h3>
        <p>${room.price} / mo</p>
        <p>{room.location}</p>
        <span className={`status ${room.status === 'Available' ? 'available' : 'booked'}`}>
          {room.status}
        </span>
        <button type="button" className="btn btn-primary">View details</button>
      </div>
    </div>
  );
}

export default RoomCard;
