import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RideCard from '../components/RideCard/RideCard';
import './SearchRidePage.css'; // Import the manual CSS file

const SearchRidePage = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [date, setDate] = useState('');
  const [rides, setRides] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [error, setError] = useState('');

  const fetchSentRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/requests/sent', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSentRequests(res.data);
    } catch (err) {
      console.error('Failed to fetch sent requests', err);
    }
  };

  const handleSearch = async () => {
    if (!pickupLocation && !dropLocation && !date) {
      setError('Please enter at least one field to search.');
      return;
    }

    setError('');
    try {
      const token = localStorage.getItem('token');
      const query = new URLSearchParams();
      if (pickupLocation) query.append('pickupLocation', pickupLocation);
      if (dropLocation) query.append('dropLocation', dropLocation);
      if (date) query.append('date', date);

      const res = await axios.get(`/api/rides/search?${query.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setRides(res.data);
      fetchSentRequests();
    } catch (err) {
      console.error(err);
      setError('Failed to fetch rides. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Search Rides</h1>

      <div className="search-box">
        <div className="input-grid">
          <input
            type="text"
            placeholder="Pickup Location"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Drop Location"
            value={dropLocation}
            onChange={(e) => setDropLocation(e.target.value)}
            className="input-field"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-field"
          />
        </div>
        <button
          onClick={handleSearch}
          className="search-button"
        >
          Search
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>

      {rides.length > 0 ? (
        rides.map((ride) => (
          <RideCard
            key={ride._id}
            ride={ride}
            sentRequests={sentRequests}
            refreshRequests={fetchSentRequests}
          />
        ))
      ) : (
        <p className="no-rides-message">No rides found. Try a different search.</p>
      )}
    </div>
  );
};

export default SearchRidePage;
