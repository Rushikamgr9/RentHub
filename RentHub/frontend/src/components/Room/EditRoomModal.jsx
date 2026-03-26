import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Select from "../ui/Select";
import { PROPERTY_TYPES, PROVINCES, DISTRICTS_BY_PROVINCE, CITIES_BY_DISTRICT } from "../../constants/nepalData";
import MapComponent from "../ui/MapComponent";

export default function EditRoomModal({ isOpen, onClose, room, onUpdate }) {
  const [type, setType] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(false);

  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);

  // Pre-fill form when room changes
  useEffect(() => {
    if (room && isOpen) {
      // Parse location "City, District, Province"
      const parts = room.location.split(",").map(p => p.trim());
      if (parts.length === 3) {
        setCity(parts[0]);
        setDistrict(parts[1]);
        setProvince(parts[2]);
      }

      // Parse title "Type in City"
      const typePart = room.title.split(" in ")[0];
      setType(typePart);

      setDescription(room.description);
      setPrice(room.price);
      setLatitude(room.latitude);
      setLongitude(room.longitude);
    }
  }, [room, isOpen]);

  // Handle Province Change
  useEffect(() => {
    if (province) {
      setDistricts(DISTRICTS_BY_PROVINCE[province] || []);
    } else {
      setDistricts([]);
    }
  }, [province]);

  // Handle District Change
  useEffect(() => {
    if (district) {
      setCities(CITIES_BY_DISTRICT[district] || []);
    } else {
      setCities([]);
    }
  }, [district]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fullLocation = `${city}, ${district}, ${province}`;
    const listingTitle = `${type} in ${city}`;

    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:5000/api/rooms/update/${room.id}`,
        { 
          title: listingTitle, 
          description, 
          location: fullLocation, 
          price: Number(price), 
          latitude, 
          longitude,
          status: room.status 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onUpdate();
      onClose();
    } catch (err) {
      console.error("Update room error:", err.response);
      alert(err.response?.data?.message || "Failed to update room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Property Details">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Property Type"
            options={PROPERTY_TYPES}
            value={type}
            onChange={setType}
            placeholder="Select type"
            required
            className="md:col-span-2"
          />
          <Input
            label="Price per Month (Rs)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl">
          <Select
            label="Province"
            options={PROVINCES}
            value={province}
            onChange={setProvince}
            placeholder="Province"
            required
          />
          <Select
            label="District"
            options={districts}
            value={district}
            onChange={setDistrict}
            placeholder="District"
            required
            disabled={!province}
          />
          <Select
            label="City"
            options={cities}
            value={city}
            onChange={setCity}
            placeholder="City"
            required
            disabled={!district}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Exact Location on Map</label>
          <MapComponent 
            isPicker={true} 
            lat={latitude} 
            lng={longitude} 
            searchQuery={city ? `${city}, ${district}` : ""}
            height="250px"
            onLocationSelect={(pos) => {
              setLatitude(pos.lat);
              setLongitude(pos.lng);
            }}
          />
        </div>

        <Input
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
          required
        />

        <div className="flex gap-4 pt-4">
          <Button type="submit" className="flex-1" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}