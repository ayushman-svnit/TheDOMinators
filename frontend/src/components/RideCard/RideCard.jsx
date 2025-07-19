import React, { useState } from 'react';
import axios from 'axios';

const RideCard = ({ ride, sentRequests = [], refreshRequests }) => {
  const [seatsRequested, setSeatsRequested] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const alreadyRequested = sentRequests.some(req => req.ride._id === ride._id);
  const isRideAvailable = ride.status === 'upcoming';

  const handleSendRequest = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/requests/send',
        {
          rideId: ride._id,
          seatsRequested: Number(seatsRequested),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage('Request sent!');
      refreshRequests(); // re-fetch latest sent requests
    } catch (err) {
      console.error(err);
      setMessage('Failed to send request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-4 border">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold text-blue-700">{ride.pickupLocation} ➝ {ride.dropLocation}</h3>
        <span className="text-sm text-gray-600">
          {new Date(ride.date).toDateString()} | {ride.time}
        </span>
      </div>

      <div className="mb-2">
        <p><strong>Driver:</strong> {ride.driver.username}</p>
        <p><strong>Rating:</strong> ⭐ {ride.driver.averageRating}/5</p>
        <p><strong>Vehicle:</strong> {ride.vehicleDetails.model} - {ride.vehicleDetails.number}</p>
      </div>

      <div className="mb-2 flex flex-wrap gap-4">
        <p><strong>Seats Available:</strong> {ride.availableSeats}</p>
        <p><strong>Price/Seat:</strong> ₹{ride.pricePerSeat}</p>
        <p><strong>Status:</strong> {ride.status}</p>
      </div>

      {ride.driver.feedbacks?.length > 0 && (
        <div className="mt-3">
          <p className="font-semibold">Feedbacks:</p>
          <ul className="list-disc ml-6 text-gray-700">
            {ride.driver.feedbacks.map((fb, i) => (
              <li key={i}><strong>⭐{fb.score}</strong>: {fb.comment}</li>
            ))}
          </ul>
        </div>
      )}

      {isRideAvailable ? (
        alreadyRequested ? (
          <p className="mt-4 text-green-600 font-semibold">Request already sent ✅</p>
        ) : (
          <div className="mt-4 flex gap-4 items-center">
            <input
              type="number"
              min="1"
              max={ride.availableSeats}
              value={seatsRequested}
              onChange={(e) => setSeatsRequested(e.target.value)}
              className="p-2 border rounded w-20"
            />
            <button
              onClick={handleSendRequest}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Join Request'}
            </button>
            {message && <p className="text-sm text-gray-700">{message}</p>}
          </div>
        )
      ) : (
        <p className="mt-4 text-red-500">This ride is {ride.status}. Join request not allowed.</p>
      )}
    </div>
  );
};

export default RideCard;
