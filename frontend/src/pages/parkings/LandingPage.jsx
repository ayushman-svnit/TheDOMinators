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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Grid,
  Chip,
  Divider,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  useTheme
} from "@mui/material";
import {
  DirectionsCar,
  LocalParking,
  LocationOn,
  AttachMoney,
  AdminPanelSettings,
  Person,
  Business,
  ElectricCar,
  TwoWheeler,
  Directions
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faParking, faCar, faMotorcycle } from '@fortawesome/free-solid-svg-icons';

// VS Code-inspired dark theme colors
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

// Styled components
const ParkingCard = styled(Card)(({ theme }) => ({
  background: darkTheme.surface,
  borderRadius: '8px',
  border: `1px solid ${darkTheme.background}`,
  transition: 'all 0.3s ease',
  height: '100%',
  minHeight: '300px',
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

const RoleForm = styled(Paper)({
  background: darkTheme.surface,
  padding: '24px',
  marginBottom: '32px',
  borderRadius: '8px',
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

function LandingPage({ currentUser, isAdmin }) {
  // const { currentUser, isAdmin } = useAuth();
  const [search, setSearch] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [allParkings, setAllParkings] = useState([]);
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    fetch("/api/parkings", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        setAllParkings(data.allParkings);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch parkings", err);
        setLoading(false);
      });
  }, []);

  // ... (keep all your existing useEffect hooks)
  useEffect(() => {
    if (!window.maptilersdk) return;

    window.maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

    const map = new window.maptilersdk.Map({
      container: "cluster-map",
      style: window.maptilersdk.MapStyle.STREETS,
      center: [78.9629, 20.5937],
      zoom: 3.5,
    });

    allParkings.forEach(parking => {
      if (parking.geometry?.coordinates) {
        const marker = new window.maptilersdk.Marker({
          color: parking.availableSlots ? "#4CAF50" : "#F44336",
          scale: 1.2
        })
          .setLngLat(parking.geometry.coordinates)
          .setPopup(new window.maptilersdk.Popup().setHTML(`
            <div style="padding: 8px;">
              <h3 style="margin: 0 0 4px; color: #1976d2;">${parking.name}</h3>
              <p style="margin: 0; font-size: 14px;">
                <strong style="color: #666;">${parking.location}</strong><br>
                <strong style="color: #666;">Rate:</strong> <span style="color: #666;">₹${parking.rate}/hr</span>
              </p>
            </div>
          `))
          .addTo(map);
      }
    });
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

  const handleRoleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/parkings", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isOwner: role === "owner" }),
      });

      if (!res.ok) throw new Error("Role submission failed");

      if (role === "owner") navigate("/parkings/owner");
      else navigate("/parkings/user");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Box>
      {currentUser ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <RoleForm elevation={3}>
            <Typography variant="h5" gutterBottom sx={{ color: darkTheme.primary }}>
              Welcome, {currentUser.username || currentUser.email}!
              {console.log('From landing page', currentUser)}
            </Typography>
            <Typography variant="body1" sx={{ color: darkTheme.textSecondary }} paragraph>
              Please select your role to continue
            </Typography>

            <form onSubmit={handleRoleSubmit}>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  row
                  sx={{ gap: 3 }}
                >
                  <FormControlLabel
                    value="user"
                    control={<Radio sx={{ color: darkTheme.primary }} />}
                    label={
                      <Box display="flex" alignItems="center">
                        <Person sx={{ color: darkTheme.primary, mr: 1 }} />
                        <Typography sx={{ color: darkTheme.textPrimary }}>
                          I want to book parking (User)
                        </Typography>
                      </Box>
                    }
                    sx={{
                      background: role === 'user' ? 'rgba(86, 156, 214, 0.1)' : 'transparent',
                      px: 3,
                      py: 1,
                      borderRadius: '4px'
                    }}
                  />
                  <FormControlLabel
                    value="owner"
                    control={<Radio sx={{ color: darkTheme.primary }} />}
                    label={
                      <Box display="flex" alignItems="center">
                        <Business sx={{ color: darkTheme.primary, mr: 1 }} />
                        <Typography sx={{ color: darkTheme.textPrimary }}>
                          I own a parking space (Owner)
                        </Typography>
                      </Box>
                    }
                    sx={{
                      background: role === 'owner' ? 'rgba(86, 156, 214, 0.1)' : 'transparent',
                      px: 3,
                      py: 1,
                      borderRadius: '4px'
                    }}
                  />
                </RadioGroup>
              </FormControl>

              <Box mt={3}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    color: '#fff',
                    borderRadius: '50px',
                    px: 3,
                    py: 1.2,
                    fontWeight: 600,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      background: `linear-gradient(135deg, #4a8fd6 0%, #2a7fd9 100%)`,
                      boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)'
                    },
                    '&:active': {
                      transform: 'scale(0.98)'
                    }
                  }}
                  endIcon={<LocalParking />}
                >
                  Continue
                </Button>
              </Box>
            </form>
          </RoleForm>
        </motion.div>
      ) : !isAdmin && (
        <Typography variant="h6" sx={{ color: darkTheme.textSecondary }} align="center">
          To book or lend a parking lot, please log in first!
        </Typography>
      )}

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

      <Grid container spacing={{ xs: 2, sm: 3 }} // Responsive spacing
        sx={{
          padding: { xs: 1, sm: 2 }, // Responsive padding
          minHeight: '100vh' // Optional
        }}>
        <AnimatePresence>
          {loading ? (
            <>
              {[...Array(8)].map((_, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={`skeleton-${index}`}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CardSkeleton />
                  </motion.div>
                </Grid>
              ))}
            </>
          ) : (
            allParkings.map((parking) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} sx={{ minHeight: '100%' }} key={parking._id} >
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
                          label={
                            parking.availableSlots > 0 ?
                              `Available` :
                              "Occupied"
                          }
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
                    <CardActions sx={{ padding: '16px', justifyContent: 'space-between' }}>
                      {isAdmin && (
                        <Button
                          size="small"
                          sx={{
                            color: darkTheme.warning,
                            '&:hover': {
                              background: 'rgba(220, 220, 170, 0.1)'
                            }
                          }}
                          onClick={() => navigate(`/admin/parkings/owner/${parking._id}`)}
                          startIcon={<AdminPanelSettings />}
                        >
                          Manage
                        </Button>
                      )}
                    </CardActions>
                  </ParkingCard>
                </motion.div>
              </Grid>
            ))
          )}
        </AnimatePresence>
      </Grid>
    </Box>
  );
}

export default LandingPage;