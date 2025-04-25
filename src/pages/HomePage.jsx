import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import logo from '../assets/nearbyninja.png';
import mathIcon from '../assets/icons/math.png';
import swimIcon from '../assets/icons/swim.png';
import tennisIcon from '../assets/icons/tennis.png';
import languageIcon from '../assets/icons/language.png';
import socialIcon from '../assets/icons/social.png';



const locations = [
  { name: "Irvine", zipCodes: ["92606", "92612"] },
  { name: "Tustin", zipCodes: ["92780", "92782"] },
  { name: "Norman", zipCodes: ["73072"] },
  { name: "Santa Ana", zipCodes: ["92701", "92703"] },
];


const categories = [
    { name: "Math", icon: mathIcon },
    { name: "Swim", icon: swimIcon },
    { name: "Tennis", icon: tennisIcon },
    { name: "Language", icon: languageIcon },
    { name: "Social Study", icon: socialIcon },
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
          <h1 className="text-3xl font-bold">NearbyNinja</h1>
        </div>
        <div className="flex space-x-4">
          <Link to="/login" className="text-blue-600 hover:underline">Login/SignUp</Link>
        </div>
      </header>

      <div className="w-full mx-auto mt-10" style={{ maxWidth: '300px' }}>
  <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center space-y-4">
    <h1 className="text-2xl font-bold text-gray-800 text-center">Find a Tutor</h1>

    <select
      value={selectedLocation}
      onChange={(e) => setSelectedLocation(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="">Choose location...</option>
      {locations.map((loc) => (
        <option key={loc.name} value={loc.name}>
          {loc.name}
        </option>
      ))}
    </select>

    <select
      value={selectedSubject}
      onChange={(e) => setSelectedSubject(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="">Choose subject...</option>
      {categories.map((cat) => (
        <option key={cat.name} value={cat.name}>
          {cat.name}
        </option>
      ))}
    </select>

    <button
      onClick={handleSearch}
      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200"
    >
      🔍 Search
    </button>
  </div>
</div>

      <h2 className="text-2xl font-semibold mb-4">What do you want to learn?</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="flex flex-col items-center p-6 bg-white rounded shadow cursor-pointer hover:bg-blue-100"
            onClick={() => navigate(`/results?category=${cat.name}`)}
          >
            <img src={cat.icon} alt={cat.name} className="h-20 w-20 mb-2 object-contain" />
            <div className="text-lg">{cat.name}</div>
          </div>
        ))}
      </div>


    </div>
  );
}
