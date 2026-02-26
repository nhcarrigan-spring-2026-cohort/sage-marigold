import SkeletonCard from "./SkeletonCard";
import Filter from "./Filter";
import { useEffect, useState } from "react";
//import { mockDonations } from "../data/mockDonations";
import ItemCard from "./ItemCard";
import { FiAlertTriangle } from "react-icons/fi";
import { FaBoxOpen } from "react-icons/fa";
import { MdMyLocation, MdLocationOn, MdRefresh } from "react-icons/md";

const ItemList = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userCoords, setUserCoords] = useState(null);
  const [isGeoLoading, setIsGeoLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    condition: "",
    location: "",
    search: "",
  });

  const handleNearMeClick = () => {
    setIsGeoLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
          setIsGeoLoading(false);
        },
        (geoError) => {
          console.error("Geolocation error: ", geoError);
          alert("Could not get your location. Please check your browser permissions (^_^)");
          setIsGeoLoading(false);
        }
      );
    }
    else {
      alert("Geolocation is not supported by your browser :( ");
      setIsGeoLoading(false);
    }
  };

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (filters.category) params.append("category", filters.category);
        if (filters.condition) params.append("condition", filters.condition);
        if (filters.search) params.append("search", filters.search);
        if (filters.location) params.append("location", filters.location);
        if (userCoords) {
          params.append("lat", userCoords.lat);
          params.append("lng", userCoords.lng);
        }


        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/items/available?${params.toString()}`,
        );
        const data = await response.json();

        if (data.ok) {
          setDonations(data.items);
        }
        else {
          console.error("Backend error, no items found");
          setError(data.msg);
          setDonations([]);
        }
      }
      catch (err) {
        console.error("Fetch error:", err);
        setError(err);
        setDonations([]);
      }
      finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, [filters, userCoords]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-white border border-red-200 rounded-xl p-8 max-w-md text-center shadow-sm">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <FiAlertTriangle className="text-red-600 text-2xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600 mb-6">
            We couldn't load the donations right now. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-emerald-700 text-white px-6 py-2.5 rounded-lg hover:bg-emerald-800 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <Filter filters={filters} setFilters={setFilters} />
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${userCoords
            ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          onClick={!userCoords ? handleNearMeClick : undefined}
        >
          <div className="flex items-center gap-2">
            {isGeoLoading ? (
              <MdRefresh className="animate-spin text-emerald-500 text-lg" />
            ) : userCoords ? (
              <MdLocationOn className="text-emerald-600 text-lg" />
            ) : (
              <MdMyLocation className="text-emerald-500 text-lg" />
            )}

            <span className={isGeoLoading ? "animate-pulse" : ""}>
              {isGeoLoading
                ? "Searching..."
                : userCoords
                  ? "Location Active"
                  : "Find Near Me"}
            </span>
          </div>

          {userCoords && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); 
                setUserCoords(null);
              }}
              className="ml-2 bg-emerald-200 hover:bg-emerald-300 text-emerald-800 rounded-full w-5 h-5 flex items-center justify-center text-xs transition-colors"
              title="Clear location"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {!loading && donations.length === 0 ? (
        // Empty state when no results
        <div className="text-center py-16 px-4">
          <FaBoxOpen className="mx-auto text-6xl text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No items found
          </h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your filters or search term
          </p>
          <button
            onClick={() =>
              setFilters({
                category: "",
                condition: "",
                location: "",
                search: "",
              })
            }
            className="bg-emerald-700 text-white px-6 py-3 rounded-lg hover:bg-emerald-800 transition"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
            : donations.map((donation) => (
              <ItemCard key={donation.id} {...donation} />
            ))}
        </div>
      )}
    </>
  );
};

export default ItemList;
