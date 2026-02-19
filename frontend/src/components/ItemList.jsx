import SkeletonCard from "./SkeletonCard";
import Filter from "./Filter"; 
import { useEffect, useState } from "react";
import { mockDonations } from "../data/mockDonations";
import ItemCard from "./ItemCard";
import { FiAlertTriangle } from "react-icons/fi";
import { FaBoxOpen } from "react-icons/fa";

const ItemList = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: "",
    condition: "",
    location: "",
    search: "",
  });

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        
        let allDonations = [];
        try {
          const response = await fetch('http://localhost:3000/api/donations');
          if (response.ok) {
            const data = await response.json();
            allDonations = data.length > 0 ? data : mockDonations;
          } else {
            allDonations = mockDonations;
          }
        } catch (fetchError) {
          console.warn("Backend unavailable, using mock data", fetchError);
          allDonations = mockDonations;
        }

        let filtered = [...allDonations];

        if (filters.category) {
          filtered = filtered.filter(item => item.category === filters.category);
        }

        if (filters.condition) {
          filtered = filtered.filter(item => item.condition === filters.condition);
        }

        if (filters.location) {
          filtered = filtered.filter(item => 
            item.location.toLowerCase().includes(filters.location.toLowerCase())
          );
        }

        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filtered = filtered.filter(item => 
            item.title.toLowerCase().includes(searchLower) ||
            item.description.toLowerCase().includes(searchLower)
          );
        }

        setDonations(filtered);
        setError(null);

      } catch (error) {
        console.error("Error processing donations:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [filters]);

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
      <Filter filters={filters} setFilters={setFilters} />

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
            onClick={() => setFilters({ category: "", condition: "", location: "", search: "" })}
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