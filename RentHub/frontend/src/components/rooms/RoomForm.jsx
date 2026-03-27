import { useState, useEffect } from "react";

function RoomForm({ addRoom, updateRoom, editingRoom, cancelEdit }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (editingRoom) {
      setTitle(editingRoom.title);
      setPrice(editingRoom.price);
      setLocation(editingRoom.location);
    }
  }, [editingRoom]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !price || !location) {
      alert("Please fill all fields");
      return;
    }

    if (editingRoom) {
      updateRoom({
        ...editingRoom,
        title,
        price: Number(price),
        location
      });
    } else {
      addRoom({ title, price: Number(price), location });
    }

    setTitle("");
    setPrice("");
    setLocation("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h3 className="font-bold text-lg mb-3">{editingRoom ? "Edit Room" : "Add New Room"}</h3>

      <input
        type="text"
        placeholder="Room Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />

      <div className="flex gap-2 mt-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingRoom ? "Update Room" : "Add Room"}
        </button>
        {editingRoom && (
          <button
            type="button"
            onClick={cancelEdit}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default RoomForm;