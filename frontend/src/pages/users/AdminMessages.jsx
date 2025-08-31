// AdminMessages.jsx
import React,{useEffect,useState} from 'react';
import { Box, Typography, Card, CardContent, Avatar, Tooltip, Divider } from '@mui/material';
import './AdminMessages.css'; // External CSS import
import axios from "axios";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/api/admin/messages');
        setMessages(response.data); 
      } catch (err) {
        console.error('Failed to fetch messages:', err);
      }
    };

    fetchMessages();
  }, []);
  // Sample data (you'll replace this with your actual data fetching logic)

  // Function to format timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Group messages by chatId
  const groupedMessages = messages.reduce((acc, message) => {
    if (!acc[message.chatId]) {
      acc[message.chatId] = [];
    }
    acc[message.chatId].push(message);
    return acc;
  }, {});

  return (
    <Box className="adminmessages-container">
      <Typography variant="h4" className="adminmessages-title" gutterBottom>
        Message Dashboard
      </Typography>
      
      <Box className="adminmessages-grid">
        {Object.entries(groupedMessages).map(([chatId, chatMessages]) => (
          <Card key={chatId} className="adminmessages-card">
            <CardContent>
              <Box className="adminmessages-card-header">
                <Typography variant="h6" className="adminmessages-chat-id">
                  Chat ID: {chatId}
                </Typography>
                <Typography variant="body2" className="adminmessages-participants">
                  Participants: {chatMessages[0].participants.join(', ')}
                </Typography>
              </Box>
              
              <Divider className="adminmessages-divider" />
              
              <Box className="adminmessages-messages-container">
                {chatMessages.map((message, index) => (
                  <Box 
                    key={message._id} 
                    className={`adminmessages-message ${message.sender === 'driver' ? 'adminmessages-driver' : 'adminmessages-passenger'}`}
                  >
                    <Tooltip 
                      title={`Sender: ${message.sender}`} 
                      placement={message.sender === 'driver' ? 'right' : 'left'}
                      arrow
                    >
                      <Box className="adminmessages-message-content">
                        <Avatar className="adminmessages-avatar">
                          {message.sender.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box className="adminmessages-message-text">
                          <Typography variant="body1" className="adminmessages-message-body">
                            {message.text}
                          </Typography>
                          <Typography variant="caption" className="adminmessages-timestamp">
                            {formatDate(message.timestamp)}
                          </Typography>
                        </Box>
                      </Box>
                    </Tooltip>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default AdminMessages;

// import React from 'react';
// import { 
//   Box, 
//   Typography, 
//   Card, 
//   CardContent, 
//   Grid, 
//   Avatar, 
//   Tooltip,
//   useTheme,
//   styled 
// } from '@mui/material';
// import './AdminMessages.css';

// const AdminMessageCard = styled(Card)(({ theme }) => ({
//   backgroundColor: theme.palette.background.paper,
//   border: `1px solid ${theme.palette.divider}`,
//   borderRadius: theme.shape.borderRadius,
//   transition: 'all 0.3s ease',
//   '&:hover': {
//     transform: 'translateY(-5px)',
//     boxShadow: `0 8px 24px ${theme.palette.primary.dark}20`,
//     borderColor: theme.palette.primary.light,
//   },
// }));

// const ScoreBadge = styled('div')(({ theme, score }) => ({
//   width: 32,
//   height: 32,
//   borderRadius: '50%',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   fontWeight: 'bold',
//   backgroundColor: 
//     score >= 4 ? theme.palette.success.main :
//     score === 3 ? theme.palette.warning.main :
//     theme.palette.error.main,
//   color: theme.palette.getContrastText(
//     score >= 4 ? theme.palette.success.main :
//     score === 3 ? theme.palette.warning.main :
//     theme.palette.error.main
//   ),
// }));

// const AdminMessages = () => {
//   const theme = useTheme();
  // const [messages, setMessages] = useState([]);
  // const [error, setError] = useState(null);
  // useEffect(() => {
  //   const fetchRatings = async () => {
  //     try {
  //       const response = await axios.get('/api/admin/ratings');
  //       setMessages(response.data); // assuming response.data is an array of ratings
  //     } catch (err) {
  //       console.error('Failed to fetch ratings:', err);
  //       setError(err);
  //     }
  //   };

  //   fetchRatings();
  // }, []);

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

//   return (
//     <Box className="adminMessages-container">
//       <Typography 
//         variant="h4" 
//         className="adminMessages-title"
//         sx={{ color: theme.palette.primary.main }}
//       >
//         Ride Feedback
//       </Typography>
      
//       <Grid container spacing={3} className="adminMessages-grid">
//         {messages.map((message) => (
//           <Grid item xs={12} sm={6} md={4} key={message._id}>
//             <AdminMessageCard className="adminMessages-card">
//               <CardContent className="adminMessages-cardContent">
//                 <div className="adminMessages-header">
//                   <ScoreBadge score={message.score} className="adminMessages-score">
//                     {message.score}
//                   </ScoreBadge>
//                   <Typography 
//                     variant="caption" 
//                     className="adminMessages-date"
//                     sx={{ color: theme.palette.text.secondary }}
//                   >
//                     {formatDate(message.timestamp)}
//                   </Typography>
//                 </div>

//                 {message.comment && (
//                   <Typography 
//                     variant="body1" 
//                     className="adminMessages-comment"
//                     sx={{ 
//                       color: theme.palette.text.primary,
//                       fontStyle: message.comment ? 'normal' : 'italic'
//                     }}
//                   >
//                     {message.comment || "No comment provided"}
//                   </Typography>
//                 )}

//                 <div className="adminMessages-rideInfo">
//                   <Typography variant="subtitle2" className="adminMessages-route">
//                     {message.ride.pickupLocation} → {message.ride.dropLocation}
//                   </Typography>
//                   <Typography variant="caption" className="adminMessages-rideDate">
//                     {new Date(message.ride.date).toLocaleDateString()}
//                   </Typography>
//                 </div>

//                 <div className="adminMessages-users">
//                   <Tooltip 
//                     title={
//                       <div className="adminMessages-userTooltip">
//                         <div>Username: {message.fromUser.username}</div>
//                         <div>Email: {message.fromUser.email}</div>
//                       </div>
//                     }
//                     arrow
//                   >
//                     <div className="adminMessages-user">
//                       <Avatar className="adminMessages-avatar">
//                         {message.fromUser.username.charAt(0).toUpperCase()}
//                       </Avatar>
//                       <Typography variant="body2" className="adminMessages-username">
//                         {message.fromUser.username}
//                       </Typography>
//                       <span className="adminMessages-userRole">(Reviewer)</span>
//                     </div>
//                   </Tooltip>

//                   <Typography variant="body2" className="adminMessages-reviewedFor">
//                     reviewed for
//                   </Typography>

//                   <Tooltip 
//                     title={
//                       <div className="adminMessages-userTooltip">
//                         <div>Username: {message.toUser.username}</div>
//                         <div>Email: {message.toUser.email}</div>
//                       </div>
//                     }
//                     arrow
//                   >
//                     <div className="adminMessages-user">
//                       <Avatar className="adminMessages-avatar">
//                         {message.toUser.username.charAt(0).toUpperCase()}
//                       </Avatar>
//                       <Typography variant="body2" className="adminMessages-username">
//                         {message.toUser.username}
//                       </Typography>
//                     </div>
//                   </Tooltip>
//                 </div>
//               </CardContent>
//             </AdminMessageCard>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default AdminMessages;