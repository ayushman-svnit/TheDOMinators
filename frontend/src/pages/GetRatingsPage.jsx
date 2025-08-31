import React, { useEffect, useState } from "react";
import axios from "axios";
import RatingCard from "../components/RatingCard";
import { useNavigate } from "react-router-dom";
import "./GetRatingsPage.css";

const GetRatingsPage = () => {
  const [ratingsData, setRatingsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const carpoolUserRes = await axios.get(
          "/api/carpool/me",
          { withCredentials: true }
        );
        const carpoolUserId = carpoolUserRes.data._id;

        const ratingsRes = await axios.get(
          `/api/ratings/${carpoolUserId}`,
          { withCredentials: true }
        );
        
        setRatingsData(ratingsRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="ratings-page loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!ratingsData) {
    return (
      <div className="ratings-page error">
        <div className="error-message">Error loading ratings</div>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="ratings-page">
      <div className="ratings-header">
        <h2>Your Ratings</h2>
        <div className="rating-summary">
          <div className="average-rating">
            <span className="label">Average Rating:</span>
            <div className="score-display">
              <span className="average-score">
                {ratingsData.averageRating.toFixed(1)}
              </span>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star} 
                    className={`star ${star <= Math.round(ratingsData.averageRating) ? 'filled' : ''}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="total-ratings">
            <span className="count">{ratingsData.ratings.length}</span>
            <span className="label">Total Ratings</span>
          </div>
        </div>
      </div>

      <div className="ratings-list">
        {ratingsData.ratings.length > 0 ? (
          ratingsData.ratings.map((rating, index) => (
            <RatingCard key={index} rating={rating} />
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-content">
              <h3>No Ratings Yet</h3>
              <p>Your ratings will appear here after rides</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetRatingsPage;