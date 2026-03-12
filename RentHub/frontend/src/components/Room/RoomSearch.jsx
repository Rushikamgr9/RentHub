import Input from "../Input";
import { useState, useEffect } from "react";
import { useDebounced } from "../../hooks/useDebounced";

export default function RoomSearch({ value, onChange }) {
  const [text, setText] = useState(value);
  const debounced = useDebounced(text, 300);

  useEffect(() => {
    onChange(debounced);
  }, [debounced, onChange]);

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <Input
      label="Search"
      placeholder="Title or location..."
      value={text}
      onChange={e => setText(e.target.value)}
    />
  );
}
