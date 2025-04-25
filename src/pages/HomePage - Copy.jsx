import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo from '../assets/nearbyninjia.png';

const locations = [
  { name: "Irvine", zipCodes: ["92606", "92612"] },
  { name: "Tustin", zipCodes: ["92780", "92782"] },
  { name: "Santa Ana", zipCodes: ["92701", "92703"] },
];

const categories = [
  { name: "Math", icon: "🧮" },
  { name: "Swim", icon: "🏊" },
  { name: "Tennis", icon: "🎾" },
  { name: "Language", icon: "📘" },
  { name: "Social Study", icon: "🌍" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [zipInput, setZipInput] = useState("");

  const handleSearch = () => {
    const locationZip = locations.find(loc => loc.name === selectedLocation)?.zipCodes?.[0];
    const zip = zipInput || locationZip;
    if (!zip) {
      alert("Please enter or select a zip code.");
      return;
    }
    navigate(`/results?zip=${zip}&subject=${selectedSubject}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <header className="w-full flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-10 w-auto max-w-[100px] object-contain" />
          <h1 className="text-3xl font-bold">NearByNinjia</h1>
        </div>
        <div className="flex space-x-4">
          <button className="text-blue-600 hover:underline">Browse</button>
          <button className="text-blue-600 hover:underline">Login</button>
          <button className="text-blue-600 hover:underline">Sign Up</button>
        </div>
      </header>

      <div className="flex flex-col items-center w-full max-w-sm sm:max-w-xs mb-6 space-y-4">
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full p-3 rounded border shadow"
        >
          <option value="">-- Choose Location --</option>
          {locations.map((loc) => (
            <option key={loc.name} value={loc.name}>
              {loc.name}
            </option>
          ))}
        </select>

        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="w-full p-3 rounded border shadow"
        >
          <option value="">-- Choose Subject --</option>
          {categories.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={zipInput}
          onChange={(e) => setZipInput(e.target.value)}
          placeholder="Enter Zip Code"
          className="w-full p-3 rounded border shadow"
        />

        <button
          onClick={handleSearch}
          className="w-full bg-blue-600 text-white py-2 rounded flex items-center justify-center"
        >
          🔍 Search
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">What do you want to learn?</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="flex flex-col items-center p-6 bg-white rounded shadow cursor-pointer hover:bg-blue-100"
            onClick={() => navigate(`/results?category=${cat.name}`)}
          >
            <div className="text-4xl mb-2">{cat.icon}</div>
            <div className="text-lg">{cat.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
