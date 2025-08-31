import { Link } from "react-router-dom";
// import { useAuth } from "./context/AuthContext";
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography,
  useTheme
} from "@mui/material";
import { 
  Home,
  LocalParking,
  Person,
  AdminPanelSettings,
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
  success: '#2ecc71'
};

// Styled components
const NavLink = styled(Link)({
  color: darkTheme.textPrimary,
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 12px',
  borderRadius: '4px',
  transition: 'all 0.2s ease',
  '&:hover': {
    color: darkTheme.primary,
    backgroundColor: 'rgba(86, 156, 214, 0.1)',
    textDecoration: 'none'
  }
});

function ParkingNavbar({ currentUser, isAdmin }) {
  // const { currentUser, isAdmin } = useAuth();
  const theme = useTheme();

  return (
    <AppBar position="static" sx={{ 
      background: darkTheme.surface,
      borderBottom: `1px solid ${darkTheme.background}`,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
      marginBottom: '5px'
    }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <NavLink to="/parkings">
            <Home fontSize="small" />
            <Typography variant="body1">Home</Typography>
          </NavLink>
          
          {currentUser && (
            <NavLink to="/parkings/user">
              <LocalParking fontSize="small" />
              <Typography variant="body1">Book</Typography>
            </NavLink>
          )}
          
          {currentUser && (
            <NavLink to="/parkings/owner">
              <Person fontSize="small" />
              <Typography variant="body1">Owner</Typography>
            </NavLink>
          )}
          
          {isAdmin && (
            <NavLink to="/admin/dashboard">
              <AdminPanelSettings fontSize="small" />
              <Typography variant="body1">Admin</Typography>
            </NavLink>
          )}
        </Box>

        {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {(!currentUser && !isAdmin) ? (
            <>
              <NavLink to="/login">
                <Login fontSize="small" />
                <Typography variant="body1">Login</Typography>
              </NavLink>
              <NavLink to="/register">
                <HowToReg fontSize="small" />
                <Typography variant="body1">Register</Typography>
              </NavLink>
            </>
          ) : (
            <Button
              variant="contained"
              startIcon={<Logout fontSize="small" />}
              onClick={logout}
              sx={{
                color: '#fff',
                background: `linear-gradient(135deg, ${darkTheme.error} 0%, #d32f2f 100%)`,
                borderRadius: '4px',
                textTransform: 'none',
                '&:hover': {
                  background: `linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)`
                }
              }}
            >
              Logout
            </Button>
          )}
        </Box> */}
      </Toolbar>
    </AppBar>
  );
}

export default ParkingNavbar;