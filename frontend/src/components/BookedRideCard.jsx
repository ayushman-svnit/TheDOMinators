import React from "react";

const BookedRideCard = ({ ride }) => {
  const formattedDate = new Date(ride.date).toLocaleDateString();

  // ✅ Determine color for status
  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "text-green-600 font-semibold";
      case "cancelled":
        return "text-red-600 font-semibold";
      default:
        return "text-gray-600 font-semibold";
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold mb-2 text-indigo-600">
        {ride.pickup} ➝ {ride.drop}
      </h3>
      <p className="text-gray-700 mb-1"><strong>Date:</strong> {formattedDate}</p>
      <p className="text-gray-700 mb-1"><strong>Time:</strong> {ride.time}</p>
      
      {/* ✅ Updated Status UI */}
      <p className="text-gray-700 mb-1">
        <strong>Status:</strong>{" "}
        <span className={getStatusClass(ride.status)}>{ride.status}</span>
      </p>

      <p className="text-gray-700 mb-1"><strong>Driver:</strong> {ride.driverName}</p>
      <p className="text-gray-700 mb-1"><strong>Seats Booked:</strong> {ride.seatsBooked}</p>
      <p className="text-gray-700 mb-1"><strong>Price per Seat:</strong> ₹{ride.pricePerSeat}</p>
      <p className="text-gray-700 mb-1"><strong>Total Fare:</strong> ₹{ride.totalFare}</p>
    </div>
  );
};

export default BookedRideCard;
