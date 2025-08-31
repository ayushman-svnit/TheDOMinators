import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  useTheme
} from "@mui/material";
import {
  Person,
  Email,
  Phone,
  PersonRemove
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

const RemoveButton = styled(Button)({
  color: '#fff',
  background: `linear-gradient(135deg, ${darkTheme.error} 0%, #d32f2f 100%)`,
  borderRadius: '4px',
  textTransform: 'none',
  marginTop: '16px',
  '&:hover': {
    background: `linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)`
  }
});

const AdminParkingUserDashboard = () => {
  const [parkingusers, setParkingUsers] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchParkingUsers = async () => {
      try {
        const response = await fetch("/api/admin/parkingusers", {
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch parking users");
        }
        console.log('parkingusers', data.parkingusers)
        setParkingUsers(data.parkingusers);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchParkingUsers();
  }, []);

  const onRemove = async (id) => {
    try {
      await fetch(`/api/admin/parkingusers/${id}`, {
        method: "DELETE",
        credentials: 'include'
      });
      const response = await fetch("/api/admin/parkingusers", {
        credentials: "include",
      });
      const data = await response.json();
      setParkingUsers(data.parkingusers);
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
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
        All Parking Users
      </Typography>

      {parkingusers.length > 0 ? (
        parkingusers.map((parkinguser) => (
          <UserCard key={parkinguser._id}>
            <CardContent>
              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Person color="primary" />
                  <Typography variant="body1" sx={{ color: darkTheme.textPrimary }}>
                    <strong>Name:</strong> {parkinguser.user.username}
                    {/* <strong>Name:</strong> {parkinguser.user.name} */}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email color="primary" />
                  <Typography variant="body1" sx={{ color: darkTheme.textPrimary }}>
                    <strong>Email:</strong> {parkinguser.user.email}
                  </Typography>
                </Box>
                
                {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone color="primary" />
                  <Typography variant="body1" sx={{ color: darkTheme.textPrimary }}>
                    <strong>Phone:</strong> {parkinguser.user.phone}
                  </Typography>
                </Box> */}
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-start'}}>
                <RemoveButton
                  variant="contained"
                  startIcon={<PersonRemove />}
                  onClick={() => onRemove(parkinguser._id)}
                >
                  Remove User
                </RemoveButton>
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
          No parking users found.
        </Typography>
      )}
    </Box>
  );
};

export default AdminParkingUserDashboard;