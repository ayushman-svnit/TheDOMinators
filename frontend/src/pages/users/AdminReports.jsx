import { useState, useEffect } from "react";
import axios from 'axios'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip
} from "@mui/material";
import {
  Person,
  Report,
  PersonRemove,
  Gavel,
  Block
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
const ReportCard = styled(Card)({
  background: darkTheme.cardBackground,
  marginBottom: '16px',
  border: `1px solid ${darkTheme.error}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 6px 12px rgba(244, 135, 113, 0.2)`,
    borderColor: darkTheme.error
  }
});

const BanButton = styled(Button)({
  color: '#fff',
  background: `linear-gradient(135deg, ${darkTheme.error} 0%, #d32f2f 100%)`,
  borderRadius: '4px',
  textTransform: 'none',
  marginTop: '16px',
  '&:hover': {
    background: `linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)`
  }
});

const AdminReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReportedUsers = async () => {
      try {
        const { data } = await axios.get('/api/admin/reports', {
            withCredentials: true
        })
        if(data.reports) {
            setReports(data.reports);
        } else {
            console.error(data.message);
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchReportedUsers();
  }, []);

  const handleBanUser = async (report) => {
    try {
      await axios.post(`/api/admin/ban`, report, {
        withCredentials: true
      });
      // Refresh the list after banning
      const { data } = await axios.get("/api/admin/reports", {
        withCredentials: true
      })
      setReports(data.reports);
    } catch (err) {
      console.error("Failed to ban user", err);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ 
        marginBottom: 3,
        color: darkTheme.error,
        position: 'relative',
        '&:after': {
          content: '""',
          position: 'absolute',
          bottom: '-10px',
          left: 0,
          width: '80px',
          height: '4px',
          background: darkTheme.error,
          borderRadius: '2px',
        }
      }}>
        Reported Users
      </Typography>

      {reports.length > 0 ? (
        reports.map((report) => (
          <ReportCard key={report._id}>
            <CardContent>
              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2,
                marginBottom: 2
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Person color="error" />
                  <Typography variant="body1" sx={{ color: darkTheme.textPrimary }}>
                    <strong>Reported By:</strong> {report.username}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Report color="error" />
                  <Typography variant="body1" sx={{ color: darkTheme.textPrimary }}>
                    <strong>Reported User:</strong> {report.reportedUser}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ 
                backgroundColor: darkTheme.surface,
                padding: 2,
                borderRadius: 1,
                marginBottom: 2
              }}>
                <Typography variant="subtitle2" sx={{ 
                  color: darkTheme.textSecondary,
                  marginBottom: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <Gavel color="warning" /> <span>Report Details</span>
                </Typography>
                <Typography variant="body2" sx={{ color: darkTheme.textPrimary }}>
                  {report.comment}
                </Typography>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Chip 
                  icon={<Block color="error" />}
                  label="Reported User"
                  color="error"
                  variant="outlined"
                />
                
                <BanButton
                  variant="contained"
                  startIcon={<PersonRemove />}
                  onClick={() => handleBanUser(report)}
                >
                  Ban User
                </BanButton>
              </Box>
            </CardContent>
          </ReportCard>
        ))
      ) : (
        <Typography variant="body1" sx={{ 
          color: darkTheme.textSecondary,
          textAlign: 'center',
          padding: 2
        }}>
          No user reports found.
        </Typography>
      )}
    </Box>
  );
};

export default AdminReports;