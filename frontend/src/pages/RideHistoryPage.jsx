import React, { useEffect, useState } from "react";
import axios from "axios";
import RideHistoryCard from "../components/RideHistoryCard";

const RideHistoryPage = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/rides/history", {
          withCredentials: true,
        });
        setRides(response.data || []);
      } catch (error) {
        console.error("Error fetching ride history", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Ride History</h2>

      {loading ? (
        <p>Loading...</p>
      ) : rides.length === 0 ? (
        <p>No ride history found.</p>
      ) : (
        rides.map((ride, index) => <RideHistoryCard key={index} ride={ride} />)
      )}
    </div>
  );
};

export default RideHistoryPage;
