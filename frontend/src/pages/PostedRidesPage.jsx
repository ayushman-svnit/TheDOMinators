import React, { useEffect, useState } from "react";
import axios from "axios";
import PostedRideCard from "../components/PostedRideCard";

const PostedRidesPage = () => {
  const [rides, setRides] = useState(null);
  const token = localStorage.getItem("carpool-token");

  const fetchPostedRides = async () => {
    try {
      const res = await axios.get("/api/rides/posted", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Posted rides response:", res.data);
      setRides(res.data); // ✅ direct set
    } catch (err) {
      console.error("Failed to fetch posted rides", err);
      setRides([]);
    }
  };

  useEffect(() => {
    fetchPostedRides();
  }, []);

  if (rides === null) {
    return <p className="text-center text-gray-500 mt-10">Loading your posted rides...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Posted Rides</h1>

      {rides.length === 0 ? (
        <p className="text-gray-600">You haven’t posted any rides yet.</p>
      ) : (
        rides.map((ride) => (
          <PostedRideCard
            key={ride._id}
            ride={ride}
            token={token}
            onStatusUpdate={fetchPostedRides}
          />
        ))
      )}
    </div>
  );
};

export default PostedRidesPage;
