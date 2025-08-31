// import React from "react";
// import axios from "axios";

// const PostedRideCard = ({ ride, token, onStatusUpdate }) => {
//   const formattedDate = new Date(ride.date).toLocaleDateString();

//   const handleStatusChange = async (newStatus) => {
//     try {
//       const res = await axios.post(
//         "/api/rides/update",
//         { rideId: ride._id, status: newStatus },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert(res.data.message);
//       onStatusUpdate(); // refetch rides after update
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Failed to update status");
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-4">
//       <h3 className="text-xl font-semibold text-indigo-600 mb-2">
//         {ride.pickupLocation} ➝ {ride.dropLocation}
//       </h3>

//       <p className="text-gray-700 mb-1"><strong>Date:</strong> {formattedDate}</p>
//       <p className="text-gray-700 mb-1"><strong>Time:</strong> {ride.time}</p>
//       <p className="text-gray-700 mb-1"><strong>Status:</strong> <span className="font-semibold">{ride.status}</span></p>
//       <p className="text-gray-700 mb-1"><strong>Price per Seat:</strong> ₹{ride.pricePerSeat}</p>
//       <p className="text-gray-700 mb-1"><strong>Available Seats:</strong> {ride.availableSeats}</p>

//       <p className="text-gray-700 mb-1">
//         <strong>Vehicle:</strong> {ride.vehicleDetails?.model} ({ride.vehicleDetails?.number})
//       </p>

//       {ride.bookedUsers && ride.bookedUsers.length > 0 ? (
//         <div className="mt-4">
//           <p className="font-semibold text-gray-800 mb-2">Booked Users:</p>
//           <ul className="list-disc list-inside text-gray-700">
//             {ride.bookedUsers.map((user, index) => (
//               <li key={index}>
//                 {user.username} ({user.email}) – Seats Booked: {user.seatsBooked}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <p className="text-gray-500 mt-2">No users have booked this ride yet.</p>
//       )}

//       {ride.status === "upcoming" && (
//         <div className="mt-4 space-x-4">
//           <button
//             onClick={() => handleStatusChange("completed")}
//             className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
//           >
//             Mark as Completed
//           </button>
//           <button
//             onClick={() => handleStatusChange("cancelled")}
//             className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
//           >
//             Cancel Ride
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostedRideCard;

import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  DirectionsCar,
  Event,
  Schedule,
  People,
  AttachMoney,
  CheckCircle,
  Cancel,
  Person
} from '@mui/icons-material';
import './PostedRideCard.css';

const PostedRideCard = ({ ride, token, onStatusUpdate }) => {
  const [statusMessage, setStatusMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleStatusChange = async (newStatus) => {
    try {
      setProcessing(true);
      setStatusMessage(null);
      setIsError(false);
      
      const res = await axios.post(
        "/api/rides/update",
        { rideId: ride._id, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStatusMessage(res.data.message);
      setIsError(false);
      onStatusUpdate();
    } catch (err) {
      console.error(err);
      setStatusMessage(err.response?.data?.message || "Failed to update status");
      setIsError(true);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <motion.div
      className="posted-ride-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="card-header">
        <div className="route-info">
          <DirectionsCar className="route-icon" />
          <h3>{ride.pickupLocation} ➝ {ride.dropLocation}</h3>
        </div>
        <div className="datetime-info">
          <Event className="date-icon" />
          <span>{new Date(ride.date).toLocaleDateString()}</span>
          <Schedule className="time-icon" />
          <span>{ride.time}</span>
        </div>
      </div>

      <div className="ride-details">
        <div className="detail-item">
          <span className={`status-badge ${ride.status}`}>
            {ride.status}
          </span>
        </div>
        <div className="detail-item">
          <AttachMoney className="detail-icon" />
          <span>₹{ride.pricePerSeat} per seat</span>
        </div>
        <div className="detail-item">
          <People className="detail-icon" />
          <span>{ride.availableSeats} seats available</span>
        </div>
      </div>

      <div className="vehicle-info">
        <DirectionsCar className="vehicle-icon" />
        <span>{ride.vehicleDetails?.model} ({ride.vehicleDetails?.number})</span>
      </div>

      {ride.bookedUsers?.length > 0 ? (
        <div className="booked-users-section">
          <h4>Passengers:</h4>
          <div className="users-grid">
            {ride.bookedUsers.map((user, index) => (
              <div key={index} className="user-card">
                <Person className="user-icon" />
                <div className="user-info">
                  <span className="user-name">{user.username}</span>
                  <span className="user-details">{user.email} • {user.seatsBooked} seat(s)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="no-users-message">
          <p>No passengers have booked this ride yet</p>
        </div>
      )}

      {ride.status === "upcoming" && (
        <div className="action-buttons">
          <button
            onClick={() => handleStatusChange("completed")}
            className="complete-button"
            disabled={processing}
          >
            {processing ? 'Processing...' : 'Mark as Completed'}
          </button>
          <button
            onClick={() => handleStatusChange("cancelled")}
            className="cancel-button"
            disabled={processing}
          >
            {processing ? 'Processing...' : 'Cancel Ride'}
          </button>
        </div>
      )}

      {statusMessage && (
        <motion.div 
          className={`status-message ${isError ? 'error' : 'success'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {isError ? <Cancel className="status-icon" /> : <CheckCircle className="status-icon" />}
          <span>{statusMessage}</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PostedRideCard;