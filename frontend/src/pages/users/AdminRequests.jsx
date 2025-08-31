// // AdminRequests.jsx
// import React,{useEffect,useState} from 'react';
// import { Box, Typography, Card, CardContent, Avatar, Tooltip, Divider, Chip, Grid } from '@mui/material';
// import './AdminRequests.css'; // External CSS import
// import axios from "axios";

// const AdminRequests = () => {
//   // Sample data (replace with your actual data fetching logic)
//   const [requests, setRequests] = useState([]);
//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const response = await axios.get('/api/admin/requests');
//         setRequests(response.data); 
//       } catch (err) {
//         console.error('Failed to fetch requests:', err);
//       }
//     };

//     fetchRequests();
//   }, []);

//   // Function to format date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   // Function to get status color
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'accepted':
//         return '#2ea043'; // GitHub success green
//       case 'rejected':
//         return '#f85149'; // GitHub error red
//       default:
//         return '#9ba3b4'; // Muted color
//     }
//   };

//   return (
//     <Box className="adminrequests-container">
//       <Typography variant="h4" className="adminrequests-title" gutterBottom>
//         Ride Requests
//       </Typography>
      
//       <Grid container spacing={3} className="adminrequests-grid">
//         {requests.map((request) => (
//           <Grid item xs={12} sm={6} md={4} key={request._id}>
//             <Card className="adminrequests-card">
//               <CardContent className="adminrequests-card-content">
//                 {/* Status and Seats */}
//                 <Box className="adminrequests-header">
//                   <Chip 
//                     label={request.status.toUpperCase()} 
//                     className="adminrequests-status"
//                     style={{ backgroundColor: getStatusColor(request.status) }}
//                   />
//                 </Box>
//                 <Typography variant="body1" className="adminrequests-seats">
//                 {request.seatsRequested} seat{request.seatsRequested !== 1 ? 's' : ''} requested
//                 </Typography>

//                 {/* Ride Information */}
//                 <Box className="adminrequests-ride-info">
//                   <Typography variant="h6" className="adminrequests-route">
//                     {request.ride.pickupLocation} → {request.ride.dropLocation}
//                   </Typography>
//                   <Typography variant="body2" className="adminrequests-date">
//                     {formatDate(request.ride.date)}
//                   </Typography>
//                   <Typography variant="body2" className="adminrequests-ride-status">
//                     Ride Status: {request.ride.status}
//                   </Typography>
//                   <Typography variant="body2" className="adminrequests-available-seats">
//                     Available: {request.ride.availableSeats} seat{request.ride.availableSeats !== 1 ? 's' : ''}
//                   </Typography>
//                 </Box>

//                 <Divider className="adminrequests-divider" />

//                 {/* Users Information */}
//                 <Box className="adminrequests-users">
//                   <Tooltip 
//                     title={
//                       <Box className="adminrequests-tooltip-content">
//                         <Typography>Username: {request.fromUser.username}</Typography>
//                         <Typography>Email: {request.fromUser.email}</Typography>
//                       </Box>
//                     } 
//                     arrow
//                   >
//                     <Box className="adminrequests-user adminrequests-from-user">
//                       <Avatar className="adminrequests-avatar">
//                         {request.fromUser.username.charAt(0).toUpperCase()}
//                       </Avatar>
//                       <Typography variant="body2" className="adminrequests-username">
//                         From: {request.fromUser.username}
//                       </Typography>
//                     </Box>
//                   </Tooltip>

//                   <Tooltip 
//                     title={
//                       <Box className="adminrequests-tooltip-content">
//                         <Typography>Username: {request.toUser.username}</Typography>
//                         <Typography>Email: {request.toUser.email}</Typography>
//                       </Box>
//                     } 
//                     arrow
//                   >
//                     <Box className="adminrequests-user adminrequests-to-user">
//                       <Avatar className="adminrequests-avatar">
//                         {request.toUser.username.charAt(0).toUpperCase()}
//                       </Avatar>
//                       <Typography variant="body2" className="adminrequests-username">
//                         To: {request.toUser.username}
//                       </Typography>
//                     </Box>
//                   </Tooltip>
//                 </Box>

//                 {/* Timestamps */}
//                 <Box className="adminrequests-timestamps">
//                   <Typography variant="caption" className="adminrequests-timestamp">
//                     Created: {formatDate(request.createdAt)}
//                   </Typography>
//                   <Typography variant="caption" className="adminrequests-timestamp">
//                     Updated: {formatDate(request.updatedAt)}
//                   </Typography>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default AdminRequests;

// AdminRequests.jsx
import React,{useEffect,useState} from 'react';
import { Box, Typography, Card, CardContent, Avatar, Tooltip, Divider, Chip, Grid } from '@mui/material';
import './AdminRequests.css'; // External CSS import
import axios from "axios";

const AdminRequests = () => {
  // Sample data (replace with your actual data fetching logic)
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/api/admin/requests');
        setRequests(response.data); 
      } catch (err) {
        console.error('Failed to fetch requests:', err);
      }
    };

    fetchRequests();
  }, []);

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return '#2ea043'; // GitHub success green
      case 'rejected':
        return '#f85149'; // GitHub error red
      default:
        return '#9ba3b4'; // Muted color
    }
  };

  return (
    <Box className="adminrequests-container">
      <Typography variant="h4" className="adminrequests-title" gutterBottom>
        Ride Requests
      </Typography>
      
      <Grid container spacing={3} className="adminrequests-grid">
        {requests.map((request) => (
          <Grid item xs={12} sm={6} md={4} key={request._id}>
            <Card className="adminrequests-card">
              <CardContent className="adminrequests-card-content">
                {/* Status and Seats */}
                <Box className="adminrequests-header">
                  <Chip 
                    label={request.status.toUpperCase()} 
                    className="adminrequests-status"
                    style={{ backgroundColor: getStatusColor(request.status) }}
                  />
                </Box>
                <Typography variant="body1" className="adminrequests-seats">
                {request.seatsRequested} seat{request.seatsRequested !== 1 ? 's' : ''} requested
                </Typography>

                {/* Ride Information */}
                <Box className="adminrequests-ride-info">
                  <Typography variant="h6" className="adminrequests-route">
                    {request.ride.pickupLocation} → {request.ride.dropLocation}
                  </Typography>
                  <Typography variant="body2" className="adminrequests-date">
                    {formatDate(request.ride.date)}
                  </Typography>
                  <Typography variant="body2" className="adminrequests-ride-status">
                    Ride Status: {request.ride.status}
                  </Typography>
                  <Typography variant="body2" className="adminrequests-available-seats">
                    Available: {request.ride.availableSeats} seat{request.ride.availableSeats !== 1 ? 's' : ''}
                  </Typography>
                </Box>

                <Divider className="adminrequests-divider" />

                {/* Users Information */}
                <Box className="adminrequests-users">
                  <Tooltip 
                    title={
                      <Box className="adminrequests-tooltip-content">
                        <Typography>Username: {request.fromUser.username}</Typography>
                        <Typography>Email: {request.fromUser.email}</Typography>
                      </Box>
                    } 
                    arrow
                  >
                    <Box className="adminrequests-user adminrequests-from-user">
                      <Avatar className="adminrequests-avatar">
                        {request.fromUser.username?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="body2" className="adminrequests-username">
                        From: {request.fromUser.username}
                      </Typography>
                    </Box>
                  </Tooltip>

                  <Tooltip 
                    title={
                      <Box className="adminrequests-tooltip-content">
                        <Typography>Username: {request.toUser.username}</Typography>
                        <Typography>Email: {request.toUser.email}</Typography>
                      </Box>
                    } 
                    arrow
                  >
                    <Box className="adminrequests-user adminrequests-to-user">
                      <Avatar className="adminrequests-avatar">
                        {request.toUser.username?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="body2" className="adminrequests-username">
                        To: {request.toUser.username}
                      </Typography>
                    </Box>
                  </Tooltip>
                </Box>

                {/* Timestamps */}
                <Box className="adminrequests-timestamps">
                  <Typography variant="caption" className="adminrequests-timestamp">
                    Created: {formatDate(request.createdAt)}
                  </Typography>
                  <Typography variant="caption" className="adminrequests-timestamp">
                    Updated: {formatDate(request.updatedAt)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminRequests;