import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  useTheme
} from "@mui/material";
import {
  DirectionsCar,
  LocalParking,
  LocationOn,
  AttachMoney,
  Edit,
  Add,
  ElectricCar
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faParking, faMotorcycle } from '@fortawesome/free-solid-svg-icons';

// Same dark theme as LandingPage and UserDashboard
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

// Same styled components
const ParkingCard = styled(Card)(({ theme }) => ({
  background: darkTheme.surface,
  borderRadius: '8px',
  minHeight: '335px',
  border: `1px solid ${darkTheme.background}`,
  transition: 'all 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 10px 20px rgba(0, 0, 0, 0.3)`,
    borderColor: darkTheme.primary
  }
}));

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

function OwnerDashboard({ currentUser }) {
  // const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    fetch("/api/parkings/owner", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setOwner(data.owner);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load owner parkings", err);
        setLoading(false);
      });
  }, []);

  if (!owner) {
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

  const ownedParkings = owner.parkings.filter(p => p.owner === currentUser._id);

  return (
    <Box sx={{ padding: 3 }}>
      <ParkingNavbar currentUser={currentUser} isAdmin={false}/>
      {/* Owner Info Section */}
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
          Owner Profile
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

      {/* Owned Parkings Section */}
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
        Your Parking Spaces
      </Typography>

      {ownedParkings.length > 0 ? (
        <Grid container spacing={3}>
          {ownedParkings.map((parking) => (
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
                      size="small"
                      variant="contained"
                      startIcon={<Edit />}
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
                      onClick={() => navigate(`/parkings/owner/${parking._id}`)}
                    >
                      Manage
                    </Button>
                  </CardActions>
                </ParkingCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" sx={{ color: darkTheme.textSecondary, textAlign: 'center', my: 4 }}>
          No parking spaces created yet.
        </Typography>
      )}

      {/* Create New Parking Section */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 6,
        marginBottom: 4
      }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<Add />}
          sx={{
            color: '#fff',
            borderRadius: '50px',
            px: 4,
            py: 1.5,
            fontWeight: 600,
            background: `linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)`, // More vibrant green
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              background: `linear-gradient(135deg, #27ae60 0%, #219653 100%)`, // Darker on hover
              boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)',
              transform: 'translateY(-1px)'
            },
            '&:active': {
              transform: 'scale(0.98)'
            },
            transition: 'all 0.2s ease'
          }}
          onClick={() => navigate("/parkings/owner/new")}
        >
          Create New Parking Space
        </Button>
      </Box>
    </Box>
  );
}

export default OwnerDashboard;