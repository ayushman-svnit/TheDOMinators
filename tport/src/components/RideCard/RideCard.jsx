// import React, { useState } from 'react';
// import axios from 'axios';

// const RideCard = ({ ride, sentRequests = [], refreshRequests }) => {
//   const [seatsRequested, setSeatsRequested] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const alreadyRequested = sentRequests.some(req => req.ride._id === ride._id);
//   const isRideAvailable = ride.status === 'upcoming';

//   const handleSendRequest = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');
//       await axios.post(
//         '/api/requests/send',
//         {
//           rideId: ride._id,
//           seatsRequested: Number(seatsRequested),
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setMessage('Request sent!');
//       refreshRequests(); // re-fetch latest sent requests
//     } catch (err) {
//       console.error(err);
//       setMessage('Failed to send request');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 mb-4 border">
//       <div className="flex justify-between items-center mb-2">
//         <h3 className="text-xl font-bold text-blue-700">{ride.pickupLocation} ➝ {ride.dropLocation}</h3>
//         <span className="text-sm text-gray-600">
//           {new Date(ride.date).toDateString()} | {ride.time}
//         </span>
//       </div>

//       <div className="mb-2">
//         <p><strong>Driver:</strong> {ride.driver.username}</p>
//         <p><strong>Rating:</strong> ⭐ {ride.driver.averageRating}/5</p>
//         <p><strong>Vehicle:</strong> {ride.vehicleDetails.model} - {ride.vehicleDetails.number}</p>
//       </div>

//       <div className="mb-2 flex flex-wrap gap-4">
//         <p><strong>Seats Available:</strong> {ride.availableSeats}</p>
//         <p><strong>Price/Seat:</strong> ₹{ride.pricePerSeat}</p>
//         <p><strong>Status:</strong> {ride.status}</p>
//       </div>

//       {ride.driver.feedbacks?.length > 0 && (
//         <div className="mt-3">
//           <p className="font-semibold">Feedbacks:</p>
//           <ul className="list-disc ml-6 text-gray-700">
//             {ride.driver.feedbacks.map((fb, i) => (
//               <li key={i}><strong>⭐{fb.score}</strong>: {fb.comment}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {isRideAvailable ? (
//         alreadyRequested ? (
//           <p className="mt-4 text-green-600 font-semibold">Request already sent ✅</p>
//         ) : (
//           <div className="mt-4 flex gap-4 items-center">
//             <input
//               type="number"
//               min="1"
//               max={ride.availableSeats}
//               value={seatsRequested}
//               onChange={(e) => setSeatsRequested(e.target.value)}
//               className="p-2 border rounded w-20"
//             />
//             <button
//               onClick={handleSendRequest}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//               disabled={loading}
//             >
//               {loading ? 'Sending...' : 'Send Join Request'}
//             </button>
//             {message && <p className="text-sm text-gray-700">{message}</p>}
//           </div>
//         )
//       ) : (
//         <p className="mt-4 text-red-500">This ride is {ride.status}. Join request not allowed.</p>
//       )}
//     </div>
//   );
// };

// export default RideCard;

import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  DirectionsCar,
  Person,
  Star,
  Event,
  Schedule,
  People,
  AttachMoney,
  CheckCircle,
  Error
} from '@mui/icons-material';
import "./RideCard.css";

const RideCard = ({ ride, sentRequests = [], refreshRequests }) => {
  const [seatsRequested, setSeatsRequested] = useState(1);
  const [loading, setLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const alreadyRequested = sentRequests.some(req => req.ride._id === ride._id);
  const isRideAvailable = ride.status === 'upcoming';

  const handleSendRequest = async () => {
    try {
      setLoading(true);
      setRequestStatus(null);
      setErrorMessage('');
      
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
      
      setRequestStatus('success');
      refreshRequests();
    } catch (err) {
      console.error(err);
      setRequestStatus('error');
      setErrorMessage(err.response?.data?.message || 'Failed to send request');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="star-icon full-star" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="star-icon half-star" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="star-icon empty-star" />);
    }
    
    return stars;
  };

  return (
    <motion.div
      className="ride-card"
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

      <div className="driver-info">
        <div className="driver-rating">
          <Person className="driver-icon" />
          <span>{ride.driver.username}</span>
          <div className="rating-stars">
            {renderStars(ride.driver.averageRating)}
            <span>({ride.driver.feedbacks?.length || 0})</span>
          </div>
        </div>
        
        <div className="vehicle-info">
          <DirectionsCar className="vehicle-icon" />
          <span>{ride.vehicleDetails.model} ({ride.vehicleDetails.number})</span>
        </div>
      </div>

      <div className="ride-details">
        <div className="detail-item">
          <People className="detail-icon" />
          <span>{ride.availableSeats} seats available</span>
        </div>
        <div className="detail-item">
          <AttachMoney className="detail-icon" />
          <span>₹{ride.pricePerSeat} per seat</span>
        </div>
        <div className="detail-item">
          <span className={`status-badge ${ride.status}`}>{ride.status}</span>
        </div>
      </div>

      {ride.driver.feedbacks?.length > 0 && (
        <div className="feedbacks-section">
          <h4>Recent Feedbacks:</h4>
          <div className="feedbacks-container">
            {ride.driver.feedbacks.slice(0, 3).map((fb, i) => (
              <div key={i} className="feedback-item">
                <div className="feedback-rating">
                  {renderStars(fb.score)}
                  <span>{fb.score.toFixed(1)}</span>
                </div>
                <p className="feedback-comment">"{fb.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isRideAvailable ? (
        alreadyRequested ? (
          <div className="request-status success">
            <CheckCircle className="status-icon" />
            <span>Request already sent</span>
          </div>
        ) : (
          <div className="request-section">
            <div className="seats-selector">
              <label>Seats:</label>
              <input
                type="number"
                min="1"
                max={ride.availableSeats}
                value={seatsRequested}
                onChange={(e) => setSeatsRequested(e.target.value)}
              />
            </div>
            
            <button
              onClick={handleSendRequest}
              className="request-button"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Join Request'}
            </button>

            {requestStatus === 'success' && (
              <motion.div 
                className="request-status success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <CheckCircle className="status-icon" />
                <span>Request sent successfully!</span>
              </motion.div>
            )}

            {requestStatus === 'error' && (
              <motion.div 
                className="request-status error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Error className="status-icon" />
                <span>{errorMessage}</span>
              </motion.div>
            )}
          </div>
        )
      ) : (
        <div className="request-status error">
          <Error className="status-icon" />
          <span>This ride is {ride.status}. Join request not allowed.</span>
        </div>
      )}
    </motion.div>
  );
};

export default RideCard;
