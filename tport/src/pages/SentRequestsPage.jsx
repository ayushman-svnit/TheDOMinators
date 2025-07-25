
import "./SentRequestsPage.css";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SentRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSentRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/requests/sent', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load sent requests. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSentRequests();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'accepted':
        return 'status-accepted';
      case 'rejected':
        return 'status-rejected';
      default:
        return '';
    }
  };

  return (
    <div className="sent-requests-container">
      <h1>Sent Requests</h1>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
  <div className="loading-message">Loading requests...</div>
) : requests.length > 0 ? (
  <div className="request-grid">
    {requests.map((req) => (
      <div key={req._id} className="request-card">
        <div className="request-header">
          <h3>
            {req.ride.pickupLocation} ➝ {req.ride.dropLocation}
          </h3>
          <span className="request-date">
            {new Date(req.ride.date).toLocaleDateString()} • {req.ride.time}
          </span>
        </div>

        <div className="request-details">
          <p>
            <strong>Driver:</strong> {req.toUser?.username || 'Unknown'}
          </p>
          
          <p>
            <strong>Seats Requested:</strong> {req.seatsRequested}
          </p>
          <p>
            <strong>Status:</strong>{' '}
            <span className={getStatusClass(req.status)}>
              {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
            </span>
          </p>
        </div>
      </div>
    ))}
  </div>
) : (
  <div className="empty-message">No requests sent yet.</div>
)}

    </div>
  );
};

export default SentRequestsPage;
