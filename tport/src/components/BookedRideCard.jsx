// import React from "react";

// const BookedRideCard = ({ ride }) => {
//   const formattedDate = new Date(ride.date).toLocaleDateString();

//   // ✅ Determine color for status
//   const getStatusClass = (status) => {
//     switch (status) {
//       case "completed":
//         return "text-green-600 font-semibold";
//       case "cancelled":
//         return "text-red-600 font-semibold";
//       default:
//         return "text-gray-600 font-semibold";
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//       <h3 className="text-xl font-semibold mb-2 text-indigo-600">
//         {ride.pickup} ➝ {ride.drop}
//       </h3>
//       <p className="text-gray-700 mb-1"><strong>Date:</strong> {formattedDate}</p>
//       <p className="text-gray-700 mb-1"><strong>Time:</strong> {ride.time}</p>
      
//       {/* ✅ Updated Status UI */}
//       <p className="text-gray-700 mb-1">
//         <strong>Status:</strong>{" "}
//         <span className={getStatusClass(ride.status)}>{ride.status}</span>
//       </p>

//       <p className="text-gray-700 mb-1"><strong>Driver:</strong> {ride.driverName}</p>
//       <p className="text-gray-700 mb-1"><strong>Seats Booked:</strong> {ride.seatsBooked}</p>
//       <p className="text-gray-700 mb-1"><strong>Price per Seat:</strong> ₹{ride.pricePerSeat}</p>
//       <p className="text-gray-700 mb-1"><strong>Total Fare:</strong> ₹{ride.totalFare}</p>
//     </div>
//   );
// };

// export default BookedRideCard;

import React from "react";
import "./BookedRideCard.css";

const BookedRideCard = ({ ride }) => {
  const formattedDate = new Date(ride.date).toLocaleDateString();

  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "status-completed";
      case "cancelled":
        return "status-cancelled";
      default:
        return "status-upcoming";
    }
  };

  return (
    <div className="booked-ride-card">
      <div className="card-header">
        <div className="route-info">
          <h3>{ride.pickup} ➝ {ride.drop}</h3>
        </div>
        <div className="datetime-info">
          <span>{formattedDate} • {ride.time}</span>
        </div>
      </div>

      <div className="ride-details">
        <div className="detail-item">
          <span className="detail-label">Status:</span>
          <span className={`status-badge ${getStatusClass(ride.status)}`}>
            {ride.status}
          </span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Driver:</span>
          <span>{ride.driverName}</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Seats Booked:</span>
          <span>{ride.seatsBooked}</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Price per Seat:</span>
          <span>₹{ride.pricePerSeat}</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Total Fare:</span>
          <span className="total-fare">₹{ride.totalFare}</span>
        </div>
      </div>
    </div>
  );
};

export default BookedRideCard;