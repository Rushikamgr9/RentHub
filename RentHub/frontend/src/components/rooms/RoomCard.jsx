// // export default function RoomCard({ room, onBook }) {
// //   return (
// //     <div className="bg-white shadow rounded p-4">
// //       <h3 className="font-bold text-lg">{room.title}</h3>

// //       <p className="text-gray-600">{room.description}</p>

// //       <p className="mt-2">
// //         <span className="font-semibold">Location:</span> {room.location}
// //       </p>

// //       <p>
// //         <span className="font-semibold">Price:</span> Rs {room.price}
// //       </p>

// //       <p>
// //         <span className="font-semibold">Status:</span>{" "}
// //         <span
// //           className={
// //             room.status === "booked"
// //               ? "text-red-500"
// //               : "text-green-500"
// //           }
// //         >
// //           {room.status}
// //         </span>
// //       </p>

// //       {room.status === "available" && (
// //         <button
// //           className="bg-blue-500 text-white px-3 py-1 rounded mt-3"
// //           onClick={onBook}
// //         >
// //           Request Booking
// //         </button>
// //       )}
// //     </div>
// //   );
// // }

// export default function RoomCard({ room, onEdit, onDelete }) {
//   return (
//     <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
//       <div>
//         <h3 className="text-lg font-bold">{room.title}</h3>
//         <p className="text-gray-600 mt-1">{room.description}</p>
//         <p className="mt-2"><span className="font-semibold">Location:</span> {room.location}</p>
//         <p><span className="font-semibold">Price:</span> Rs {room.price}</p>
//         <p>
//           <span className="font-semibold">Status:</span>{" "}
//           <span className={room.status === "booked" ? "text-red-500" : "text-green-500"}>
//             {room.status}
//           </span>
//         </p>
//       </div>

//       <div className="flex gap-2 mt-3">
//         <button onClick={onEdit} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">
//           Edit
//         </button>
//         <button onClick={onDelete} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// }

export default function RoomCard({ room, onBook }) {
  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="font-bold text-lg">{room.title}</h3>

      <p className="text-gray-600">{room.description}</p>

      <p className="mt-2">
        <span className="font-semibold">Location:</span> {room.location}
      </p>

      <p>
        <span className="font-semibold">Price:</span> Rs {room.price}
      </p>

      <p>
        <span className="font-semibold">Status:</span>{" "}
        <span
          className={
            room.status === "booked"
              ? "text-red-500"
              : "text-green-500"
          }
        >
          {room.status}
        </span>
      </p>

      {room.status === "available" && (
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded mt-3"
          onClick={onBook}
        >
          Request Booking
        </button>
      )}
    </div>
  );
}