import { useState } from "react";
import axios from "axios";

export default function AddRoom() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!title || !description || !price || !location) {
      alert("Please fill in all required fields.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in");
      return;
    }

    setLoading(true);
      
    try {
      const res = await axios.post(
        "http://localhost:5000/api/rooms/add",
        { title, description, location, price: Number(price) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Response:", res.data);
      alert("Room added successfully!");
      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setLocation("");
    } catch (err) {
      console.error(err);
      alert("Failed to add room. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Room</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Room Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter room title"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Describe the room"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Price (Rs)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter room price"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter room location"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Room"}
        </button>
      </form>
    </div>
  );
}