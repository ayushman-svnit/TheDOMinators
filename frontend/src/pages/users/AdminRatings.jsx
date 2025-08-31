// // AdminRatings.jsx
// import React,{useEffect,useState} from 'react';
// import { Box, Typography, Card, CardContent, Avatar, Tooltip, Divider, Chip, Grid } from '@mui/material';
// import './AdminRatings.css'; // External CSS import
// import axios from "axios";

// const AdminRatings = () => {
//   // Sample data (replace with your actual data fetching logic)
//   const [ratings, setRatings] = useState([]);
//   useEffect(() => {
//     const fetchRatings = async () => {
//       try {
//         const response = await axios.get('/api/admin/ratings');
//         setRatings(response.data); 
//       } catch (err) {
//         console.error('Failed to fetch ratings:', err);
//       }
//     };

//     fetchRatings();
//   }, []);

//   // Function to format timestamp
//   const formatDate = (timestamp) => {
//     const date = new Date(timestamp);
//     return date.toLocaleString();
//   };

//   // Function to render star rating
//   const renderStars = (score) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <span 
//           key={i} 
//           className={`adminratings-star ${i <= score ? 'adminratings-star-filled' : 'adminratings-star-empty'}`}
//         >
//           {i <= score ? '★' : '☆'}
//         </span>
//       );
//     }
//     return stars;
//   };

//   return (
//     <Box className="adminratings-container">
//       <Typography variant="h4" className="adminratings-title" gutterBottom>
//         Ratings Dashboard
//       </Typography>
      
//       <Grid container spacing={3} className="adminratings-grid">
//         {ratings.map((rating) => (
//           <Grid item xs={12} sm={6} md={4} key={rating._id}>
//             <Card className="adminratings-card">
//               <CardContent>
//                 <Box className="adminratings-card-header">
//                   <Box className="adminratings-rating-info">
//                     <Typography variant="h6" className="adminratings-score">
//                       {renderStars(rating.score)}
//                     </Typography>
//                     {rating.comment && (
//                       <Typography variant="body1" className="adminratings-comment">
//                         "{rating.comment}"
//                       </Typography>
//                     )}
//                   </Box>
//                   <Chip 
//                     label={`Ride: ${rating.ride.pickupLocation} → ${rating.ride.dropLocation}`} 
//                     className="adminratings-ride-chip"
//                   />
//                 </Box>
                
//                 <Divider className="adminratings-divider" />
                
//                 <Box className="adminratings-users-container">
//                   <Tooltip 
//                     title={
//                       <Box className="adminratings-tooltip-content">
//                         <Typography>Username: {rating.fromUser.username}</Typography>
//                         <Typography>Email: {rating.fromUser.email}</Typography>
//                       </Box>
//                     } 
//                     arrow
//                   >
//                     <Box className="adminratings-user adminratings-from-user">
//                       <Avatar className="adminratings-avatar">
//                         {rating.fromUser.username.charAt(0).toUpperCase()}
//                       </Avatar>
//                       <Typography variant="body2" className="adminratings-username">
//                         From: {rating.fromUser.username}
//                       </Typography>
//                     </Box>
//                   </Tooltip>
                  
//                   <Tooltip 
//                     title={
//                       <Box className="adminratings-tooltip-content">
//                         <Typography>Username: {rating.toUser.username}</Typography>
//                         <Typography>Email: {rating.toUser.email}</Typography>
//                       </Box>
//                     } 
//                     arrow
//                   >
//                     <Box className="adminratings-user adminratings-to-user">
//                       <Avatar className="adminratings-avatar">
//                         {rating.toUser.username.charAt(0).toUpperCase()}
//                       </Avatar>
//                       <Typography variant="body2" className="adminratings-username">
//                         To: {rating.toUser.username}
//                       </Typography>
//                     </Box>
//                   </Tooltip>
//                 </Box>
                
//                 <Typography variant="caption" className="adminratings-timestamp">
//                   {formatDate(rating.timestamp)}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default AdminRatings;

// AdminRatings.jsx
import React,{useEffect,useState} from 'react';
import { Box, Typography, Card, CardContent, Avatar, Tooltip, Divider, Chip, Grid } from '@mui/material';
import './AdminRatings.css'; // External CSS import
import axios from "axios";

const AdminRatings = () => {
  // Sample data (replace with your actual data fetching logic)
  const [ratings, setRatings] = useState([]);
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get('/api/admin/ratings');
        setRatings(response.data); 
      } catch (err) {
        console.error('Failed to fetch ratings:', err);
      }
    };

    fetchRatings();
  }, []);

  // Function to format timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Function to render star rating
  const renderStars = (score) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i} 
          className={`adminratings-star ${i <= score ? 'adminratings-star-filled' : 'adminratings-star-empty'}`}
        >
          {i <= score ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  };

  return (
    <Box className="adminratings-container">
      <Typography variant="h4" className="adminratings-title" gutterBottom>
        Ratings Dashboard
      </Typography>
      
      <Grid container spacing={3} className="adminratings-grid">
        {ratings.map((rating) => (
          <Grid item xs={12} sm={6} md={4} key={rating._id}>
            <Card className="adminratings-card">
              <CardContent>
                <Box className="adminratings-card-header">
                  <Box className="adminratings-rating-info">
                    <Typography variant="h6" className="adminratings-score">
                      {renderStars(rating.score)}
                    </Typography>
                    {rating.comment && (
                      <Typography variant="body1" className="adminratings-comment">
                        "{rating.comment}"
                      </Typography>
                    )}
                  </Box>
                  <Chip 
                    label={`Ride: ${rating.ride.pickupLocation} → ${rating.ride.dropLocation}`} 
                    className="adminratings-ride-chip"
                  />
                </Box>
                
                <Divider className="adminratings-divider" />
                
                <Box className="adminratings-users-container">
                  <Tooltip 
                    title={
                      <Box className="adminratings-tooltip-content">
                        <Typography>Username: {rating.fromUser.username}</Typography>
                        <Typography>Email: {rating.fromUser.email}</Typography>
                      </Box>
                    } 
                    arrow
                  >
                    <Box className="adminratings-user adminratings-from-user">
                      <Avatar className="adminratings-avatar">
                        {rating.fromUser.username?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="body2" className="adminratings-username">
                        From: {rating.fromUser.username}
                      </Typography>
                    </Box>
                  </Tooltip>
                  
                  <Tooltip 
                    title={
                      <Box className="adminratings-tooltip-content">
                        <Typography>Username: {rating.toUser.username}</Typography>
                        <Typography>Email: {rating.toUser.email}</Typography>
                      </Box>
                    } 
                    arrow
                  >
                    <Box className="adminratings-user adminratings-to-user">
                      <Avatar className="adminratings-avatar">
  {rating.toUser.username?.charAt(0).toUpperCase()}
</Avatar>
                      <Typography variant="body2" className="adminratings-username">
                        To: {rating.toUser.username}
                      </Typography>
                    </Box>
                  </Tooltip>
                </Box>
                
                <Typography variant="caption" className="adminratings-timestamp">
                  {formatDate(rating.timestamp)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminRatings;