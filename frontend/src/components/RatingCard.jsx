import React from "react";
import "./RatingCard.css";

const RatingCard = ({ rating }) => {
  const formattedDate = new Date(rating.ride.date).toLocaleDateString();

  return (
    <div className="rating-card">
      <div className="rating-header">
        <div className="user-info">
          <span className="username">{rating.fromUser.username}</span>
          <span className="email">{rating.fromUser.email}</span>
        </div>
        <div className="rating-score">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`star ${i < rating.score ? 'filled' : ''}`}>
              ★
            </span>
          ))}
        </div>
      </div>
      
      <div className="ride-info">
        <p>
          <strong>Ride:</strong> {rating.ride.pickupLocation} → {rating.ride.dropLocation}
        </p>
        <p><strong>Date:</strong> {formattedDate}</p>
      </div>
      
      {rating.comment && (
        <div className="comment">
          <p>"{rating.comment}"</p>
        </div>
      )}
    </div>
  );
};

export default RatingCard;