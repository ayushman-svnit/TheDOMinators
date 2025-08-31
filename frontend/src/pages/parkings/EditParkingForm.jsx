import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ParkingNavbar from "../../ParkingNavbar";
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Paper,
  Container,
  useTheme
} from "@mui/material";
import {
  LocalParking,
  LocationOn,
  Schedule,
  AttachMoney,
  ElectricCar,
  TwoWheeler,
  Update
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
const FormContainer = styled(Container)({
  padding: '2rem',
  maxWidth: '600px'
});

const FormPaper = styled(Paper)({
  background: darkTheme.surface,
  padding: '2rem',
  borderRadius: '8px',
  border: `1px solid ${darkTheme.background}`,
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
});

const FormTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    color: darkTheme.textPrimary,
    backgroundColor: darkTheme.cardBackground,
    '& fieldset': {
      borderColor: darkTheme.background,
    },
    '&:hover fieldset': {
      borderColor: darkTheme.primary,
    },
    '&.Mui-focused fieldset': {
      borderColor: darkTheme.primary,
    },
  },
  '& .MuiInputLabel-root': {
    color: darkTheme.textSecondary,
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: darkTheme.primary,
  },
  marginBottom: '1rem'
});

const FeatureSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: darkTheme.success,
    '&:hover': {
      backgroundColor: 'rgba(46, 204, 113, 0.08)',
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: darkTheme.success,
  },
}));

function EditParkingForm({ currentUser }) {
  const { parkingId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const [form, setForm] = useState({
    name: "",
    location: "",
    totalSlots: 1,
    availableSlots: 1,
    openTime: "",
    closeTime: "",
    rate: 0,
    EVCharging: false,
    BikeWash: false
  });

  const [diff, setDiff] = useState(0);

  useEffect(() => {
    const fetchParkingData = async () => {
      try {
        const response = await fetch(`/api/parkings/owner/${parkingId}`, {
          credentials: "include",
        });
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch parking data");
        }

        const p = data.parking;
        setForm({
          name: p.name,
          location: p.location,
          totalSlots: p.totalSlots,
          availableSlots: p.availableSlots,
          openTime: p.openTime,
          closeTime: p.closeTime,
          rate: p.rate,
          EVCharging: p.EVCharging || false,
          BikeWash: p.BikeWash || false
        });
        setDiff(p.totalSlots - p.availableSlots);
      } catch (err) {
        console.error("Error loading parking:", err);
        alert(err.message);
      }
    };

    fetchParkingData();
  }, [parkingId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === "totalSlots") {
      const newTotal = parseInt(value);
      setForm(prev => ({
        ...prev,
        availableSlots: Math.max(0, newTotal - diff)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ensure all boolean values are properly sent
      const formData = {
        ...form,
        totalSlots: parseInt(form.totalSlots),
        availableSlots: parseInt(form.availableSlots),
        rate: parseFloat(form.rate),
        EVCharging: Boolean(form.EVCharging),
        BikeWash: Boolean(form.BikeWash)
      };

      const res = await fetch(`/api/parkings/owner/${parkingId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update parking");
      }

      navigate(`/parkings/owner/${parkingId}`);
    } catch (err) {
      console.error("Update error:", err);
      alert(err.message);
    }
  };

  return (
    <FormContainer>
      <ParkingNavbar currentUser={currentUser} isAdmin={false}/>
      <FormPaper elevation={3}>
        <Typography variant="h4" sx={{ 
          marginBottom: 3,
          color: darkTheme.primary,
          textAlign: 'center',
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '4px',
            background: darkTheme.primary,
            borderRadius: '2px',
          }
        }}>
          Edit Parking Lot
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <FormTextField
            fullWidth
            label="Parking Name"
            variant="outlined"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <LocalParking sx={{ color: darkTheme.primary, mr: 1 }} />
              ),
            }}
          />

          <FormTextField
            fullWidth
            label="Location"
            variant="outlined"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <LocationOn sx={{ color: darkTheme.primary, mr: 1 }} />
              ),
            }}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormTextField
              fullWidth
              label="Total Slots"
              variant="outlined"
              type="number"
              name="totalSlots"
              value={form.totalSlots}
              onChange={handleChange}
              inputProps={{ min: diff }}
              required
            />

            <FormTextField
              fullWidth
              label="Available Slots"
              variant="outlined"
              type="number"
              name="availableSlots"
              value={form.availableSlots}
              onChange={handleChange}
              inputProps={{ max: form.totalSlots - diff }}
              required
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormTextField
              fullWidth
              label="Open Time"
              variant="outlined"
              type="time"
              name="openTime"
              value={form.openTime}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
              InputProps={{
                startAdornment: (
                  <Schedule sx={{ color: darkTheme.primary, mr: 1 }} />
                ),
              }}
            />

            <FormTextField
              fullWidth
              label="Close Time"
              variant="outlined"
              type="time"
              name="closeTime"
              value={form.closeTime}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
              InputProps={{
                startAdornment: (
                  <Schedule sx={{ color: darkTheme.primary, mr: 1 }} />
                ),
              }}
            />
          </Box>

          <FormTextField
            fullWidth
            label="Rate per Slot (₹)"
            variant="outlined"
            type="number"
            name="rate"
            value={form.rate}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <AttachMoney sx={{ color: darkTheme.primary, mr: 1 }} />
              ),
            }}
          />

          <Box sx={{ 
            display: 'flex', 
            gap: 2,
            mb: 2,
            padding: '16px',
            borderRadius: '4px',
            backgroundColor: darkTheme.cardBackground
          }}>
            <FormControlLabel
              control={
                <FeatureSwitch
                  checked={form.EVCharging}
                  onChange={handleChange}
                  name="EVCharging"
                  color="success"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ElectricCar color={form.EVCharging ? "success" : "inherit"} />
                  <Typography color={form.EVCharging ? "success" : darkTheme.textPrimary}>
                    EV Charging
                  </Typography>
                </Box>
              }
            />

            <FormControlLabel
              control={
                <FeatureSwitch
                  checked={form.BikeWash}
                  onChange={handleChange}
                  name="BikeWash"
                  color="success"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TwoWheeler color={form.BikeWash ? "success" : "inherit"} />
                  <Typography color={form.BikeWash ? "success" : darkTheme.textPrimary}>
                    Bike Wash
                  </Typography>
                </Box>
              }
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            startIcon={<Update />}
            sx={{
              color: '#fff',
              borderRadius: '4px',
              padding: '12px',
              fontWeight: 600,
              background: `linear-gradient(135deg, ${darkTheme.success} 0%, #27ae60 100%)`,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                background: `linear-gradient(135deg, #27ae60 0%, #219653 100%)`,
                boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)',
                transform: 'translateY(-1px)'
              },
              '&:active': {
                transform: 'scale(0.98)'
              },
              transition: 'all 0.2s ease',
              marginTop: '1rem'
            }}
          >
            Update Parking
          </Button>
        </Box>
      </FormPaper>
    </FormContainer>
  );
}

export default EditParkingForm;