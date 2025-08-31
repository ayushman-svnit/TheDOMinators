// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import PostedRideCard from "../components/PostedRideCard";

// const PostedRidesPage = () => {
//   const [rides, setRides] = useState(null);
//   const token = localStorage.getItem("carpool-token");

//   const fetchPostedRides = async () => {
//     try {
//       const res = await axios.get("/api/rides/posted", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("Posted rides response:", res.data);
//       setRides(res.data); // ✅ direct set
//     } catch (err) {
//       console.error("Failed to fetch posted rides", err);
//       setRides([]);
//     }
//   };

//   useEffect(() => {
//     fetchPostedRides();
//   }, []);

//   if (rides === null) {
//     return <p className="text-center text-gray-500 mt-10">Loading your posted rides...</p>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-4">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Posted Rides</h1>

//       {rides.length === 0 ? (
//         <p className="text-gray-600">You haven’t posted any rides yet.</p>
//       ) : (
//         rides.map((ride) => (
//           <PostedRideCard
//             key={ride._id}
//             ride={ride}
//             token={token}
//             onStatusUpdate={fetchPostedRides}
//           />
//         ))
//       )}
//     </div>
//   );
// };

// export default PostedRidesPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import PostedRideCard from "../components/PostedRideCard";
import { motion } from "framer-motion";
import './PostedRidesPage.css';

const PostedRidesPage = () => {
  const [rides, setRides] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("carpool-token");

  const fetchPostedRides = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/rides/posted", {
        headers: { Authorization: `Bearer ${token}`, },
      });
      setRides(res.data.reverse());
    } catch (err) {
      console.error("Failed to fetch posted rides", err);
      setRides([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostedRides();
  }, []);

  if (loading) {
    return (
      <div className="posted-rides-container">
        <div className="loading-spinner"></div>
        <p>Loading your posted rides...</p>
      </div>
    );
  }

  return (
    <div className="posted-rides-container">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="page-title"
      >
        Your Posted Rides
      </motion.h1>

      {rides.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="no-rides-message"
        >
          <p>You haven't posted any rides yet.</p>
          <button 
            className="action-button"
            onClick={() => window.location.href = '/post-ride'}
          >
            Post Your First Ride
          </button>
        </motion.div>
      ) : (
        <motion.div 
          className="rides-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {rides.map((ride) => (
            <PostedRideCard
              key={ride._id}
              ride={ride}
              token={token}
              onStatusUpdate={fetchPostedRides}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default PostedRidesPage;