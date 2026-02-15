import { useEffect, useState } from "react";
import { mockDonations } from "../data/mockDonations";
import ItemCard from "./ItemCard";
import Skeleton from "react-loading-skeleton";

const ItemList = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch items from backend API on component mount
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));
        // const response = await fetch("/api/donations");

        // if (!response.ok) {
        //   throw new Error("Failed to fetch items");
        // }
        // const data = await response.json();
        setDonations(mockDonations);
        console.log("Fetched items:", mockDonations);
        setError(null);
      } catch (error) {
        console.error("Error fetching items:", error);
        setError(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, []);

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error: {error.message}
      </div>
    );
  }
  return (
    <div className="grid space-y-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {loading ? (
        <div></div>
      ) : (
        donations.map((donation) => (
          <ItemCard key={donation.id} {...donation} />
        ))
      )}
    </div>
  );
};
export default ItemList;
