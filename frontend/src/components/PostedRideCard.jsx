import React from "react";
import axios from "axios";

const PostedRideCard = ({ ride, token, onStatusUpdate }) => {
  const formattedDate = new Date(ride.date).toLocaleDateString();

  const handleStatusChange = async (newStatus) => {
    try {
      const res = await axios.post(
        "/api/rides/update",
        { rideId: ride._id, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.message);
      onStatusUpdate(); // refetch rides after update
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-4">
      <h3 className="text-xl font-semibold text-indigo-600 mb-2">
        {ride.pickupLocation} ➝ {ride.dropLocation}
      </h3>

      <p className="text-gray-700 mb-1"><strong>Date:</strong> {formattedDate}</p>
      <p className="text-gray-700 mb-1"><strong>Time:</strong> {ride.time}</p>
      <p className="text-gray-700 mb-1"><strong>Status:</strong> <span className="font-semibold">{ride.status}</span></p>
      <p className="text-gray-700 mb-1"><strong>Price per Seat:</strong> ₹{ride.pricePerSeat}</p>
      <p className="text-gray-700 mb-1"><strong>Available Seats:</strong> {ride.availableSeats}</p>

      <p className="text-gray-700 mb-1">
        <strong>Vehicle:</strong> {ride.vehicleDetails?.model} ({ride.vehicleDetails?.number})
      </p>

      {ride.bookedUsers && ride.bookedUsers.length > 0 ? (
        <div className="mt-4">
          <p className="font-semibold text-gray-800 mb-2">Booked Users:</p>
          <ul className="list-disc list-inside text-gray-700">
            {ride.bookedUsers.map((user, index) => (
              <li key={index}>
                {user.username} ({user.email}) – Seats Booked: {user.seatsBooked}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500 mt-2">No users have booked this ride yet.</p>
      )}

      {ride.status === "upcoming" && (
        <div className="mt-4 space-x-4">
          <button
            onClick={() => handleStatusChange("completed")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Mark as Completed
          </button>
          <button
            onClick={() => handleStatusChange("cancelled")}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Cancel Ride
          </button>
        </div>
      )}
    </div>
  );
};

export default PostedRideCard;
