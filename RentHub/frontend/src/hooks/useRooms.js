import { useContext } from "react";
import RoomsContext from "../context/RoomsContext";

export function useRooms() {
  const ctx = useContext(RoomsContext);
  if (!ctx) throw new Error("useRooms must be used within RoomsProvider");
  return ctx;
}
