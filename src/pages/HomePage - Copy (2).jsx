import { useState } from "react";
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
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [zipInput, setZipInput] = useState("");

  const handleSearch = () => {
    const zip = zipInput || (selectedLocation?.zipCodes?.[0] ?? "");
    if (!zip) {
      alert("Please enter or select a zip code.");
      return;
    }
    navigate(`/results?zip=${zip}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">      
      <header className="w-full flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
        <img
          src={logo}
          alt="Logo"
          className="h-10 w-auto max-w-[100px] object-contain"
        />
        <h1 className="text-3xl font-bold">NearByNinjia</h1>
        </div>
        <button className="text-blue-600 hover:underline">Browse</button>
      </header>
    <div className="flex w-full max-w-4xl mb-6">

  {/* 左边 Location 下拉菜单 */}
  <div className="w-1/2 p-4 border-r">
    <label className="block mb-2 font-medium">Select Location</label>
    <select
      value={selectedLocation}
      onChange={(e) => setSelectedLocation(e.target.value)}
      className="w-full p-3 rounded border shadow"
    >
      <option value="">-- Choose a location --</option>
      {locations.map((loc) => (
        <option key={loc.name} value={loc.name}>
          {loc.name}
        </option>
      ))}
    </select>
  </div>

  {/* 右边 Zip Code 输入 */}
  <div className="w-1/2 p-4">
    <label className="block mb-2 font-medium">Or Enter Zip Code</label>
    <input
      type="text"
      value={zipInput}
      onChange={(e) => setZipInput(e.target.value)}
      placeholder="Enter Zip Code"
      className="w-full p-3 rounded border shadow"
    />
  </div>
</div>


      {/* Categories 展示 */}
      <div className="grid grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="flex flex-col items-center p-4 bg-white rounded shadow cursor-pointer hover:bg-blue-100"
            onClick={() => {
              const zip = zipInput || (selectedLocation?.zipCodes?.[0] ?? "");
              if (!zip) {
                alert("Please enter or select a zip code.");
                return;
              }
              navigate(`/results?zip=${zip}&category=${cat.name}`);
            }}
          >
            <div className="text-3xl mb-2">{cat.icon}</div>
            <div>{cat.name}</div>
          </div>
        ))}
      </div>

      <button
      onClick={handleSearch}
      className="mt-2 w-full bg-blue-600 text-white py-2 rounded"
    >
      🔍 Search
    </button>

    </div>
  );
}
