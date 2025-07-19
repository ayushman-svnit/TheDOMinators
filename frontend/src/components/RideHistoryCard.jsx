import React from "react";
import "./rideHistoryCard.css";

const RideHistoryCard = ({ ride }) => {
  const {
    pickupLocation,
    dropLocation,
    date,
    time,
    status,
    vehicleDetails,
    bookedUsers,
    driver
  } = ride;

  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <div className="ride-history-card">
      <div className="ride-info">
        <h3>{pickupLocation} ➝ {dropLocation}</h3>
        <p><strong>Date:</strong> {formattedDate}</p>
        <p><strong>Time:</strong> {time}</p>
        <p><strong>Status:</strong> <span className={status === "completed" ? "status-completed" : "status-cancelled"}>{status}</span></p>
        <p><strong>Vehicle:</strong> {vehicleDetails.model} ({vehicleDetails.number})</p>
      </div>

      
        <div className="booked-users">
          <h4>Booked Users</h4>
          {bookedUsers.map((user, idx) => (
            <p key={idx}>{user.username} ({user.email}) — {user.seatsBooked} seat(s)</p>
          ))}
        </div>
      
        <div className="driver-info">
          <h4>Driver Info</h4>
          <p>{driver?.username} ({driver?.email})</p>
        </div>
      
    </div>
  );
};

export default RideHistoryCard;
