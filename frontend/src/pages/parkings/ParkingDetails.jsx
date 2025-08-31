import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
import ParkingNavbar from "../../ParkingNavbar";
import {
  Box,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  Divider,
  useTheme
} from "@mui/material";
import {
  LocalParking,
  LocationOn,
  Schedule,
  AttachMoney,
  Person,
  Phone,
  Email,
  Edit,
  Delete,
  PersonRemove,
  ElectricCar,
  TwoWheeler
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Dark theme colors
const darkTheme = {
  background: '#0d1117',
  surface: '#161a20',
  cardBackground: '#1e222a',
  primary: '#569cd6',
  secondary: '#9cdcfe',
  textPrimary: '#9ba3b4',
  textSecondary: '#858585',
  accent: '#4ec9b0',
  error: '#f48771',
  warning: '#dcdcaa',
  success: '#2ecc71'
};

// Styled components
const MapContainer = styled(Box)({
  height: '400px',
  borderRadius: '8px',
  overflow: 'hidden',
  marginBottom: '24px',
  border: `1px solid ${darkTheme.background}`,
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
});

const InfoBlock = styled(Paper)({
  background: darkTheme.surface,
  padding: '24px',
  borderRadius: '8px',
  border: `1px solid ${darkTheme.background}`,
  marginBottom: '24px',
});

const UserCard = styled(Card)({
  background: darkTheme.cardBackground,
  marginBottom: '16px',
  border: `1px solid ${darkTheme.background}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 6px 12px rgba(0, 0, 0, 0.3)`,
    borderColor: darkTheme.primary
  }
});

function ParkingDetails({ isAdmin, currentUser }) {
  const { parkingId } = useParams();
  const navigate = useNavigate();
  const [parking, setParking] = useState(null);
  // const { isAdmin } = useAuth();
  const theme = useTheme();

  useEffect(() => {
    fetch(`/api/parkings/owner/${parkingId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setParking(data.parking))
      .catch((err) => console.error("Error fetching parking:", err));
  }, [parkingId]);

  useEffect(() => {
    if (!window.maptilersdk || !parking?.geometry?.coordinates) return;

    window.maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

    const map = new window.maptilersdk.Map({
      container: "parkingmap",
      style: window.maptilersdk.MapStyle.STREETS,
      center: parking.geometry.coordinates,
      zoom: 14,
    });

    new window.maptilersdk.Marker({
      color: parking.availableSlots > 0 ? "#4CAF50" : "#F44336"
    })
      .setLngLat(parking.geometry.coordinates)
      .setPopup(new window.maptilersdk.Popup().setHTML(`
        <div style="padding: 8px; background: ${darkTheme.surface}; color: ${darkTheme.textPrimary}">
          <h3 style="margin: 0 0 4px; color: ${darkTheme.primary};">${parking.name}</h3>
          <p style="margin: 0; font-size: 14px;">
            <span>${parking.location}</span><br>
            <strong>Available:</strong> ${parking.availableSlots}/${parking.totalSlots}
          </p>
        </div>
      `))
      .addTo(map);
  }, [parking]);

  const handleDeleteParking = async () => {
    if (!window.confirm("Are you sure you want to delete this parking?")) return;

    try {
      await fetch(`/api/parkings/owner/${parkingId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (isAdmin) navigate("/parkings");
      else navigate("/parkings/owner");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete parking.");
    }
  };

  const handleRemoveUser = async (userId) => {
    if (!window.confirm("Remove this user from the parking?")) return;

    try {
      await fetch(`/api/parkings/owner/${parkingId}/user/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });
      window.location.reload();
    } catch (err) {
      console.error("Error removing user:", err);
      alert("Failed to remove user.");
    }
  };

  if (!parking) return (
    <Box sx={{
      padding: 3,
      color: darkTheme.textPrimary,
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      Loading parking details...
    </Box> 
  );

  return ( 
    <Box sx={{ padding: 3, maxWidth: '900px', margin: '0 auto' }}>
      <ParkingNavbar currentUser={currentUser} isAdmin={isAdmin}/>
      <Typography variant="h4" sx={{
        marginBottom: 3,
        color: darkTheme.primary,
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
        Parking Lot Details
      </Typography>

      <InfoBlock elevation={3}>
        <MapContainer id="parkingmap" />

        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocalParking color="primary" />
            <Typography variant="body1" sx={{ color: darkTheme.textPrimary }}>
              <strong>Name:</strong> {parking.name}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Person color="primary" />
            <Typography variant="body1" sx={{ color: darkTheme.textPrimary }}>
              {/* <strong>Owner:</strong> {parking.owner.name} */}
              <strong>Owner:</strong> {parking.owner.username}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOn color="primary" />
            <Typography variant="body1" sx={{ color: darkTheme.textPrimary }}>
              <strong>Location:</strong> {parking.location}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocalParking color="primary" />
            <Typography variant="body1" sx={{ color: darkTheme.textPrimary }}>
              <strong>Total Slots:</strong> {parking.totalSlots}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocalParking color={parking.availableSlots > 0 ? "success" : "error"} />
            <Typography variant="body1" sx={{ color: darkTheme.textPrimary }}>
              <strong>Available:</strong> {parking.availableSlots}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Schedule color="primary" />
            <Typography variant="body1" sx={{ color: darkTheme.textPrimary }}>
              <strong>Open Time:</strong> {parking.openTime}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Schedule color="primary" />
            <Typography variant="body1" sx={{ color: darkTheme.textPrimary }}>
              <strong>Close Time:</strong> {parking.closeTime}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AttachMoney color="primary" />
            <Typography variant="body1" sx={{ color: darkTheme.textPrimary }}>
              <strong>Rate:</strong> ₹{parking.rate}/hr
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ElectricCar color="primary" />
            <Typography variant="body1">
              <strong>EV Charging:</strong> {parking.EVCharging ? 'Yes' : 'No'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TwoWheeler color="primary" />
            <Typography variant="body1">
              <strong>Bike Wash:</strong> {parking.BikeWash ? 'Yes' : 'No'}
            </Typography>
          </Box>
        </Box>
      </InfoBlock>

      <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
        {!isAdmin && (
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={() => navigate(`/parkings/owner/${parking._id}/edit`)}
            sx={{
              color: '#fff',
              background: `linear-gradient(135deg, ${darkTheme.primary} 0%, #2a7fd9 100%)`,
              '&:hover': {
                background: `linear-gradient(135deg, #4a8fd6 0%, #2a7fd9 100%)`
              }
            }}
          >
            Update Parking
          </Button>
        )}
        <Button
          variant="contained"
          startIcon={<Delete />}
          onClick={handleDeleteParking}
          sx={{
            color: '#fff',
            background: `linear-gradient(135deg, ${darkTheme.error} 0%, #d32f2f 100%)`,
            '&:hover': {
              background: `linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)`
            }
          }}
        >
          Delete Parking
        </Button>
      </Box>

      <Typography variant="h4" sx={{
        marginBottom: 2,
        color: darkTheme.primary,
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
        Current Users
      </Typography>

      {parking.users.length > 0 ? (
        parking.users.map((userEntry) => (
          <UserCard key={userEntry.user._id}>
            <CardContent>
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Person color="primary" />
                  <Typography variant="body1" sx={{ color: darkTheme.textPrimary }}>
                    <strong>Name:</strong> {userEntry.user.username}
                    {/* <strong>Name:</strong> {userEntry.user.name} */}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email color="primary" />
                  <Typography variant="body1" sx={{ color: darkTheme.textPrimary }}>
                    <strong>Email:</strong> {userEntry.user.email}
                  </Typography>
                </Box>

                {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone color="primary" />
                  <Typography variant="body1" sx={{ color: darkTheme.textPrimary }}>
                    <strong>Phone:</strong> {userEntry.user.phone}
                  </Typography>
                </Box> */}
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<PersonRemove />}
                  onClick={() => handleRemoveUser(userEntry.user._id)}
                  sx={{
                    color: '#fff',
                    background: `linear-gradient(135deg, ${darkTheme.error} 0%, #d32f2f 100%)`,
                    '&:hover': {
                      background: `linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)`
                    }
                  }}
                >
                  Remove User
                </Button>
              </Box>
            </CardContent>
          </UserCard>
        ))
      ) : (
        <Typography variant="body1" sx={{
          color: darkTheme.textSecondary,
          textAlign: 'center',
          padding: 2
        }}>
          No users currently using this parking lot.
        </Typography>
      )}
    </Box>
  );
}

export default ParkingDetails;