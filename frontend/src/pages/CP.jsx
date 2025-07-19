import React from 'react';
import { useNavigate } from 'react-router-dom';

const CarpoolHomePage = () => {
  const navigate = useNavigate();

  const handlePostRideClick = () => {
    navigate('/post-ride');
  };

  const handleSearchRideClick = () => {
    navigate('/search-ride');
  };

  const handleViewPostedRidesClick = () => {
    navigate('/posted-rides');
  };

  const handleViewHistoryRidesClick = () => {
    navigate('/ride-history');
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 space-y-10">
      
      {/* Post a Ride Box */}
      <div className="p-6 bg-purple-100 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Post a Ride</h2>
        <p className="text-gray-700 mb-6">
          Have empty seats on your commute? Help others by offering a ride and save fuel costs!
          Easily post a ride with your pickup location, vehicle details, and available seats.
        </p>
        <button
          onClick={handlePostRideClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
        >
          Post a Ride
        </button>
      </div>

      {/* Search a Ride Box */}
      <div className="p-6 bg-green-100 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Search for a Ride</h2>
        <p className="text-gray-700 mb-6">
          Need a lift? Enter your pickup and drop location to find available rides posted by others. 
          Save money and travel comfortably!
        </p>
        <button
          onClick={handleSearchRideClick}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded transition"
        >
          Search Ride
        </button>
      </div>
      {/* View Posted Rides */}
      <div className="p-6 bg-green-100 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Posted Rides</h2>
        <p className="text-gray-700 mb-6">
          View all the rides you have posted. Track bookings, manage your rides, and update statuses.
        </p>
        <button
          onClick={handleViewPostedRidesClick}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded transition"
        >
          View Posted Rides
        </button>
      </div>
      {/* Ride History Box */}
<div className="p-6 bg-yellow-100 rounded-xl shadow-md">
  <h2 className="text-2xl font-bold mb-4 text-gray-800">Ride History</h2>
  <p className="text-gray-700 mb-6">
    View your completed and cancelled rides — both those you posted and those you booked. Keep a record of your travel activity.
  </p>
  <button
    onClick={handleViewHistoryRidesClick}
    className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-2 rounded transition"
  >
    View Ride History
  </button>
</div>


{/* Booked Rides Box */}
<div className="p-6 bg-blue-100 rounded-xl shadow-md">
  <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Booked Rides</h2>
  <p className="text-gray-700 mb-6">
    View all the rides you've booked. Check driver details, timing, and fare breakdown for your upcoming or past bookings.
  </p>
  <button
    onClick={() => navigate('/booked-rides')}
    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
  >
    View Booked Rides
  </button>
</div>


    </div>
  );
};

export default CarpoolHomePage;
