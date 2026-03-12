import { useState, useEffect } from "react";
import Input from "../Input";
import Button from "../Button";

export default function RoomForm({ onSave, editing }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setPrice(editing.price);
      setLocation(editing.location);
    }
  }, [editing]);

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = "Title is required";
    if (!price || isNaN(price)) errs.price = "Valid price required";
    if (!location.trim()) errs.location = "Location required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const room = editing
      ? { ...editing, title, price, location }
      : { id: Date.now(), title, price, location, status: "Available" };
    onSave(room);
    setTitle("");
    setPrice("");
    setLocation("");
  };

  return (
    <form onSubmit={handleSubmit} className="room-form">
      <h3>{editing ? "Edit Room" : "Add New Room"}</h3>
      <Input label="Title" value={title} onChange={e => setTitle(e.target.value)} error={errors.title} />
      <Input label="Price" type="number" value={price} onChange={e => setPrice(e.target.value)} error={errors.price} />
      <Input label="Location" value={location} onChange={e => setLocation(e.target.value)} error={errors.location} />
      <Button type="submit" primary>{editing ? "Update" : "Add"}</Button>
    </form>
  );
}
