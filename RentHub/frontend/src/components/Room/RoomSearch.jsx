import React, { useState, useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Select from "../ui/Select";
import { PROVINCES, DISTRICTS_BY_PROVINCE, CITIES_BY_DISTRICT, PROPERTY_TYPES } from "../../constants/nepalData";

export default function RoomSearch({ onSearch }) {
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");

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

  const handleSearch = () => {
    onSearch({ province, district, city, type, price });
  };

  const handleClear = () => {
    setProvince("");
    setDistrict("");
    setCity("");
    setType("");
    setPrice("");
    onSearch({});
  };

  return (
    <Card className="p-6 bg-white/60 backdrop-blur-md mb-10 border-indigo-50 shadow-lg">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Province"
            options={PROVINCES}
            value={province}
            onChange={setProvince}
            placeholder="All Provinces"
          />
          <Select
            label="District"
            options={districts}
            value={district}
            onChange={setDistrict}
            placeholder="All Districts"
            disabled={!province}
          />
          <Select
            label="City / Municipality"
            options={cities}
            value={city}
            onChange={setCity}
            placeholder="All Cities"
            disabled={!district}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-100 pt-6 items-end">
          <Select
            label="Property Type"
            options={PROPERTY_TYPES}
            value={type}
            onChange={setType}
            placeholder="Any Type"
          />
          <Input
            label="Max Monthly Rent (Rs)"
            type="number"
            placeholder="e.g. 20000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <div className="flex gap-2">
            <Button 
              className="flex-1 h-[42px] px-8 flex items-center justify-center gap-2 font-bold shadow-indigo-500/20 shadow-lg"
              onClick={handleSearch}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              Filter Properties
            </Button>

            {(province || district || city || type || price) && (
              <Button 
                variant="secondary" 
                className="h-[42px] px-4 text-xs font-bold uppercase tracking-widest border-slate-200"
                onClick={handleClear}
              >
                Reset
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

