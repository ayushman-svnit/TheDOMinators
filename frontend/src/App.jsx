import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
// import { useAuth } from "./context/AuthContext";
// import { AuthProvider } from "./context/AuthContext"; 
import { ThemeProvider as CustomThemeProvider } from "./context/ThemeContext";
import { Box, CircularProgress, CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer/Footer";
import ChatBot from "./components/user/ChatBot/ChatBot";
import Combii from "./components/Calculator/Combii";
import UserBusStopMarkers from "./components/user/BusStopMarkers/UserBusStopMarkers";
import AdminBusStopMarkers from "./components/admin/BusStopMarkers/AdminBusStopMarkers";
import AuthPage from "./pages/AuthPage";
import PasswordRecovery from "./pages/PasswordRecovery";
import PostRidePage from "./pages/PostRidePage";
import CarpoolHomePage from "./pages/CP";
import SearchRidePage from "./pages/SearchRidePage";
import PostedRidesPage from "./pages/PostedRidesPage";
import RideHistoryPage from "./pages/RideHistoryPage";
import BookedRidesPage from "./pages/BookedRidesPage";
import SentRequestsPage from "./pages/SentRequestsPage";
import ReceivedRequestsPage from "./pages/ReceivedRequestsPage";
import GetRatingsPage from "./pages/GetRatingsPage";
import GetYourChats from "./pages/GetYourChats";
import ChatRidesPage from "./pages/chatRidesPage";
import NavbarFeat from "./components/NavbarFeat/NavbarFeat";
import FutureTransport from "./pages/FutureTransport";
import Report from "./pages/Report";
import AnnouncementsPage from "./pages/AnnouncementsPage";

// User Pages
import UserDashboard from "./pages/parkings/UserDashboard";
import BookParking from "./pages/parkings/BookParking";

// Owner Pages
import OwnerDashboard from "./pages/parkings/OwnerDashboard";
import NewParkingForm from "./pages/parkings/NewParkingForm";
import EditParkingForm from "./pages/parkings/EditParkingForm";
import ParkingDetails from "./pages/parkings/ParkingDetails";

// Role Selection
import LandingPage from "./pages/parkings/LandingPage";

// Admin
import AdminLogin from "./pages/users/AdminLogin";
import AdminSidebar from "./pages/users/AdminSidebar";
import AdminDashboard from "./pages/users/AdminDashboard";
import AdminParkingUserDashboard from "./pages/users/AdminParkingUserDashboard";
import AdminReports from "./pages/users/AdminReports";
import AdminMessages from "./pages/users/AdminMessages";
import AdminRatings from "./pages/users/AdminRatings";
import AdminRequests from "./pages/users/AdminRequests";
import AdminRides from "./pages/users/AdminRides";
import AdminAnnouncements from "./pages/users/AdminAnnouncements";

// 404 Page
import NotFound from "./NotFound";

import darkTheme from './utils/theme';

// Fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function AppWrapper() {
  // const { currentUser, isAdmin } = useAuth();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [expanded, setExpanded] = useState(false);
  const isAdminPath = location.pathname.startsWith('/admin');
  useEffect(() => {
    // const calcVisits = async () => {
    //   try {
    //     await axios.post("/api/visits");
    //   } catch (err) {
    //     console.error("Error recording visit:", err);
    //   }
    // };
    // calcVisits();
    const fetchUser = async () => {
      if (!token) {
        setUser(null);
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }
      try {
        const res = await axios.get("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        setIsAdmin(res.data.isAdmin);
      } catch (err) {
        setUser(null);
        setIsAdmin(false);
        localStorage.removeItem("token");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Show Navbar only on homepage */}
      {isAdmin && isAdminPath ? "" : location.pathname === "/" ? (
        <Navbar user={user} setUser={setUser} setIsAdmin={setIsAdmin} isAdmin={isAdmin} setToken={setToken} />
      ) : (
        <NavbarFeat user={user} setUser={setUser} setIsAdmin={setIsAdmin} isAdmin={isAdmin} setToken={setToken} />
      )}
      {isAdmin && isAdminPath ? "" : <ChatBot />}
      <ThemeProvider theme={darkTheme}>
        {isAdmin && isAdminPath ? <AdminSidebar setIsAdmin={setIsAdmin} setUser={setUser} setToken={setToken} expanded={expanded} setExpanded={setExpanded} /> : ""}
      </ThemeProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/route-calculator" element={<Combii />} />
        <Route path="/bus-info" element={<UserBusStopMarkers />} />
        <Route
          path="/login"
          element={
            user || isAdmin ? (
              <Navigate to="/" />
            ) : (
              <AuthPage authType="login" setUser={setUser} setIsAdmin={setIsAdmin} setToken={setToken} />
            )
          }
        />
        <Route
          path="/register"
          element={
            user || isAdmin ? (
              <Navigate to="/" />
            ) : (
              <AuthPage authType="register" setUser={setUser} setIsAdmin={setIsAdmin} setToken={setToken} />
            )
          }
        />
        <Route
          path="/forgot-password"
          element={
            user || isAdmin ? <Navigate to="/" /> : <PasswordRecovery setUser={setUser} setIsAdmin={setIsAdmin} setToken={setToken} />
          }
        />
        <Route
          path="/post-ride"
          element={user || isAdmin ? <PostRidePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/car-pooling"
          element={user || isAdmin ? <CarpoolHomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/search-ride"
          element={user || isAdmin ? <SearchRidePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/posted-rides"
          element={user || isAdmin ? <PostedRidesPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/ride-history"
          element={user || isAdmin ? <RideHistoryPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/booked-rides"
          element={user || isAdmin ? <BookedRidesPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/sent-requests"
          element={user || isAdmin ? <SentRequestsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/received-requests"
          element={user || isAdmin ? <ReceivedRequestsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/get-ratings"
          element={user || isAdmin ? <GetRatingsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/chat-rides"
          element={user || isAdmin ? <ChatRidesPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/future-transport"
          element={user || isAdmin ? <FutureTransport /> : <Navigate to="/login" />}
        />

        <Route
          path="/announcements"
          element={user ? <AnnouncementsPage /> : <AnnouncementsPage />}
        />

        <Route
          path="/chats"
          element={user || isAdmin ? <GetYourChats /> : <Navigate to="/login" />}
        >
          <Route path=":chatId" element={<GetYourChats />} />


        </Route>

        <Route
          path="/reports/"
          element={<MuiThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box component="main"
              sx={{
                minHeight: 'calc(100vh - 64px)',
                padding: { xs: '16px', md: '24px' },
                background: darkTheme.palette.background.default,
                color: darkTheme.palette.text.primary,
              }}>

              {user || isAdmin ? <Report user={user} /> : <Navigate to="/" />}
            </Box>
          </MuiThemeProvider>
          }
        />

        <Route
          path="/parkings/*"
          element={
            <MuiThemeProvider theme={darkTheme}>
              <CssBaseline />
              <Box component="main"
                sx={{
                  minHeight: 'calc(100vh - 64px)',
                  padding: { xs: '16px', md: '24px' },
                  background: darkTheme.palette.background.default,
                  color: darkTheme.palette.text.primary,
                  ml: isAdmin ? (expanded ? '250px' : '64px') : 0
                }}>
                <Routes>
                  <Route path="" element={<LandingPage currentUser={user} isAdmin={isAdmin} />} />
                  {/* User Flow */}
                  <Route
                    path="user"
                    element={user ? <UserDashboard currentUser={user} /> : <Navigate to="/login" />}
                  />
                  <Route
                    path="user/:parkingId"
                    element={user ? <BookParking currentUser={user} /> : <Navigate to="/login" />}
                  />

                  {/* Owner Flow */}
                  <Route
                    path="owner"
                    element={user ? <OwnerDashboard currentUser={user} /> : <Navigate to="/login" />}
                  />
                  <Route
                    path="owner/new"
                    element={user ? <NewParkingForm currentUser={user} /> : <Navigate to="/login" />}
                  />
                  <Route
                    path="owner/:parkingId"
                    element={user || isAdmin ? <ParkingDetails currentUser={user} isAdmin={isAdmin} /> : <Navigate to="/login" />}
                  />
                  <Route
                    path="owner/:parkingId/edit"
                    element={user ? <EditParkingForm currentUser={user} /> : <Navigate to="/login" />}
                  />
                </Routes>
              </Box>
            </MuiThemeProvider>
          }
        />
        {/* <Route path="admin/stops" element={isAdmin ? <AdminBusStopMarkers /> : <Navigate to="/login" />} /> */}
        <Route
          path="/admin/*"
          element={
            <MuiThemeProvider theme={darkTheme}>
              <CssBaseline />
              <Box component="main"
                sx={{
                  minHeight: 'calc(100vh - 64px)',
                  padding: { xs: '16px', md: '24px' },
                  background: darkTheme.palette.background.default,
                  color: darkTheme.palette.text.primary,
                  ml: expanded ? '250px' : '64px'
                }}>
                <Routes>
                  <Route path="" element={isAdmin ? <Navigate to="/admin/dashboard" /> : <NotFound />} />
                  <Route path="login" element={<AdminLogin setIsAdmin={setIsAdmin} setToken={setToken} setUser={setUser} />} />
                  <Route path="dashboard" element={isAdmin ? <AdminDashboard setIsAdmin={setIsAdmin} setToken={setToken} /> : <NotFound />} />
                  {/* Admin Flow */}
                  <Route path="parkingusers" element={isAdmin ? <AdminParkingUserDashboard /> : <NotFound />} />
                  <Route path="reports" element={isAdmin ? <AdminReports /> : <NotFound />} />
                  <Route path="stops" element={isAdmin ? <AdminBusStopMarkers /> : <NotFound />} />
                  <Route path="messages" element={isAdmin ? <AdminMessages /> : <NotFound />} />
                  <Route path="ratings" element={isAdmin ? <AdminRatings /> : <NotFound />} />
                  <Route path="requests" element={isAdmin ? <AdminRequests /> : <NotFound />} />
                  <Route path="rides" element={isAdmin ? <AdminRides /> : <NotFound />} />
                  <Route path="parkings" element={<LandingPage currentUser={user} isAdmin={isAdmin} />} />
                  <Route path="announcements" element={<AdminAnnouncements/>} />
                  {/* User Flow */}
                  <Route
                    path="parkings/owner/:parkingId"
                    element={user || isAdmin ? <ParkingDetails currentUser={user} isAdmin={isAdmin} /> : <NotFound />}
                  />
                </Routes>
              </Box>
            </MuiThemeProvider>
          }
        />
        <Route
          path="*"
          element={
            <MuiThemeProvider theme={darkTheme}>
              <CssBaseline />
              <NotFound />
            </MuiThemeProvider>
          }
        />
      </Routes>
      {isAdmin && isAdminPath ? "" : <Footer />}
    </div>
  );
}

function App() {
  return (
    <CustomThemeProvider>
      <Router>
        <AppWrapper />
      </Router>
    </CustomThemeProvider>
  );
}
export default App;