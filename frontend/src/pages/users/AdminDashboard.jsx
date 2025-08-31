// import { useEffect, useState } from "react";
// import axios from "axios";

// const AdminDashboard = () => {
//   const [parkingStats, setParkingStats] = useState({ totalParkingSpots: 0, totalUniqueOwners: 0 });
//   const [stopCount, setStopCount] = useState(0);
//   const [userStats, setUserStats] = useState({ banned: 0, notBanned: 0 });
//   const [totalVisits, setTotalVisits] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Parking stats
//         const parkingRes = await axios.get("/api/visits/parking");
//         setParkingStats(parkingRes.data);

//         // Stop count
//         const stopRes = await axios.get("/api/visits/stop");
//         setStopCount(stopRes.data.totalStops);

//         // User stats
//         const userRes = await axios.get("/api/visits/user");
//         setUserStats(userRes.data);

//         // Total visits
//         const visitRes = await axios.get("/api/visits");
//         setTotalVisits(visitRes.data.visits);

//       } catch (err) {
//         console.error("Error fetching dashboard data:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h2>📊 Dashboard Stats</h2>

//       <div>
//         <h3>Parking</h3>
//         <p>Total Parking Spots: {parkingStats.totalParkingSpots}</p>
//         <p>Unique Owners: {parkingStats.totalUniqueOwners}</p>
//       </div>

//       <div>
//         <h3>Stops</h3>
//         <p>Total Bus Stops: {stopCount}</p>
//       </div>

//       <div>
//         <h3>Users</h3>
//         <p>Banned Users: {userStats.banned}</p>
//         <p>Active Users: {userStats.notBanned}</p>
//       </div>

//       <div>
//         <h3>Site Visits</h3>
//         <p>Total Visits: {totalVisits}</p>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import { useEffect, useState } from "react";
import axios from "axios";
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Skeleton,
  useTheme 
} from "@mui/material";
import {
  LocalParking as ParkingIcon,
  People as PeopleIcon,
  DirectionsBus as BusIcon,
  Gavel as BannedIcon,
  HowToReg as ActiveUsersIcon,
  BarChart as VisitsIcon
} from "@mui/icons-material";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar, PolarArea, Doughnut } from 'react-chartjs-2';
ChartJS.register(...registerables);

const AdminDashboard = () => {
  const theme = useTheme();
  const [stats, setStats] = useState({
    parking: { totalSpots: 0, uniqueOwners: 0 },
    stops: 0,
    users: { banned: 0, active: 0 },
    visits: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [parkingRes, stopsRes, usersRes, visitsRes] = await Promise.all([
          axios.get("/api/visits/parking"),
          axios.get("/api/visits/stop"),
          axios.get("/api/visits/user"),
          axios.get("/api/visits")
        ]);

        setStats({
          parking: {
            totalSpots: parkingRes.data.totalParkingSpots,
            uniqueOwners: parkingRes.data.totalUniqueOwners
          },
          stops: stopsRes.data.totalStops,
          users: {
            banned: usersRes.data.banned,
            active: usersRes.data.notBanned
          },
          visits: visitsRes.data.visits
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Chart data configurations
  const visitsChartData = {
    labels: ['Total Visits', 'Active Users'],
    datasets: [{
      label: 'Count',
      data: [stats.visits, stats.users.active],
      backgroundColor: [
        theme.palette.primary.main,
        theme.palette.secondary.main
      ],
      borderColor: [
        theme.palette.primary.dark,
        theme.palette.secondary.dark
      ],
      borderWidth: 1
    }]
  };

  const userDistributionData = {
    labels: ['Banned Users', 'Active Users', 'Parking Owners'],
    datasets: [{
      data: [stats.users.banned, stats.users.active, stats.parking.uniqueOwners],
      backgroundColor: [
        theme.palette.error.main,
        theme.palette.success.main,
        theme.palette.warning.main
      ],
      borderWidth: 1
    }]
  };

  const locationData = {
    labels: ['Parking Spots', 'Bus Stops'],
    datasets: [{
      data: [stats.parking.totalSpots, stats.stops],
      backgroundColor: [
        theme.palette.info.main,
        theme.palette.primary.light
      ],
      borderWidth: 1
    }]
  };

  const StatCard = ({ icon, title, value, loading }) => (
    <Card 
      sx={{ 
        height: '180px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: theme.shadows[6]
        },
        animation: loading ? 'pulse 1.5s infinite' : 'fadeIn 0.5s ease'
      }}
    >
      <CardContent sx={{ 
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{
            p: 2,
            borderRadius: '50%',
            bgcolor: theme.palette.background.paper,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {icon}
          </Box>
          <Typography variant="subtitle2" color="textSecondary">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" sx={{ mt: 2 }}>
          {loading ? <Skeleton width={60} /> : value}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ 
      p: 3,
      maxWidth: '100%',
      margin: '0 auto'
    }}>
      <Typography variant="h4" gutterBottom sx={{ 
        mb: 4, 
        fontWeight: 700,
        color: theme.palette.text.primary
      }}>
        📊 Dashboard Overview
      </Typography>

      {/* Stats Cards - Perfectly aligned rectangle */}
      <Box sx={{ 
        width: '100%',
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(3, 1fr)',
          lg: 'repeat(6, 1fr)'
        },
        gap: 3,
        mb: 4
      }}>
        <StatCard 
          icon={<ParkingIcon color="primary" fontSize="large" />}
          title="Parking Spots"
          value={stats.parking.totalSpots}
          loading={loading}
        />
        <StatCard 
          icon={<PeopleIcon color="secondary" fontSize="large" />}
          title="Parking Owners"
          value={stats.parking.uniqueOwners}
          loading={loading}
        />
        <StatCard 
          icon={<BusIcon color="info" fontSize="large" />}
          title="Bus Stops"
          value={stats.stops}
          loading={loading}
        />
        <StatCard 
          icon={<BannedIcon color="error" fontSize="large" />}
          title="Banned Users"
          value={stats.users.banned}
          loading={loading}
        />
        <StatCard 
          icon={<ActiveUsersIcon color="success" fontSize="large" />}
          title="Active Users"
          value={stats.users.active}
          loading={loading}
        />
        <StatCard 
          icon={<VisitsIcon color="warning" fontSize="large" />}
          title="Total Visits"
          value={stats.visits}
          loading={loading}
        />
      </Box>

      {/* Charts Row - Equal height and width */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: 'repeat(3, 1fr)'
        },
        gap: 3,
        '& > *': {
          height: '400px'
        }
      }}>
        <Card>
          <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Traffic & Active Users
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <Bar 
                data={visitsChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: { mode: 'index' }
                  }
                }}
              />
            </Box>
          </CardContent>
        </Card>
        <Card>
          <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              User Distribution
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <PolarArea 
                data={userDistributionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'bottom' }
                  }
                }}
              />
            </Box>
          </CardContent>
        </Card>
        <Card>
          <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Locations Overview
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <Doughnut 
                data={locationData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'bottom' }
                  }
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 0.3; }
          100% { opacity: 0.6; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
};

export default AdminDashboard;
