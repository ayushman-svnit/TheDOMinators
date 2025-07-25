// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import BookedRideCard from "../components/BookedRideCard";

// const BookedRidesPage = () => {
//   const [bookedRides, setBookedRides] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchBookedRides = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/rides/booked", {
//         withCredentials: true,
//       });
//       setBookedRides(response.data);
//     } catch (error) {
//       console.error("Error fetching booked rides:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookedRides();
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-4">
//       <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Your Booked Rides</h2>
//       {loading ? (
//         <p className="text-center text-gray-600">Loading rides...</p>
//       ) : bookedRides.length === 0 ? (
//         <p className="text-center text-gray-500">No rides booked yet.</p>
//       ) : (
//         <div className="space-y-4">
//           {bookedRides.map((ride) => (
//             <BookedRideCard key={ride.rideId} ride={ride} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookedRidesPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import BookedRideCard from "../components/BookedRideCard";

const BookedRidesPage = () => {
  const [bookedRides, setBookedRides] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookedRides = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/rides/booked", {
        withCredentials: true,
      });
      setBookedRides(response.data);
    } catch (error) {
      console.error("Error fetching booked rides:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookedRides();
  }, []);

  return (
    <div className="booked-rides-container">
      <h2>Your Booked Rides</h2>
      {loading ? (
        <p className="loading-message">Loading rides...</p>
      ) : bookedRides.length === 0 ? (
        <p className="empty-message">No rides booked yet.</p>
      ) : (
        <div className="booked-rides-grid">
          {bookedRides.map((ride) => (
            <BookedRideCard key={ride.rideId} ride={ride} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedRidesPage;