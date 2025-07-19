import React from "react";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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
import FutureTransport from "./pages/FutureTransport";

function App() {
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
    <ThemeProvider>
      <Router>
        <div className="app">
          <Navbar user={user} setUser={setUser} />
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

          </Routes>
          <Footer />
        </div>
        <div>
          <Routes>
                      <Route path="/post-ride" element={user ? <PostRidePage /> : <Navigate to="/login" />} />
                      <Route path="/car-pooling" element={user ? <CarpoolHomePage /> : <Navigate to="/login" />} />
                      <Route
                            path="/search-ride"
                            element={user ? <SearchRidePage /> : <Navigate to="/login" />}
                      />
                      <Route path="/posted-rides" element={user ? <PostedRidesPage /> : <Navigate to="/login" />} />
                      <Route path="/ride-history" element={user ? <RideHistoryPage /> : <Navigate to="/login" />} />
                      <Route path="/booked-rides" element={user ? <BookedRidesPage /> : <Navigate to="/login" />} />
                      <Route path="/future-transport" element={user ? <FutureTransport /> : <Navigate to="/login" />} />


          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;