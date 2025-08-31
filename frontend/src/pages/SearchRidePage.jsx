// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import RideCard from '../components/RideCard/RideCard';
// import './SearchRidePage.css'; // Import the manual CSS file

// const SearchRidePage = () => {
//   const [pickupLocation, setPickupLocation] = useState('');
//   const [dropLocation, setDropLocation] = useState('');
//   const [date, setDate] = useState('');
//   const [rides, setRides] = useState([]);
//   const [sentRequests, setSentRequests] = useState([]);
//   const [error, setError] = useState('');

//   const fetchSentRequests = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get('/api/requests/sent', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setSentRequests(res.data);
//     } catch (err) {
//       console.error('Failed to fetch sent requests', err);
//     }
//   };

//   const handleSearch = async () => {
//     if (!pickupLocation && !dropLocation && !date) {
//       setError('Please enter at least one field to search.');
//       return;
//     }

//     setError('');
//     try {
//       const token = localStorage.getItem('token');
//       const query = new URLSearchParams();
//       if (pickupLocation) query.append('pickupLocation', pickupLocation);
//       if (dropLocation) query.append('dropLocation', dropLocation);
//       if (date) query.append('date', date);

//       const res = await axios.get(`/api/rides/search?${query.toString()}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       setRides(res.data);
//       fetchSentRequests();
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch rides. Please try again.');
//     }
//   };

//   return (
//     <div className="container">
//       <h1 className="title">Search Rides</h1>

//       <div className="search-box">
//         <div className="input-grid">
//           <input
//             type="text"
//             placeholder="Pickup Location"
//             value={pickupLocation}
//             onChange={(e) => setPickupLocation(e.target.value)}
//             className="input-field"
//           />
//           <input
//             type="text"
//             placeholder="Drop Location"
//             value={dropLocation}
//             onChange={(e) => setDropLocation(e.target.value)}
//             className="input-field"
//           />
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="input-field"
//           />
//         </div>
//         <button
//           onClick={handleSearch}
//           className="search-button"
//         >
//           Search
//         </button>
//         {error && <p className="error-message">{error}</p>}
//       </div>

//       {rides.length > 0 ? (
//         rides.map((ride) => (
//           <RideCard
//             key={ride._id}
//             ride={ride}
//             sentRequests={sentRequests}
//             refreshRequests={fetchSentRequests}
//           />
//         ))
//       ) : (
//         <p className="no-rides-message">No rides found. Try a different search.</p>
//       )}
//     </div>
//   );
// };

// export default SearchRidePage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RideCard from '../components/RideCard/RideCard';
import { motion } from 'framer-motion';
import { Search, LocationOn, CalendarToday } from '@mui/icons-material';
import './SearchRidePage.css';

const SearchRidePage = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [date, setDate] = useState('');
  const [rides, setRides] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const query = new URLSearchParams();
      if (pickupLocation) query.append('pickupLocation', pickupLocation);
      if (dropLocation) query.append('dropLocation', dropLocation);
      if (date) query.append('date', date);

      const res = await axios.get(`/api/rides/search?${query.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      
      setRides(res.data.reverse());
      // rides.reverse();
      fetchSentRequests();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to fetch rides. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-ride-container">
      <motion.h1 
        className="search-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Search Available Rides
      </motion.h1>

      <motion.div 
        className="search-box"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <div className="input-container">
          <div className="input-group">
            <LocationOn className="input-icon" />
            <input
              type="text"
              placeholder="Pickup Location"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="input-group">
            <LocationOn className="input-icon" />
            <input
              type="text"
              placeholder="Drop Location"
              value={dropLocation}
              onChange={(e) => setDropLocation(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="input-group">
            <CalendarToday className="input-icon" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="search-button"
          disabled={loading}
        >
          <Search className="button-icon" />
          {loading ? 'Searching...' : 'Search Rides'}
        </button>

        {error && (
          <motion.div 
            className="error-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}
      </motion.div>

      <div className="rides-container">
        {rides.length > 0 ? (
          <motion.div
            className="rides-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {rides.map((ride) => (
              <RideCard
                key={ride._id}
                ride={ride}
                sentRequests={sentRequests}
                refreshRequests={fetchSentRequests}
              />
            ))}
          </motion.div>
        ) : (
          <motion.p 
            className="no-rides-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {loading ? 'Searching for rides...' : 'No rides found. Try a different search.'}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default SearchRidePage;