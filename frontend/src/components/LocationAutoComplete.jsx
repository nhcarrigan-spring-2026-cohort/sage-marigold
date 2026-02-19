import { useState, useEffect, useRef } from "react";

const LocationAutocomplete = ({ onLocationSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);
  const debounceRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!query || selected) {
      setSuggestions([]);
      return;
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=json&addressdetails=1&limit=5`;

        const response = await fetch(url, {
          headers: {
            "User-Agent": "HelpingHandsApp/1.0",
          },
        });

        const data = await response.json();
        setSuggestions(
          data.map((item) => ({
            address: item.display_name,
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lon),
          }))
        );
      } catch (err) {
        console.error("Nominatim fetch error:", err);
      } finally {
        setLoading(false);
      }
    }, 400); 
  }, [query, selected]);

  const handleSelect = (s) => {
    setQuery(s.address);
    setSuggestions([]);
    setSelected(true);
    onLocationSelect({
      address: s.address,
      latitude: s.lat,
      longitude: s.lng,
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelected(false);
        }}
        placeholder="Enter pickup location"
        className="w-full px-3 py-2 rounded-md border border-transparent bg-[#f3f3f5] text-sm outline-none transition-all focus:ring-2 focus:ring-emerald-500"
      />
      
      {loading && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-md shadow-md p-2 text-sm text-gray-500">
          Searching...
        </div>
      )}
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-md shadow-md z-50 max-h-60 overflow-y-auto text-sm">
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => handleSelect(s)}
              className="px-3 py-2 hover:bg-emerald-100 cursor-pointer"
            >
              {s.address}
            </li>
          ))}
        </ul>
      )}

      {query && !loading && suggestions.length === 0 && !selected && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-md shadow-md p-2 text-sm text-gray-500">
          No results found
        </div>
      )}
    </div>
  );
};

export default LocationAutocomplete;
