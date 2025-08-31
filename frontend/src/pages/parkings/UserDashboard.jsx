import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../../components/Search";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from '@mui/material/Skeleton';
import ParkingNavbar from "../../ParkingNavbar";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Chip,
  Divider,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
} from "@mui/material";
import {
  DirectionsCar,
  LocalParking,
  LocationOn,
  AttachMoney,
  ElectricCar,
  Star,
  StarBorder,
  ExitToApp
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faParking, faMotorcycle } from '@fortawesome/free-solid-svg-icons';

// Same dark theme as LandingPage
const darkTheme = {
  background: '#0d1117',
  surface: '#161a20',
  primary: '#007bff',
  secondary: '#9cdcfe',
  textPrimary: '#9ba3b4',
  textSecondary: '#858585',
  accent: '#4ec9b0',
  error: '#f48771',
  warning: '#dcdcaa',
  success: '#608b4e'
};

// Same styled components as LandingPage
const ParkingCard = styled(Card)(({ theme }) => ({
  background: darkTheme.surface,
  borderRadius: '8px',
  border: `1px solid ${darkTheme.background}`,
  transition: 'all 0.3s ease',
  height: '100%',
  minHeight: '335px',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 10px 20px rgba(0, 0, 0, 0.3)`,
    borderColor: darkTheme.primary
  }
}));

const MapContainer = styled(Box)({
  height: '500px',
  width: '1000px',
  borderRadius: '8px',
  overflow: 'hidden',
  margin: '24px 0',
  border: `1px solid ${darkTheme.background}`,
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
});

const CardSkeleton = () => (
  <ParkingCard>
    <CardContent>
      <Box display="flex" alignItems="center" mb={2}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton width="60%" height={32} sx={{ ml: 2 }} />
      </Box>
      <Skeleton width="80%" height={24} sx={{ mb: 2 }} />
      <Skeleton width="60%" height={24} sx={{ mb: 2 }} />
      <Box display="flex" sx={{ gap: 1, mb: 2 }}>
        <Skeleton variant="rectangular" width={80} height={32} />
        <Skeleton variant="rectangular" width={80} height={32} />
      </Box>
      <Box display="flex" sx={{ gap: 1 }}>
        <Skeleton variant="rectangular" width={100} height={32} />
        <Skeleton variant="rectangular" width={100} height={32} />
      </Box>
    </CardContent>
    <CardActions>
      <Skeleton width="40%" height={36} />
      <Skeleton width="40%" height={36} />
    </CardActions>
  </ParkingCard>
);

const parkingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

function UserDashboard({ currentUser }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [search, setSearch] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [allParkings, setAllParkings] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch("/api/parkings/user", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.user);
        setAllParkings(data.allParkings);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load user data:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!window.maptilersdk) return;

      window.maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

      const map = new window.maptilersdk.Map({
        container: "cluster-map",
        style: window.maptilersdk.MapStyle.STREETS,
        center: [78.9629, 20.5937],
        zoom: 3.5,
      });

      allParkings.forEach((parking) => {
        if (parking.geometry?.coordinates) {
          const marker = new window.maptilersdk.Marker({
            color: parking.availableSlots ? "#4CAF50" : "#F44336",
            scale: 1.2
          })
            .setLngLat(parking.geometry.coordinates)
            .setPopup(new window.maptilersdk.Popup().setHTML(`
            <div style="padding: 8px;">
              <h3 style="margin: 0 0 4px; color: #1976d2;"><a href="/parkings/user/${parking._id}">${parking.name}</a></h3>
              <p style="margin: 0; font-size: 14px;">
                <strong style="color: #666;">${parking.location}</strong><br>
                <strong style="color: #666;">Rate:</strong> <span style="color: #666;">₹${parking.rate}/hr</span>
              </p>
            </div>
          `))
            .addTo(map);
        }
      });
    }, 100);
    // Cleanup the timeout on component unmount
    return () => clearTimeout(timeout);
  }, [allParkings]);


  useEffect(() => {
    if (search.trim() === "") {
      setRecommendations([]);
      return;
    }
    const filtered = allParkings.filter(parking =>
      parking.name.toLowerCase().includes(search.toLowerCase()) ||
      parking.location.toLowerCase().includes(search.toLowerCase())
    );
    setRecommendations(filtered);
  }, [search]);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleLeaveParking = async (parkingId) => {
    if (!window.confirm("Are you sure you want to leave this parking?")) return;

    try {
      await fetch(`/api/parkings/user/${parkingId}`, {
        method: "DELETE",
        credentials: "include",
      });
      window.location.reload();
    } catch (err) {
      console.error("Leave parking error:", err);
    }
  };

  const handleBook = (parkingId) => {
    navigate(`/parkings/user/${parkingId}`);
  };

  if (!userData) {
    return (
      <Box sx={{ padding: 3 }}>
        <Grid container spacing={3}>
          {[...Array(8)].map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={`skeleton-${index}`}>
              <CardSkeleton />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  const bookedParkings = userData.parkings.filter(p => p.owner !== currentUser._id);
  const availableParkings = allParkings.filter(p => p.owner !== currentUser._id);

  return (
    <Box sx={{ padding: 3 }}>
      <ParkingNavbar currentUser={currentUser} isAdmin={false} />
      {/* User Info Section */}
      <Paper elevation={0} sx={{
        background: darkTheme.surface,
        padding: 3,
        marginBottom: 4,
        borderRadius: '8px',
        border: `1px solid ${darkTheme.background}`,
      }}>
        <Typography variant="h4" sx={{
          color: darkTheme.primary,
          marginBottom: 2,
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: '-10px',
            left: 0,
            width: '80px',
            height: '4px',
            background: darkTheme.primary,
            borderRadius: '2px',
          }
        }}>
          User Profile
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {/* <Typography variant="body1" sx={{ color: darkTheme.textPrimary }}>
            <strong>Name:</strong> {currentUser.name}
          </Typography> */}
          <Typography variant="body1" sx={{ color: darkTheme.textPrimary }}>
            <strong>Username:</strong> {currentUser.username}
          </Typography>
          <Typography variant="body1" sx={{ color: darkTheme.textPrimary }}>
            <strong>Email:</strong> {currentUser.email}
          </Typography>
          {/* {currentUser.phone && (
            <Typography variant="body1" sx={{ color: darkTheme.textPrimary }}>
              <strong>Phone:</strong> {currentUser.phone}
            </Typography>
          )} */}
        </Box>
      </Paper>

      {/* Search Section */}
      <Search handleSearch={handleSearch} search={search} />

      {/* Recommendations List */}
      {recommendations.length > 0 && (
        <Paper elevation={2} sx={{
          marginTop: 2,
          maxHeight: '300px',
          overflowY: 'auto',
          borderRadius: '12px',
          background: darkTheme.surface,
        }}>
          <List>
            {recommendations.map(recommendation => (
              <motion.div
                key={recommendation._id}
                variants={parkingVariants}
                initial="hidden"
                animate="visible"
              >
                <ListItem
                  button
                  onClick={() => navigate(`/parkings/user/${recommendation._id}`)}
                  sx={{ background: darkTheme.surface, cursor: 'pointer' }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: darkTheme.primary }}>
                      <DirectionsCar />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography sx={{ color: darkTheme.textPrimary }}>
                        {recommendation.name}
                      </Typography>
                    }
                    secondary={
                      <Typography sx={{ color: darkTheme.textSecondary }}>
                        {recommendation.location}
                      </Typography>
                    }
                  />
                  <Chip
                    label={`₹${recommendation.rate}/hr`}
                    color="primary"
                    variant="outlined"
                    sx={{ borderColor: darkTheme.primary, color: darkTheme.primary }}
                  />
                </ListItem>
                <Divider variant="inset" component="li" sx={{ bgcolor: darkTheme.background }} />
              </motion.div>
            ))}
          </List>
        </Paper>
      )}

      {/* Booked Parkings Section */}
      <Typography variant="h4" sx={{
        margin: '40px 0 20px',
        position: 'relative',
        color: darkTheme.textPrimary,
        '&:after': {
          content: '""',
          position: 'absolute',
          bottom: '-10px',
          left: 0,
          width: '80px',
          height: '4px',
          background: darkTheme.primary,
          borderRadius: '2px',
        }
      }}>
        Your Bookings
      </Typography>

      {bookedParkings.length > 0 ? (
        <Grid container spacing={3}>
          {bookedParkings.map((parking) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={parking._id}>
              <motion.div
                variants={parkingVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ParkingCard sx={{ minHeight: '335px' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <FontAwesomeIcon
                        icon={faParking}
                        style={{
                          fontSize: '2rem',
                          color: darkTheme.primary,
                          marginRight: '12px'
                        }}
                      />
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          color: darkTheme.textPrimary,
                          fontWeight: 600
                        }}
                      >
                        {parking.name}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" mb={2} sx={{ gap: 1 }}>
                      <LocationOn sx={{ color: darkTheme.textSecondary }} />
                      <Typography variant="body2" sx={{ color: darkTheme.textSecondary }}>
                        {parking.location}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" mb={2} sx={{ gap: 1 }}>
                      <AttachMoney sx={{ color: darkTheme.accent }} />
                      <Typography variant="body1" sx={{ color: darkTheme.textPrimary }}>
                        ₹{parking.rate} / hour
                      </Typography>
                    </Box>

                    <Box display="flex" flexWrap="wrap" sx={{ gap: 1, mb: 2 }}>
                      {parking.EVCharging && <Chip
                        icon={<ElectricCar />}
                        label="EV Charging"
                        size="small"
                        sx={{
                          background: 'rgba(78, 201, 176, 0.1)',
                          color: darkTheme.accent
                        }}
                      />}
                      {parking.BikeWash && <Chip
                        icon={<FontAwesomeIcon icon={faMotorcycle} />}
                        label="Bike Wash"
                        size="small"
                        sx={{
                          background: 'rgba(156, 220, 254, 0.1)',
                          color: darkTheme.secondary
                        }}
                      />}
                    </Box>

                    <Box display="flex" sx={{ gap: 1, mb: 2 }}>
                      <Chip
                        label="Booked"
                        color="success"
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                      <Chip
                        label={`${parking.totalSlots} Total`}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderColor: darkTheme.textSecondary,
                          color: darkTheme.textSecondary
                        }}
                      />
                    </Box>
                  </CardContent>
                  <CardActions sx={{ padding: '16px', justifyContent: 'flex-end' }}>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<ExitToApp />}
                      sx={{
                        color: darkTheme.error,
                        borderColor: darkTheme.error,
                        '&:hover': {
                          backgroundColor: 'rgba(244, 135, 113, 0.1)',
                          borderColor: darkTheme.error
                        }
                      }}
                      onClick={() => handleLeaveParking(parking._id)}
                    >
                      Leave Parking
                    </Button>
                  </CardActions>
                </ParkingCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" sx={{ color: darkTheme.textSecondary, textAlign: 'center', my: 4 }}>
          No active bookings found.
        </Typography>
      )}

      {/* Available Parkings Section */}
      <Typography variant="h4" sx={{
        margin: '40px 0 20px',
        position: 'relative',
        color: darkTheme.textPrimary,
        '&:after': {
          content: '""',
          position: 'absolute',
          bottom: '-10px',
          left: 0,
          width: '80px',
          height: '4px',
          background: darkTheme.primary,
          borderRadius: '2px',
        }
      }}>
        Available Parking Spaces
      </Typography>

      <MapContainer id="cluster-map" />

      {availableParkings.length > 0 ? (
        <Grid container spacing={3}>
          {availableParkings.map((parking) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={parking._id}>
              <motion.div
                variants={parkingVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ParkingCard>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <FontAwesomeIcon
                        icon={faParking}
                        style={{
                          fontSize: '2rem',
                          color: darkTheme.primary,
                          marginRight: '12px'
                        }}
                      />
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          color: darkTheme.textPrimary,
                          fontWeight: 600
                        }}
                      >
                        {parking.name}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" mb={2} sx={{ gap: 1 }}>
                      <LocationOn sx={{ color: darkTheme.textSecondary }} />
                      <Typography variant="body2" sx={{ color: darkTheme.textSecondary }}>
                        {parking.location}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" mb={2} sx={{ gap: 1 }}>
                      <AttachMoney sx={{ color: darkTheme.accent }} />
                      <Typography variant="body1" sx={{ color: darkTheme.textPrimary }}>
                        ₹{parking.rate} / hour
                      </Typography>
                    </Box>

                    <Box display="flex" flexWrap="wrap" sx={{ gap: 1, mb: 2 }}>
                      {parking.EVCharging && <Chip
                        icon={<ElectricCar />}
                        label="EV Charging"
                        size="small"
                        sx={{
                          background: 'rgba(78, 201, 176, 0.1)',
                          color: darkTheme.accent
                        }}
                      />}
                      {parking.BikeWash && <Chip
                        icon={<FontAwesomeIcon icon={faMotorcycle} />}
                        label="Bike Wash"
                        size="small"
                        sx={{
                          background: 'rgba(156, 220, 254, 0.1)',
                          color: darkTheme.secondary
                        }}
                      />}
                    </Box>

                    <Box display="flex" sx={{ gap: 1 }}>
                      <Chip
                        label={parking.availableSlots > 0 ? "Available" : "Occupied"}
                        color={parking.availableSlots > 0 ? "success" : "error"}
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                      <Chip
                        label={`${parking.totalSlots} Total`}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderColor: darkTheme.textSecondary,
                          color: darkTheme.textSecondary
                        }}
                      />
                    </Box>
                  </CardContent>
                  <CardActions sx={{ padding: '16px', justifyContent: 'flex-start' }}>
                    <Button
                      disabled={parking.availableSlots == 0}
                      size="small"
                      variant="contained"
                      endIcon={<LocalParking />}
                      sx={{
                        color: '#fff',
                        borderRadius: '4px',
                        px: 2,
                        py: 1,
                        fontWeight: 600,
                        '&:active': {
                          transform: 'scale(0.98)'
                        }
                      }}
                      onClick={() => handleBook(parking._id)}
                    >
                      Book Now
                    </Button>
                  </CardActions>
                </ParkingCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" sx={{ color: darkTheme.textSecondary, textAlign: 'center', my: 4 }}>
          No available parking spaces found.
        </Typography>
      )}
    </Box>
  );
}

export default UserDashboard;