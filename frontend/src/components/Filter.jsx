import Search from "./Search";
import { useEffect, useRef, useState } from "react";
import { FaFilter, FaBoxOpen } from "react-icons/fa";
import { FaLocationDot, FaChevronDown } from "react-icons/fa6";

const Filter = ({ filters, setFilters }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);
  const dropdownRef = useRef(null);

  const categories = [
    "Electronics",
    "Clothing",
    "Books",
    "Furniture",
    "Toys",
    "Sports",
    "Home & Garden",
    "Other",
  ];

  const conditions = ["New", "Like New", "Good", "Fair", "Poor"];

  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value,
    });

    if (value && !activeFilters.includes(value)) {
      setActiveFilters([...activeFilters, value]);
    }
  };

  const removeFilter = (filterValue) => {
    setActiveFilters(activeFilters.filter((f) => f !== filterValue));

    const newFilters = { ...filters };
    Object.keys(newFilters).forEach((key) => {
      if (newFilters[key] === filterValue) {
        newFilters[key] = "";
      }
    });
    setFilters(newFilters);
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setFilters({ category: "", condition: "", location: "", search: "" });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="my-5 flex md:flex-row flex-col items-end gap-4">
        <Search
          search={filters.search}
          setSearch={(value) => setFilters({ ...filters, search: value })}
        />

        <div ref={dropdownRef} className="flex gap-5">
          <div className="relative">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "category" ? null : "category")
              }
              className={`flex text-[12px] items-center cursor-pointer gap-2 border rounded-2xl py-1.75 px-[10.5px] ${
                filters.category
                  ? "bg-emerald-100 border-emerald-600"
                  : "border-emerald-500 hover:bg-emerald-100"
              }`}
              type="button"
            >
              <FaFilter className="text-emerald-500" />
              {filters.category || "Category"}
              <FaChevronDown
                className={`text-emerald-500 transition-transform ${
                  openDropdown === "category" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openDropdown === "category" && (
              <div className="absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {categories.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      handleFilterChange("category", option);
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-emerald-50 transition-colors ${
                      filters.category === option
                        ? "bg-emerald-50 font-semibold"
                        : ""
                    } first:rounded-t-lg last:rounded-b-lg`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() =>
                setOpenDropdown(
                  openDropdown === "condition" ? null : "condition"
                )
              }
              className={`flex text-[12px] items-center cursor-pointer gap-2 border rounded-2xl py-1.75 px-[10.5px] ${
                filters.condition
                  ? "bg-emerald-100 border-emerald-600"
                  : "border-emerald-500 hover:bg-emerald-100"
              }`}
              type="button"
            >
              <FaBoxOpen className="text-emerald-500" />
              {filters.condition || "Condition"}
              <FaChevronDown
                className={`text-emerald-500 transition-transform ${
                  openDropdown === "condition" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openDropdown === "condition" && (
              <div className="absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {conditions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      handleFilterChange("condition", option);
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-emerald-50 transition-colors ${
                      filters.condition === option
                        ? "bg-emerald-50 font-semibold"
                        : ""
                    } first:rounded-t-lg last:rounded-b-lg`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative flex items-center gap-2 border border-emerald-500 rounded-2xl hover:bg-emerald-100 py-1.75 px-[10.5px]">
            <FaLocationDot className="text-emerald-500" />
            <input
              type="text"
              placeholder="Location..."
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="text-[12px] bg-transparent outline-none w-24 cursor-pointer placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-[#717182]">Active Filters:</span>
          {activeFilters.map((filter, index) => (
            <span
              key={index}
              className="font-medium rounded-md flex gap-1 bg-gray-200 text-xs py-0.5 px-2 justify-between items-center"
            >
              {filter}
              <button
                onClick={() => removeFilter(filter)}
                className="ml-1 text-[#717182] hover:text-[#0a0a0a]"
              >
                ×
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={clearAllFilters}
            className="ml-2 text-[12px] text-emerald-500 p-2 hover:bg-emerald-50 rounded"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

export default Filter;