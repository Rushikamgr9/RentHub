import { createContext, useState, useEffect } from "react";
import * as roomsApi from "../api/rooms";

const RoomsContext = createContext(null);

export function RoomsProvider({ children }) {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const data = await roomsApi.getAll();
      setRooms(data);
      localStorage.setItem("rooms", JSON.stringify(data));
    } catch (err) {
      setError(err.message || "Failed to load rooms");
      const saved = JSON.parse(localStorage.getItem("rooms")) || [];
      setRooms(saved);
    } finally {
      setLoading(false);
    }
  };

  const addRoom = async (room) => {
    try {
      const created = await roomsApi.create(room);
      setRooms((prev) => [...prev, created]);
    } catch (err) {
      setError(err.message);
    }
  };

  const addBooking = (booking) => {
    setBookings((b) => [...b, booking]);
  };

  const updateRoom = (updated) => {
    setRooms((r) => r.map(x => x.id === updated.id ? updated : x));
  };

  const deleteRoom = (id) => {
    setRooms((r) => r.filter(x => x.id !== id));
  };

  const toggleRoomStatus = (id) => {
    setRooms((r) =>
      r.map(x =>
        x.id === id
          ? { ...x, status: x.status === "Available" ? "Booked" : "Available" }
          : x
      )
    );
  };

  const bookRoom = (room) => {
    setRooms((r) =>
      r.map(x =>
        x.id === room.id ? { ...x, status: "Booked" } : x
      )
    );
    const newBooking = {
      id: Date.now(),
      roomId: room.id,
      title: room.title,
      price: room.price,
      location: room.location,
      bookedBy: "Tenant User",
    };
    addBooking(newBooking);
  };

  const loadLocalBookings = () => {
    const saved = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(saved);
  };

  const saveLocalBookings = () => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  };

  useEffect(() => {
    fetchRooms();
    loadLocalBookings();
  }, []);

  useEffect(() => {
    saveLocalBookings();
  }, [bookings]);

  return (
    <RoomsContext.Provider value={{
      rooms,
      bookings,
      loading,
      error,
      addRoom,
      addBooking,
      updateRoom,
      deleteRoom,
      toggleRoomStatus,
      bookRoom,
      fetchRooms,
    }}>
      {children}
    </RoomsContext.Provider>
  );
}

export default RoomsContext;
