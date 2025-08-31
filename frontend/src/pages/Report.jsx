import React, { useState } from "react";
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  useTheme
} from "@mui/material";
import { Report as ReportIcon, Close } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

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
  marginBottom: '1.5rem'
});

export default function Report({ user }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    reportedUser: '',
    comment: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/report', {...formData, username: user.username }, {
        withCredentials: true
    })
    setFormData({
        reportedUser: '',
        comment: ''
      });
console.log("Report submitted successfully");
navigate('/');
console.log("Should have navigated");
    } catch(err) {
      console.error('Error submitting report', err);
    }
  }

  return (
    <FormContainer>
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
          Report a User
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <FormTextField
            fullWidth
            label="Username"
            variant="outlined"
            name="reportedUser"
            placeholder="Enter a username"
            value={formData.reportedUser}
            onChange={handleChange}
            required
          />

          <FormTextField
            fullWidth
            label="Issue Description"
            variant="outlined"
            name="comment"
            placeholder="Give details about your issue"
            multiline
            rows={4}
            value={formData.comment}
            onChange={handleChange}
            required
          />

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '2rem'
          }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<ReportIcon />}
              sx={{
                color: '#fff',
                borderRadius: '4px',
                padding: '10px 24px',
                fontWeight: 600,
                background: `linear-gradient(135deg, ${darkTheme.error} 0%, #c0392b 100%)`,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  background: `linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)`,
                  boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)',
                  transform: 'translateY(-1px)'
                },
                '&:active': {
                  transform: 'scale(0.98)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              Submit Report
            </Button>

            <Button
              variant="text"
              size="large"
              onClick={() => navigate('/')}
              startIcon={<Close />}
              sx={{
                color: darkTheme.textSecondary,
                fontWeight: 600,
                '&:hover': {
                  color: darkTheme.error,
                  backgroundColor: 'transparent'
                }
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </FormPaper>
    </FormContainer>
  );
}