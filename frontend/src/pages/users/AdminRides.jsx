import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Avatar, Tooltip, Divider, Chip, Grid, Tabs, Tab } from '@mui/material';
import axios from 'axios';
import './AdminRides.css';

const AdminRides = () => {
  const [rides, setRides] = useState({
    upcoming: [],
    cancelled: [],
    completed: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = React.useState(0);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/admin/rides');
        setRides({
          upcoming: response.data.upcoming || [],
          cancelled: response.data.cancelled || [],
          completed: response.data.completed || []
        });
      } catch (err) {
        console.error('Failed to fetch rides:', err);
        setError('Failed to load rides data');
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return '#d29922';
      case 'cancelled': return '#f85149';
      case 'completed': return '#2ea043';
      default: return '#9ba3b4';
    }
  };

  if (loading) return <Typography className="adminrides-loading">Loading rides...</Typography>;
  if (error) return <Typography className="adminrides-error">{error}</Typography>;

  return (
    <Box className="adminrides-container">
      <Typography variant="h4" className="adminrides-title" gutterBottom>
        Ride Management
      </Typography>

      <Tabs 
        value={tabValue} 
        onChange={handleTabChange} 
        className="adminrides-tabs"
        variant="fullWidth"
      >
        <Tab label={`Upcoming (${rides.upcoming.length})`} className="adminrides-tab" />
        <Tab label={`Completed (${rides.completed.length})`} className="adminrides-tab" />
        <Tab label={`Cancelled (${rides.cancelled.length})`} className="adminrides-tab" />
      </Tabs>

      <Box className="adminrides-tab-content">
        {tabValue === 0 && (
          <RidesSection 
            title="Upcoming Rides" 
            rides={rides.upcoming} 
            formatDate={formatDate} 
            getStatusColor={getStatusColor} 
          />
        )}
        
        {tabValue === 1 && (
          <RidesSection 
            title="Completed Rides" 
            rides={rides.completed} 
            formatDate={formatDate} 
            getStatusColor={getStatusColor} 
          />
        )}
        
        {tabValue === 2 && (
          <RidesSection 
            title="Cancelled Rides" 
            rides={rides.cancelled} 
            formatDate={formatDate} 
            getStatusColor={getStatusColor} 
          />
        )}
      </Box>
    </Box>
  );
};

const RidesSection = ({ title, rides, formatDate, getStatusColor }) => {
  if (rides.length === 0) {
    return <Typography className="adminrides-empty">No {title.toLowerCase()} found</Typography>;
  }

  return (
    <Box className="adminrides-rides-section">
      <Typography variant="h5" className="adminrides-section-title">{title}</Typography>
      <Grid container spacing={3} className="adminrides-grid">
        {rides.map((ride) => (
          <RideCard key={ride._id} ride={ride} formatDate={formatDate} getStatusColor={getStatusColor} />
        ))}
      </Grid>
    </Box>
  );
};

const RideCard = ({ ride, formatDate, getStatusColor }) => {
  const totalEarnings = ride.pricePerSeat * ride.bookedUsers.reduce((sum, user) => sum + user.seatsBooked, 0);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className="adminrides-card">
        <CardContent className="adminrides-card-content">
          {/* Status and Vehicle Info */}
          <Box className="adminrides-header">
            <Chip 
              label={ride.status.toUpperCase()} 
              className="adminrides-status"
              style={{ backgroundColor: getStatusColor(ride.status) }}
            />
            <Box className="adminrides-vehicle">
              <Typography variant="body1" className="adminrides-vehicle-model">
                {ride.vehicleDetails.model}
              </Typography>
              <Typography variant="body2" className="adminrides-vehicle-number">
                {ride.vehicleDetails.number}
              </Typography>
            </Box>
          </Box>

          {/* Ride Information */}
          <Box className="adminrides-route-info">
            <Typography variant="h6" className="adminrides-route">
              {ride.pickupLocation} → {ride.dropLocation}
            </Typography>
            <Typography variant="body2" className="adminrides-date">
              {formatDate(ride.date)} at {ride.time}
            </Typography>
          </Box>

          <Divider className="adminrides-divider" />

          {/* Seats and Pricing */}
          <Box className="adminrides-seats-pricing">
            <Box className="adminrides-seats">
              <Typography variant="body2">
                Booked: {ride.bookedUsers.reduce((sum, user) => sum + user.seatsBooked, 0)}/{ride.availableSeats} seats
              </Typography>
              <Typography variant="body2">
                Price: ₹{ride.pricePerSeat}/seat
              </Typography>
            </Box>
            {ride.status === 'completed' && (
              <Typography variant="body1" className="adminrides-earnings">
                Total: ₹{totalEarnings}
              </Typography>
            )}
          </Box>

          {/* Driver Information */}
          <Tooltip 
            title={
              <Box className="adminrides-tooltip-content">
                <Typography>Username: {ride.driver.username}</Typography>
                <Typography>Email: {ride.driver.email}</Typography>
              </Box>
            } 
            arrow
          >
            <Box className="adminrides-driver">
              <Avatar className="adminrides-avatar">
                {ride.driver.username.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="body2" className="adminrides-username">
                Driver: {ride.driver.username}
              </Typography>
            </Box>
          </Tooltip>

          {/* Booked Passengers */}
          {ride.bookedUsers.length > 0 && (
            <>
              <Divider className="adminrides-divider" />
              <Box className="adminrides-passengers">
                <Typography variant="subtitle2" className="adminrides-passengers-title">
                  Passengers ({ride.bookedUsers.length})
                </Typography>
                <Box className="adminrides-passengers-list">
                  {ride.bookedUsers.map((user) => (
                    <Tooltip 
                      key={user._id}
                      title={
                        <Box className="adminrides-tooltip-content">
                          <Typography>Username: {user.username}</Typography>
                          <Typography>Email: {user.email}</Typography>
                          <Typography>Seats: {user.seatsBooked}</Typography>
                        </Box>
                      } 
                      arrow
                    >
                      <Box className="adminrides-passenger" key={user._id}>
                        <Avatar className="adminrides-passenger-avatar">
                          {user.username.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography variant="body2" className="adminrides-passenger-name">
                          {user.username}
                        </Typography>
                        <Chip 
                          label={`${user.seatsBooked} seat${user.seatsBooked !== 1 ? 's' : ''}`} 
                          className="adminrides-passenger-seats"
                        />
                      </Box>
                    </Tooltip>
                  ))}
                </Box>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default AdminRides;