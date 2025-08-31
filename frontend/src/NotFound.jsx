import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      gap: 3,
      background: 'linear-gradient(135deg, #1e1e1e 0%, #252526 100%)',
      p: 4,
      borderRadius: 4,
      border: '1px solid #333',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
    }}>
      <Typography variant="h1" sx={{ 
        fontSize: '6rem', 
        fontWeight: 700,
        background: 'linear-gradient(135deg, #4DA6FF 0%, #00FFA3 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        404
      </Typography>
      <Typography variant="h4" sx={{ color: '#4DA6FF' }}>
        Page Not Found
      </Typography>
    </Box>
  );
}