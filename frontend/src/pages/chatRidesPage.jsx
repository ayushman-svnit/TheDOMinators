import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ChatRidesPage.css';

const ChatRidesPage = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ridesResponse, userResponse] = await Promise.all([
          axios.get('/api/rides/chatrides', { withCredentials: true }),
          axios.get('/api/carpool/me', { withCredentials: true })
        ]);
        setRides(ridesResponse.data);
        setCurrentUser(userResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStartChat = async (userId) => {
    try {
      await axios.post(
        '/api/chats/start',
        { userId },
        { withCredentials: true }
      );
      navigate('/chats');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to start chat');
    }
  };

  if (loading) return <div className="loading">Loading rides...</div>;

  return (
    <div className="chat-rides-page">
      <h2>Your Rides - Start a Chat</h2>
      {rides.length === 0 ? (
        <p className="no-rides">No rides found to start chats</p>
      ) : (
        <div className="rides-containero">
          {rides.map(ride => (
            <div key={ride._id} className="ride-cardo">
              <div className="ride-info">
                <h3>{ride.pickupLocation} → {ride.dropLocation}</h3>
                <p><strong>Date:</strong> {new Date(ride.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {ride.time}</p>
                <p><strong>Status:</strong> <span className={`stat-${ride.status}`}>{ride.status}</span></p>
                <p><strong>Vehicle:</strong> {ride.vehicleDetails.model} ({ride.vehicleDetails.number})</p>
              </div>

              <div className="chat-options">
                {/* Driver chat option (if current user is not the driver) */}
                {currentUser && ride.driver._id !== currentUser._id && (
                  <div className="user-option">
                    <p>Driver: {ride.driver.username}</p>
                    <button 
                      onClick={() => handleStartChat(ride.driver._id)}
                      className="start-chat-btn"
                    >
                      Chat with Driver
                    </button>
                  </div>
                )}

                {/* Passenger chat options */}
                {ride.bookedUsers.length > 0 && (
                  <div className="passengers-section">
                    <h4>Passengers:</h4>
                    {ride.bookedUsers.map(user => (
                      currentUser && user._id !== currentUser._id && (
                        <div key={user._id} className="user-option">
                          <p>{user.username} ({user.seatsBooked} seats)</p>
                          <button
                            onClick={() => handleStartChat(user._id)}
                            className="start-chat-btn"
                          >
                            Chat with {user.username}
                          </button>
                        </div>
                      )
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatRidesPage;