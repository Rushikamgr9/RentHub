const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/rooms";

export async function getAll() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Unable to fetch rooms");
  return res.json();
}

export async function create(room) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(room),
  });
  if (!res.ok) throw new Error("Unable to create room");
  return res.json();
}

// TODO: add update, delete, book endpoints later
