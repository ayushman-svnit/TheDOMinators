import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AnnouncementsPage.css';

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('/api/announcements',{withCredentials:true});
        setAnnouncements(response.data.reverse());
      } catch (err) {
        console.error('Error fetching announcements:', err);
        setError('Failed to load announcements');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="announcements-page loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="announcements-page error">
        <div className="error-message">{error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="retry-btn"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="announcements-page">
      <h1>Announcements</h1>
      
      {announcements.length === 0 ? (
        <div className="empty-state">
          <p>No announcements available at this time</p>
        </div>
      ) : (
        <div className="announcements-grid">
          {announcements.map(announcement => (
            <div key={announcement._id} className="announcement-card">
              <div className="card-header">
                <h3>{announcement.title}</h3>
                
              </div>
              <div className="card-content">
                <p>{announcement.content}</p>
              </div>
              <span className="timestamp">
                  {formatDate(announcement.createdAt)}
                </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnnouncementsPage;