import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";

// Flies/pans the map to a new center when searchQuery changes
function FlyToLocation({ searchQuery }) {
  const map = useMap();

  useEffect(() => {
    if (!searchQuery) return;

    const query = `${searchQuery}, Nepal`;
    
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          map.flyTo([parseFloat(lat), parseFloat(lon)], 14, { duration: 1.5 });
        }
      })
      .catch(err => console.error("Geocoding error:", err));
  }, [searchQuery, map]);

  return null;
}

function LocationMarker({ position, setPosition, isPicker }) {
  useMapEvents({
    click(e) {
      if (isPicker) {
        setPosition(e.latlng);
      }
    },
  });

  return position === null ? null : (
    <Marker position={position} draggable={isPicker} 
      eventHandlers={{
        dragend: (e) => {
          if (isPicker) {
            setPosition(e.target.getLatLng());
          }
        }
      }}
    />
  );
}

export default function MapComponent({ 
  lat, 
  lng, 
  onLocationSelect, 
  isPicker = false,
  height = "300px",
  zoom = 13,
  searchQuery = ""
}) {
  const [position, setPosition] = useState(lat && lng ? { lat, lng } : null);

  // Default center (Kathmandu) if no position provided
  const center = position || { lat: 27.7172, lng: 85.3240 };

  useEffect(() => {
    if (onLocationSelect && position) {
      onLocationSelect(position);
    }
  }, [position]);

  return (
    <div className="w-full rounded-2xl overflow-hidden border-2 border-slate-200/60 shadow-md bg-slate-50 relative z-0">
      <div style={{ height }} className="w-full relative z-0">
        <MapContainer 
          center={center} 
          zoom={zoom} 
          scrollWheelZoom={false} 
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FlyToLocation searchQuery={searchQuery} />
          <LocationMarker position={position} setPosition={setPosition} isPicker={isPicker} />
        </MapContainer>
      </div>
      {isPicker && (
        <div className="bg-indigo-50/50 p-3 text-xs font-semibold text-indigo-500 text-center border-t-2 border-slate-200/60 flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
          </svg>
          Click map or drag pin to set precise location
        </div>
      )}
    </div>
  );
}
