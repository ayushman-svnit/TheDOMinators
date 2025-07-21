

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import Footer from './components/Footer/Footer';
import ChatBot from './components/ChatBot/ChatBot';
import Combii from './components/Calculator/Combii';
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
function AppWrapper() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get("/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch (err) {
          localStorage.removeItem("token");
        }
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);

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
{location.pathname === "/" 
  ? <Navbar user={user} setUser={setUser} /> 
  : <NavbarFeat user={user} setUser={setUser} />}
      <ChatBot />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/route-calculator" element={<Combii />} />
        <Route 
          path="/login" 
          element={user ? <Navigate to="/" /> : <AuthPage authType="login" setUser={setUser} />} 
        />
        <Route 
          path="/register" 
          element={user ? <Navigate to="/" /> : <AuthPage authType="register" setUser={setUser} />} 
        />
        <Route 
          path="/forgot-password" 
          element={user ? <Navigate to="/" /> : <PasswordRecovery setUser={setUser} />} 
        />
                    <Route path="/post-ride" element={user ? <PostRidePage /> : <Navigate to="/login" />} />
            <Route path="/car-pooling" element={user ? <CarpoolHomePage /> : <Navigate to="/login" />} />
            <Route path="/search-ride" element={user ? <SearchRidePage /> : <Navigate to="/login" />} />
            <Route path="/posted-rides" element={user ? <PostedRidesPage /> : <Navigate to="/login" />} />
            <Route path="/ride-history" element={user ? <RideHistoryPage /> : <Navigate to="/login" />} />
            <Route path="/booked-rides" element={user ? <BookedRidesPage /> : <Navigate to="/login" />} />
            <Route path="/sent-requests" element={user ? <SentRequestsPage /> : <Navigate to="/login" />} />
            <Route path="/received-requests" element={user ? <ReceivedRequestsPage /> : <Navigate to="/login" />} />
            <Route path="/get-ratings" element={user ? <GetRatingsPage /> : <Navigate to="/login" />} />
            <Route path="/chat-rides" element={user ? <ChatRidesPage /> : <Navigate to="/login" />} />
           
            <Route path="/chats" element={user ? <GetYourChats /> : <Navigate to="/login" />}>
              <Route path=":chatId" element={<GetYourChats />} />
            </Route>
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppWrapper />
      </Router>
    </ThemeProvider>
  );
}

export default App;