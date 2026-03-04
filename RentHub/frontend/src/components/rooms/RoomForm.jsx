import { useState, useEffect } from "react"

function RoomForm({ addRoom, updateRoom, editingRoom }) {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [location, setLocation] = useState("")

  useEffect(() => {
    if (editingRoom) {
      setTitle(editingRoom.title)
      setPrice(editingRoom.price)
      setLocation(editingRoom.location)
    }
  }, [editingRoom])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingRoom) {
      updateRoom({
        ...editingRoom,
        title,
        price,
        location
      })
    } else {
      const newRoom = {
        id: Date.now(),
        title,
        price,
        location,
        status: "Available"
      }
      addRoom(newRoom)
    }

    setTitle("")
    setPrice("")
    setLocation("")
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>{editingRoom ? "Edit Room" : "Add New Room"}</h3>

      <input
        type="text"
        placeholder="Room Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <br /><br />

      <button type="submit">
        {editingRoom ? "Update Room" : "Add Room"}
      </button>
    </form>
  )
}

export default RoomForm