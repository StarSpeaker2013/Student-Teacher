import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const dummyTeachers = [
  {
    id: 1,
    name: "Andy",
    subjects: ["Math"],
    location: "Irvine - WestPark",
    image: "../assets/avatars/images.jpeg",
    bio: "Passionate math teacher with 5 years of experience helping students excel in algebra and calculus.",
    time: ["Morning"],
    date: "2025-04-25",
    size: "Private",
    price: 8,
    language: ["English"],
    level: "Beginner"
  },
  {
    id: 2,
    name: "Emily",
    subjects: ["Tennis"],
    location: "Irvine - OrchardHill",
    image: "../assets/avatars/images.jpeg",
    bio: "Certified coach with a love for sports and mentoring young athletes in tennis and swimming.",
    time: ["Afternoon"],
    date: "2025-04-26",
    size: "Group",
    price: 25,
    language: ["Chinese", "English"],
    level: "Intermediate"
  },
];

function FiltersBar({ filters, setFilters }) {
  const [openFilter, setOpenFilter] = useState(null);
  const [selectedLabels, setSelectedLabels] = useState({
    date: "Date",
    time: "Time",
    size: "Class size",
    price: "Price",
    location: "Location",
    level: "Level"
  });

  const [tempFilters, setTempFilters] = useState({
    date: filters.date || "",
    time: filters.time || "",
    size: filters.size || "",
    price: filters.maxPrice || "",
    location: filters.location || "",
    level: filters.level || ""
  });

  const defaultLabels = {
    date: "Date",
    time: "Time",
    size: "Class size",
    price: "Price",
    location: "Location",
    level: "Level"
  };

  const timeOptions = [
    { label: "Any", value: null },
    { label: "Morning (7am–12pm)", value: "Morning" },
    { label: "Afternoon (12pm–5pm)", value: "Afternoon" },
    { label: "Evening (5pm–10pm)", value: "Evening" }
  ];

  const priceOptions = [
    { label: "Any", value: null },
    { label: "Under $10", value: 10 },
    { label: "Under $20", value: 20 },
    { label: "Under $30", value: 30 },
    { label: "Under $50", value: 50 }
  ];

  const locationOptions = [
    { label: "Any", value: null },
    ...Array.from(new Set(dummyTeachers.map(t => t.location))).map(location => ({ label: location, value: location }))
  ];

  const levelOptions = [
    { label: "Any", value: null },
    { label: "Beginner", value: "Beginner" },
    { label: "Intermediate", value: "Intermediate" },
    { label: "Advanced", value: "Advanced" }
  ];

  const toggleFilter = (name) => {
    setOpenFilter(openFilter === name ? null : name);
  };

  const applyFilter = (filterName) => {
    const value = tempFilters[filterName];
    setFilters((prev) => ({ ...prev, [filterName]: value }));

    let label = defaultLabels[filterName];
    if (value === null || value === "") {
      label = defaultLabels[filterName];
    } else {
      if (filterName === "price") {
        const match = priceOptions.find((opt) => opt.value === value);
        if (match) label = match.label;
      } else if (filterName === "time") {
        const match = timeOptions.find((opt) => opt.value === value);
        if (match) label = match.label;
      } else if (filterName === "location") {
        const match = locationOptions.find((opt) => opt.value === value);
        if (match) label = match.label;
      } else if (filterName === "level") {
        const match = levelOptions.find((opt) => opt.value === value);
        if (match) label = match.label;
      } else if (value) {
        label = value;
      }
    }

    setSelectedLabels((prev) => ({
      ...prev,
      [filterName]: label
    }));

    setOpenFilter(null);
  };

  const clearFilter = (filterName) => {
    setTempFilters((prev) => ({ ...prev, [filterName]: "" }));
    setFilters((prev) => ({ ...prev, [filterName]: "" }));
    setSelectedLabels((prev) => ({
      ...prev,
      [filterName]: defaultLabels[filterName]
    }));
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".filter-dropdown")) {
      setOpenFilter(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      {/* Date */}
      <div className="relative">
        <button
          onClick={() => toggleFilter("date")}
          className="border rounded-full px-4 py-2 text-sm hover:bg-gray-100"
        >
          {selectedLabels.date} ▼
        </button>
        {openFilter === "date" && (
          <div className="absolute top-12 left-0 rounded-xl shadow-md p-5 z-[9999] max-w-[300px] bg-[#d2eef7] text-left filter-dropdown">
            <input
              type="date"
              value={tempFilters.date || new Date().toISOString().split("T")[0]}
              onChange={(e) =>
                setTempFilters((prev) => ({ ...prev, date: e.target.value }))
              }
              className="w-full border p-1 rounded"
            />
             <div className="flex justify-end mt-2">
              <button
                onClick={() => clearFilter("date")}
                className="mr-2 bg-gray-500 text-white text-sm px-3 py-1 rounded hover:bg-gray-600"
              >
                Clear
              </button>
            <button
              onClick={() => applyFilter("date")}
              className="mt-2 self-end bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
            >
              Apply
            </button>
          </div>
          </div>
        )}
      </div>

      {/* Time */}
      <div className="relative">
        <button
          onClick={() => toggleFilter("time")}
          className="border rounded-full px-4 py-2 text-sm hover:bg-gray-100"
        >
          {selectedLabels.time} ▼
        </button>
        {openFilter === "time" && (
          <div className="absolute top-12 left-0 rounded-xl shadow-md p-5 z-[9999] w-[200px] bg-[#d2eef7] text-left filter-dropdown">
            <div className="flex flex-col items-start pl-2">
              {timeOptions.map(({ label, value }) => (
                <label className="flex items-center space-x-2 mb-2 whitespace-nowrap" key={label}>
                  <input
                    type="radio"
                    name="time"
                    value={value || "Any"}
                    checked={tempFilters.time === value}
                    onChange={() => setTempFilters((prev) => ({ ...prev, time: value }))}
                  />
                  <span>{label}</span>
                </label>
              ))}
              <button
                onClick={() => applyFilter("time")}
                className="mt-2 self-end bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Class size */}
      <div className="relative">
        <button
          onClick={() => toggleFilter("size")}
          className="border rounded-full px-4 py-2 text-sm hover:bg-gray-100"
        >
          {selectedLabels.size} ▼
        </button>
        {openFilter === "size" && (
          <div className="absolute top-12 left-0 rounded-xl shadow-md p-5 z-[9999] w-[200px] bg-[#d2eef7] text-left filter-dropdown">
            <div className="flex flex-col items-start pl-2">
              {["Any", "Private", "Group"].map((label, idx) => {
                const value = [null, "Private", "Group"][idx];
                return (
                  <label className="flex items-center space-x-2 mb-2 whitespace-nowrap" key={label}>
                    <input
                      type="radio"
                      name="size"
                      value={value || "Any"}
                      checked={tempFilters.size === value}
                      onChange={() => setTempFilters((prev) => ({ ...prev, size: value }))}
                    />
                    <span>{label}</span>
                  </label>
                );
              })}
              <button
                onClick={() => applyFilter("size")}
                className="mt-2 self-end bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Price */}
      <div className="relative">
        <button
          onClick={() => toggleFilter("price")}
          className="border rounded-full px-4 py-2 text-sm hover:bg-gray-100"
        >
          {selectedLabels.price} ▼
        </button>
        {openFilter === "price" && (
          <div className="absolute top-12 left-0 rounded-xl shadow-md p-5 z-[9999] w-[200px] bg-[#d2eef7] text-left filter-dropdown">
            <div className="flex flex-col items-start pl-2">
              {priceOptions.map(({ label, value }) => (
                <label className="flex items-center space-x-2 mb-2 whitespace-nowrap" key={label}>
                  <input
                    type="radio"
                    name="price"
                    value={value || "Any"}
                    checked={tempFilters.price === value}
                    onChange={() => setTempFilters((prev) => ({ ...prev, price: value }))}
                  />
                  <span>{label}</span>
                </label>
              ))}
              <button
                onClick={() => applyFilter("price")}
                className="mt-2 self-end bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Location */}
      <div className="relative">
        <button
          onClick={() => toggleFilter("location")}
          className="border rounded-full px-4 py-2 text-sm hover:bg-gray-100"
        >
          {selectedLabels.location} ▼
        </button>
        {openFilter === "location" && (
          <div className="absolute top-12 left-0 rounded-xl shadow-md p-5 z-[9999] w-[200px] bg-[#d2eef7] text-left filter-dropdown">
            <div className="flex flex-col items-start pl-2">
              {locationOptions.map(({ label, value }) => (
                <label className="flex items-center space-x-2 mb-2 whitespace-nowrap" key={label}>
                  <input
                    type="radio"
                    name="location"
                    value={value || "Any"}
                    checked={tempFilters.location === value}
                    onChange={() => setTempFilters((prev) => ({ ...prev, location: value }))}
                  />
                  <span>{label}</span>
                </label>
              ))}
              <button
                onClick={() => applyFilter("location")}
                className="mt-2 self-end bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Level */}
      <div className="relative">
        <button
          onClick={() => toggleFilter("level")}
          className="border rounded-full px-4 py-2 text-sm hover:bg-gray-100"
        >
          {selectedLabels.level} ▼
        </button>
        {openFilter === "level" && (
          <div className="absolute top-12 left-0 rounded-xl shadow-md p-5 z-[9999] w-[200px] bg-[#d2eef7] text-left filter-dropdown">
            <div className="flex flex-col items-start pl-2">
              {levelOptions.map(({ label, value }) => (
                <label className="flex items-center space-x-2 mb-2 whitespace-nowrap" key={label}>
                  <input
                    type="radio"
                    name="level"
                    value={value || "Any"}
                    checked={tempFilters.level === value}
                    onChange={() => setTempFilters((prev) => ({ ...prev, level: value }))}
                  />
                  <span>{label}</span>
                </label>
              ))}
              <button
                onClick={() => applyFilter("level")}
                className="mt-2 self-end bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const [filters, setFilters] = useState({});

  const filteredTeachers = dummyTeachers.filter((t) => {
    if (filters.date && t.date !== filters.date) return false;
    if (filters.size && t.size !== filters.size) return false;
    if (filters.time != null && !t.time.includes(filters.time)) return false;
    if (filters.maxPrice != null && t.price > filters.maxPrice) return false;
    if (filters.location && t.location !== filters.location) return false;
    if (filters.level && t.level !== filters.level) return false;
    if (filters.language && !t.language.includes(filters.language)) return false;
    return true;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Search Results</h2>
        <Link to="/" className="text-sm text-blue-600 underline">Back to Home</Link>
      </div>

      <FiltersBar filters={filters} setFilters={setFilters} />

      <ul>
        {filteredTeachers.map((t) => (
          <li key={t.id} className="mb-6 p-4 bg-white rounded shadow flex gap-4">
            <img src={t.image} alt={t.name} className="w-24 h-24 rounded object-cover" />
            <div>
              <Link to={`/profile/${t.id}`} className="text-blue-600 text-lg font-semibold">
                {t.name}
              </Link>
              <p className="text-gray-700 mt-1">{t.bio}</p>
              <p className="mt-2"><strong>Subjects:</strong> {t.subjects.join(", ")}</p>
              <p><strong>Location:</strong> {t.location}</p>
              <p><strong>Language:</strong> {t.language.join(", ")}</p>
              <p><strong>Level:</strong> {t.level}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}