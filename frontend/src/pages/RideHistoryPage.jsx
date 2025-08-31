

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import RideHistoryCard from "../components/RideHistoryCard";

// const RideHistoryPage = () => {
//   const [rides, setRides] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentUserId, setCurrentUserId] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [historyResponse, userResponse] = await Promise.all([
//           axios.get("https://thedominators.onrender.com/api/rides/history", { withCredentials: true }),
//           axios.get("https://thedominators.onrender.com/api/carpool/me", { withCredentials: true })
//         ]);
//         setRides(historyResponse.data || []);
//         setCurrentUserId(userResponse.data._id);
//       } catch (error) {
//         console.error("Error fetching data", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleRatingSubmit = async (rideId, toUserId, score, comment) => {
//     try {
//       await axios.post("https://thedominators.onrender.com/api/ratings", 
//         { rideId, toUserId, score, comment },
//         { withCredentials: true }
//       );
//       // Refresh ride history to show updated ratings
//       const response = await axios.get("https://thedominators.onrender.com/api/rides/history", {
//         withCredentials: true,
//       });
//       setRides(response.data || []);
//     } catch (error) {
//       console.error("Error submitting rating", error);
//       alert(error.response?.data?.message || "Failed to submit rating");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-10 px-4 pb-10">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Ride History</h2>

//       {loading ? (
//         <p>Loading...</p>
//       ) : rides.length === 0 ? (
//         <p>No ride history found.</p>
//       ) : (
//         rides.map((ride, index) => (
//           <RideHistoryCard 
//             key={index} 
//             ride={ride} 
//             currentUserId={currentUserId}
//             onRatingSubmit={handleRatingSubmit}
//           />
//         ))
//       )}
//     </div>
//   );
// };

// export default RideHistoryPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import RideHistoryCard from "../components/RideHistoryCard";

const RideHistoryPage = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});
  const token = localStorage.getItem("carpool-token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [historyResponse, userResponse] = await Promise.all([
          axios.get("/api/rides/history", { 
            headers: { Authorization: `Bearer ${token}`, }           }),
          axios.get("/api/carpool/me", { 
            headers: { Authorization: `Bearer ${token}`, }})
        ]);
        setRides(historyResponse.data.reverse() || []);
        setCurrentUserId(userResponse.data._id);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRatingSubmit = async (rideId, toUserId, score, comment) => {
  try {
    const res = await axios.post("/api/ratings", 
      { rideId, toUserId, score, comment },
      { withCredentials: true }
    );

    // Refresh rides after successful rating
    const response = await axios.get("/api/rides/history", {
      withCredentials: true,
    });
    setRides(response.data || []);

    // Clear any error message
    setErrorMessages(prev => ({ ...prev, [rideId]: null }));

    return { success: true, message: res.data.message }; // ✅ return message
  } catch (error) {
    const msg = error.response?.data?.message || "Failed to submit rating";
    setErrorMessages(prev => ({ ...prev, [rideId]: msg }));

    return { success: false, message: msg }; // ❌ return error
  }
};


  return (
    <div className="ride-history-container">
      <h2 className="my-heading-k">Ride History</h2>

      {loading ? (
        <p>Loading...</p>
      ) : rides.length === 0 ? (
        <p>No ride history found.</p>
      ) : (
        <div className="ride-history-grid">
          {rides.map((ride, index) => (
            <RideHistoryCard 
              key={index} 
              ride={ride} 
              currentUserId={currentUserId}
              onRatingSubmit={handleRatingSubmit}
              errorMessage={errorMessages[ride._id]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RideHistoryPage;