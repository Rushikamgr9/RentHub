// src/components/rooms/RoomSearch.jsx
function RoomSearch({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search by title or location..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{ marginBottom: "20px", padding: "5px", width: "300px" }}
    />
  );
}

export default RoomSearch;

