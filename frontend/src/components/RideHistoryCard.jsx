

// import React, { useState } from "react";
// import "./rideHistoryCard.css";

// const RideHistoryCard = ({ ride, currentUserId, onRatingSubmit }) => {
//   const {
//     _id: rideId,
//     pickupLocation,
//     dropLocation,
//     date,
//     time,
//     status,
//     vehicleDetails,
//     bookedUsers,
//     driver
//   } = ride;

//   const [ratingInputs, setRatingInputs] = useState({});
//   const [commentInputs, setCommentInputs] = useState({});
//   const [activeRatingPanel, setActiveRatingPanel] = useState(null);

//   const formattedDate = new Date(date).toLocaleDateString();

//   const handleRatingChange = (userId, score) => {
//     setRatingInputs(prev => ({ ...prev, [userId]: score }));
//   };

//   const handleCommentChange = (userId, comment) => {
//     setCommentInputs(prev => ({ ...prev, [userId]: comment }));
//   };

//   const submitRating = (toUserId) => {
//     const score = ratingInputs[toUserId];
//     const comment = commentInputs[toUserId] || '';
//     if (score) {
//       onRatingSubmit(rideId, toUserId, score, comment);
//       setActiveRatingPanel(null);
//     } else {
//       alert("Please select a rating");
//     }
//   };

//   const toggleRatingPanel = (userId) => {
//     setActiveRatingPanel(activeRatingPanel === userId ? null : userId);
//   };

//   // Filter out current user from people to rate
//   const usersToRate = [
//     ...(driver?._id !== currentUserId ? [driver] : []),
//     ...bookedUsers.filter(user => user._id !== currentUserId)
//   ];

//   return (
//     <div className="ride-history-card">
//       <div className="ride-info">
//         <h3>{pickupLocation} ➝ {dropLocation}</h3>
//         <p><strong>Date:</strong> {formattedDate}</p>
//         <p><strong>Time:</strong> {time}</p>
//         <p><strong>Status:</strong> <span className={status === "completed" ? "status-completed" : "status-cancelled"}>{status}</span></p>
//         <p><strong>Vehicle:</strong> {vehicleDetails.model} ({vehicleDetails.number})</p>
//       </div>

//       {status === "completed" && usersToRate.length > 0 && (
//         <div className="rating-section">
//           <h3>Rate Your Experience</h3>
          
//           {usersToRate.map(user => (
//             <div key={user._id} className="rate-user">
//               <button 
//                 className="toggle-rating-btn"
//                 onClick={() => toggleRatingPanel(user._id)}
//               >
//                 Rate {user.username} ({user._id === driver?._id ? "Driver" : "Passenger"})
//               </button>
//               {activeRatingPanel === user._id && (
//                 <div className="rating-panel">
//                   <div className="stars">
//                     {[1, 2, 3, 4, 5].map(star => (
//                       <span 
//                         key={star}
//                         className={`star ${ratingInputs[user._id] >= star ? 'active' : ''}`}
//                         onClick={() => handleRatingChange(user._id, star)}
//                       >
//                         ★
//                       </span>
//                     ))}
//                   </div>
//                   <textarea
//                     placeholder="Add a comment (optional)"
//                     value={commentInputs[user._id] || ''}
//                     onChange={(e) => handleCommentChange(user._id, e.target.value)}
//                   />
//                   <button 
//                     className="submit-rating-btn"
//                     onClick={() => submitRating(user._id)}
//                   >
//                     Submit Rating
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="booked-users">
//         <h4>Booked Users</h4>
//         {bookedUsers.length > 0 ? (
//           bookedUsers.map((user, idx) => (
//             <p key={idx}>{user.username} ({user.email}) — {user.seatsBooked} seat(s)</p>
//           ))
//         ) : (
//           <p>No passengers booked</p>
//         )}
//       </div>

//       <div className="driver-info">
//         <h4>Driver Info</h4>
//         <p>{driver?.username} ({driver?.email})</p>
//       </div>
//     </div>
//   );
// };

// export default RideHistoryCard;

import React, { useState } from "react";
import "./rideHistoryCard.css";

const RideHistoryCard = ({ ride, currentUserId, onRatingSubmit, errorMessage }) => {
  const {
    _id: rideId,
    pickupLocation,
    dropLocation,
    date,
    time,
    status,
    vehicleDetails,
    bookedUsers,
    driver
  } = ride;

  const [ratingInputs, setRatingInputs] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [activeRatingPanel, setActiveRatingPanel] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");


  const formattedDate = new Date(date).toLocaleDateString();

  const handleRatingChange = (userId, score) => {
    setRatingInputs(prev => ({ ...prev, [userId]: score }));
  };

  const handleCommentChange = (userId, comment) => {
    setCommentInputs(prev => ({ ...prev, [userId]: comment }));
  };

  const submitRating = async (toUserId) => {
  const score = ratingInputs[toUserId];
  const comment = commentInputs[toUserId] || '';
  
  if (!score) {
    alert("Please select a rating");
    return;
  }

  const result = await onRatingSubmit(rideId, toUserId, score, comment);
  
  if (result?.success) {
    setSuccessMessage(result.message); // ✅ show success message
    setTimeout(() => setSuccessMessage(""), 3000); // optional: clear after 3 sec
    setActiveRatingPanel(null); // close the panel
  } else {
    alert(result?.message || "Failed to submit rating");
  }
};


  const toggleRatingPanel = (userId) => {
    setActiveRatingPanel(activeRatingPanel === userId ? null : userId);
  };

  // Filter out current user from people to rate
  const usersToRate = [
    ...(driver?._id !== currentUserId ? [driver] : []),
    ...bookedUsers.filter(user => user._id !== currentUserId)
  ];

  return (
    <div className="ride-card">
      <div className="ride-header">
        <h3>{pickupLocation} ➝ {dropLocation}</h3>
        <div className="ride-meta">
          <span>{formattedDate} • {time}</span>
          <span className={`status-badge ${status === "completed" ? "completed" : "cancelled"}`}>
            {status}
          </span>
        </div>
      </div>

      <div className="ride-details">
        <p><strong>Vehicle:</strong> {vehicleDetails.model} ({vehicleDetails.number})</p>
        
        {status === "completed" && usersToRate.length > 0 && (
          <div className="rating-section">
            <h4>Rate Your Experience</h4>
            
            {usersToRate.map(user => (
              <div key={user._id} className="rate-user">
                <button 
                  className="toggle-rating-btn"
                  onClick={() => toggleRatingPanel(user._id)}
                >
                  Rate {user.username} ({user._id === driver?._id ? "Driver" : "Passenger"})
                </button>
                {activeRatingPanel === user._id && (
                  <div className="rating-panel">
                    <div className="stars">
                      {[1, 2, 3, 4, 5].map(star => (
                        <span 
                          key={star}
                          className={`star ${ratingInputs[user._id] >= star ? 'active' : ''}`}
                          onClick={() => handleRatingChange(user._id, star)}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <textarea
                      placeholder="Add a comment (optional)"
                      value={commentInputs[user._id] || ''}
                      onChange={(e) => handleCommentChange(user._id, e.target.value)}
                    />
                    <button 
                      className="submit-rating-btn"
                      onClick={() => submitRating(user._id)}
                    >
                      Submit Rating
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        {successMessage && (
  <div className="success-message">
    {successMessage}
  </div>
)}

        <div className="passengers-section">
          <h3>Passengers</h3>
          {bookedUsers.length > 0 ? (
            <ul>
              {bookedUsers.map((user, idx) => (
                <li key={idx}>
                  {user.username} ({user.email}) — {user.seatsBooked} seat(s)
                </li>
              ))}
            </ul>
          ) : (
            <p>No passengers booked</p>
          )}
        </div>

        <div className="driver-section">
          <h4>Driver</h4>
          <p>{driver?.username} ({driver?.email})</p>
        </div>
      </div>
    </div>
  );
};

export default RideHistoryCard;