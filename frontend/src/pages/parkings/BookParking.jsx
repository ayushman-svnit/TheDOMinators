import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ParkingNavbar from "../../ParkingNavbar";
import {
  Box,
  Typography,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  useTheme
} from "@mui/material";
import {
  DirectionsCar,
  TwoWheeler,
  LocalTaxi,
  LocationOn,
  LocalParking,
  Schedule,
  AttachMoney,
  ElectricCar,
  Person,
  Phone,
  Email
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Dark theme colors
const darkTheme = {
  background: '#0d1117',
  surface: '#161a20',
  primary: '#569cd6',
  secondary: '#9cdcfe',
  textPrimary: '#9ba3b4',
  textSecondary: '#858585',
  accent: '#4ec9b0',
  error: '#f48771',
  warning: '#dcdcaa',
  success: '#608b4e'
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
  padding: '20px',
  marginBottom: '24px',
  borderRadius: '8px',
  border: `1px solid ${darkTheme.background}`,
});

const FormSelect = styled(Select)({
  background: darkTheme.surface,
  color: darkTheme.textPrimary,
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: darkTheme.background,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: darkTheme.primary,
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: darkTheme.primary,
  },
});

function BookParking({ currentUser }) {
  const { parkingId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const [parking, setParking] = useState(null);
  const [vehicle, setVehicle] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetch(`/api/parkings/user/${parkingId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setParking(data.parking))
      .catch((err) => console.error("Error loading parking:", err));
  }, [parkingId]);

  useEffect(() => {
    if (!parking || !window.maptilersdk || !parking.geometry) return;

    window.maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

    const map = new window.maptilersdk.Map({
      container: "bookmap",
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

  const handleVehicleChange = (e) => {
    const v = e.target.value;
    setVehicle(v);

    const rate = parking.rate;
    const multiplier = v === "car" ? 4 : v === "auto" ? 2 : 1;
    setPrice(rate * multiplier);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/parkings/user/${parkingId}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicle }),
      });

      if (!res.ok) throw new Error("Booking failed");

      navigate("/parkings/user");
    } catch (err) {
      alert(err.message);
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
    <Box sx={{
      padding: 3,
      maxWidth: '800px',
      margin: '0 auto',
      color: darkTheme.textPrimary
    }}>
      <ParkingNavbar currentUser={currentUser} isAdmin={false}/>
      <Typography variant="h4" sx={{
        marginBottom: 3,
        position: 'relative',
        color: darkTheme.primary,
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
        <MapContainer id="bookmap" />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DirectionsCar color="primary" />
            <Typography variant="body1">
              <strong>Name:</strong> {parking.name}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOn color="primary" />
            <Typography variant="body1">
              <strong>Location:</strong> {parking.location}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocalParking color="primary" />
            <Typography variant="body1">
              <strong>Total Slots:</strong> {parking.totalSlots}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocalParking color={parking.availableSlots > 0 ? "success" : "error"} />
            <Typography variant="body1">
              <strong>Available:</strong> {parking.availableSlots}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Schedule color="primary" />
            <Typography variant="body1">
              <strong>Open:</strong> {parking.openTime}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Schedule color="primary" />
            <Typography variant="body1">
              <strong>Close:</strong> {parking.closeTime}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AttachMoney color="primary" />
            <Typography variant="body1">
              <strong>Rate:</strong> ₹{price !== 0 ? price : parking.rate}/hr
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ElectricCar color="primary"/>
            <Typography variant="body1">
              <strong>EV Charging:</strong> {parking.EVCharging ? 'Yes' : 'No'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TwoWheeler color="primary"/>
            <Typography variant="body1">
              <strong>Bike Wash:</strong> {parking.BikeWash ? 'Yes' : 'No'}
            </Typography>
          </Box>
        </Box>
      </InfoBlock>

      <Typography variant="h4" sx={{
        marginBottom: 3,
        position: 'relative',
        color: darkTheme.primary,
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
        Contact Owner
      </Typography>

      <InfoBlock elevation={3}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Person color="primary" />
            <Typography variant="body1">
              {/* <strong>Name:</strong> {parking.owner.name} */}
              <strong>Name:</strong> {parking.owner.username}
            </Typography>
          </Box>

          {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Phone color="primary" />
            <Typography variant="body1">
              <strong>Phone:</strong> {parking.owner.phone}
            </Typography>
          </Box> */}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Email color="primary" />
            <Typography variant="body1">
              <strong>Email:</strong> {parking.owner.email}
            </Typography>
          </Box>
        </Box>
      </InfoBlock>

      <Typography variant="h4" sx={{
        marginBottom: 3,
        position: 'relative',
        color: darkTheme.primary,
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
        Booking
      </Typography>

      <InfoBlock elevation={3}>
        {parking.availableSlots === 0 && <p style={{color: darkTheme.textPrimary}}>Sorry! The parking is filled now, please come later</p>}
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ marginBottom: 3 }}>
            <InputLabel id="vehicle-label" sx={{ color: darkTheme.textPrimary }}>
              Vehicle Type
            </InputLabel>
            <FormSelect
              labelId="vehicle-label"
              id="vehicle"
              value={vehicle}
              label="Vehicle Type"
              onChange={handleVehicleChange}
              required
            >
              <MenuItem value="" disabled>
                <em>Select One</em>
              </MenuItem>
              {parking.availableSlots >= 1 && <MenuItem value="bike"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TwoWheeler /> Bike
                </Box></MenuItem>}
              {parking.availableSlots >= 2 && <MenuItem value="auto"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalTaxi /> Auto
                </Box></MenuItem>}
              {parking.availableSlots >= 4 && <MenuItem value="car"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <DirectionsCar /> Car
                </Box></MenuItem>}
            </FormSelect>
          </FormControl>

          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            marginBottom: 3
          }}>
            <Typography variant="h6" sx={{ color: darkTheme.textPrimary }}>
              Amount to Pay:
            </Typography>
            <Chip
              label={`₹${price.toFixed(2)}`}
              color="primary"
              variant="outlined"
              sx={{
                fontSize: '1.1rem',
                padding: '5px 10px',
                borderColor: darkTheme.primary,
                color: darkTheme.primary
              }}
            />
          </Box>
          <Button
            disabled={parking.availableSlots == 0}
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{
              color: '#fff',
              borderRadius: '4px',
              padding: '10px',
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
          >
            Confirm Booking
          </Button>
        </form>
      </InfoBlock>
    </Box>
  );
}

export default BookParking;