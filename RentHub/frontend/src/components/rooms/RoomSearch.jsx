// import { useState } from "react";

// export default function RoomSearch({ onSearch }) {
//   const [location, setLocation] = useState("");
//   const [price, setPrice] = useState("");

//   const handleSearch = () => {
//     onSearch(location, price);
//   };

//   return (
//     <div className="flex gap-3 mb-6">

//       <input
//         className="border p-2 rounded"
//         placeholder="Search location"
//         value={location}
//         onChange={(e) => setLocation(e.target.value)}
//       />

//       <input
//         className="border p-2 rounded"
//         placeholder="Max price"
//         value={price}
//         onChange={(e) => setPrice(e.target.value)}
//       />

//       <button
//         className="bg-blue-500 text-white px-4 rounded"
//         onClick={handleSearch}
//       >
//         Search
//       </button>

//     </div>
//   );
// }


import { useState } from "react";

export default function RoomSearch({ onSearch }) {
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const handleSearch = () => {
    onSearch(location, price);
  };

  return (
    <div className="flex gap-3 mb-6">

      <input
        className="border p-2 rounded"
        placeholder="Search location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <input
        className="border p-2 rounded"
        placeholder="Max price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-4 rounded"
        onClick={handleSearch}
      >
        Search
      </button>

    </div>
  );
}