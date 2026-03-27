import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Select from "../components/ui/Select";
import { PROPERTY_TYPES, PROVINCES, DISTRICTS_BY_PROVINCE, CITIES_BY_DISTRICT } from "../constants/nepalData";
import MapComponent from "../components/ui/MapComponent";

export default function AddRoom() {
  const [type, setType] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);

  // Handle Province Change
  useEffect(() => {
    if (province) {
      setDistricts(DISTRICTS_BY_PROVINCE[province] || []);
      setDistrict("");
      setCity("");
    } else {
      setDistricts([]);
    }
  }, [province]);

  // Handle District Change
  useEffect(() => {
    if (district) {
      setCities(CITIES_BY_DISTRICT[district] || []);
      setCity("");
    } else {
      setCities([]);
    }
  }, [district]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!type || !province || !district || !city || !price || !description) {
      alert("Please select all required location and property details.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to create a listing.");
      navigate("/login");
      return;
    }

    const fullLocation = `${city}, ${district}, ${province}`;
    const listingTitle = `${type} in ${city}`;

    setLoading(true);
      
    try {
      console.log("Submitting room with coordinates:", { latitude, longitude });
      await axios.post(
        "http://localhost:5000/api/rooms/add",
        { title: listingTitle, description, location: fullLocation, price: Number(price), latitude, longitude },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Property listed successfully!");
      navigate("/rooms");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to add room. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Post a New Property</h2>
        <p className="text-slate-500 mt-2 font-medium">Professional selection system — No manual typing required for key details</p>
      </div>

      <Card className="p-8 md:p-10 shadow-xl border-slate-100/50 bg-white/80 backdrop-blur-xl transition-all duration-300">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 space-y-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3">Property Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Property Type"
                options={PROPERTY_TYPES}
                value={type}
                onChange={setType}
                placeholder="Select property category"
                required
                className="md:col-span-2"
              />
              <Input
                label="Price per Month (Rs)"
                type="number"
                placeholder="e.g. 15000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="bg-indigo-50/30 p-6 rounded-2xl border border-indigo-100/30 space-y-6">
            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-indigo-100 pb-3">Systematic Location Selection</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Select
                label="Province"
                options={PROVINCES}
                value={province}
                onChange={setProvince}
                placeholder="Select Province"
                required
              />
              <Select
                label="District"
                options={districts}
                value={district}
                onChange={setDistrict}
                placeholder="Select District"
                required
                disabled={!province}
              />
              <Select
                label="City / Municipality"
                options={cities}
                value={city}
                onChange={setCity}
                placeholder="Select City"
                required
              />
            </div>

            {/* Map Picker Selection */}
            <div className="space-y-4 mt-8 pt-6 border-t border-indigo-100/50">
               <div className="flex items-center justify-between">
                 <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-indigo-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                   </svg>
                   Pin Exact Location on Map
                 </h4>
                 <span className="text-xs font-semibold text-indigo-400 bg-indigo-50/50 px-3 py-1 rounded-md border border-indigo-100/50">Optional</span>
               </div>
               <MapComponent 
                 isPicker={true} 
                 height="350px"
                 searchQuery={city ? `${city}, ${district}` : district ? district : ""}
                 onLocationSelect={(pos) => {
                   setLatitude(pos.lat);
                   setLongitude(pos.lng);
                 }} 
               />
            </div>
          </div>

          <div className="space-y-4">
            <Input
              label="Detailed Description"
              placeholder="Tell tenants more about the neighborhood, security, water supply, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={4}
              required
            />
          </div>

          <div className="pt-6 border-t border-slate-50 flex flex-col md:flex-row gap-4">
            <Button 
              type="submit" 
              className="flex-1 py-4 text-base font-bold shadow-lg shadow-indigo-500/20"
              disabled={loading}
            >
              {loading ? "Publishing..." : "Publish Property Listing"}
            </Button>
            <Button 
              type="button" 
              variant="secondary" 
              className="px-8 border-slate-200"
              onClick={() => navigate("/rooms")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
