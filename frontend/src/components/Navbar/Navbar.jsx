

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import logo from '../../assets/logoo.png';
import './Navbar.css';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { darkMode } = useTheme();
  const location = useLocation();
  const navRef = useRef(null);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuOpen && navRef.current && !navRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);
  
  const navLinks = [
    { name: 'Smart Parking', path: '/smart-parking' },
    { name: 'Car Pooling', path: '/car-pooling' },
    { name: 'Route + Fare', path: '/route-calculator' },
    { name: 'Bus Booking', path: '/bus-info' },
    { name: 'Future Transport', path: '/future-transport' },
    { name: 'FAQ', path: '/#faq' }
  ];
  
  const scrollToFAQ = () => {
    if (location.pathname === '/') {
      const faqSection = document.getElementById('faq');
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''} ${darkMode ? 'dark' : 'light'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      ref={navRef}
    >
      <div className="navbar-container">
        <div className="logo-container">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={logo} alt="TransitFlow Logo" className="logo-img" />
            <Link to="/">
              <div className="logo-text">
                
                <span className="logo-name">Transit</span>
                <span className="logo-highlight">Flow</span>
              </div>
            </Link>
          </motion.div>
        </div>
        
        <div className="nav-links">
          {navLinks.map((link) => (
            <motion.div
              key={link.name}
              className="nav-item"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.path.includes('#faq') ? (
                <a 
                  href="/#faq" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToFAQ();
                  }}
                >
                  {link.name}
                </a>
              ) : (
                <Link to={link.path}>{link.name}</Link>
              )}
            </motion.div>
          ))}
        </div>
        
        <div className="auth-buttons">
          {user ? (
            <>
              <motion.span 
                className="welcome-user"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Welcome, {user.username}
              </motion.span>
              <motion.button 
                className="logout-btn"
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <motion.button 
                className="login-btn"
                onClick={() => navigate('/Login')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
              <motion.button 
                className="signup-btn"
                onClick={() => navigate('/Register')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            </>
          )}
          <ThemeToggle />
        </div>
        
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-nav-links">
              {navLinks.map((link) => (
                <div className="mobile-nav-item" key={link.name}>
                  {link.path.includes('#faq') ? (
                    <a 
                      href="/#faq" 
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToFAQ();
                        setMobileMenuOpen(false);
                      }}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link to={link.path} onClick={() => setMobileMenuOpen(false)}>
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <div className="mobile-auth-buttons">
              {user ? (
                <>
                  <div className="mobile-welcome-user">Welcome, {user.name || user.email}</div>
                  <button 
                    className="logout-btn"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button 
                    className="login-btn"
                    onClick={() => {
                      navigate('/login');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </button>
                  <button 
                    className="signup-btn"
                    onClick={() => {
                      navigate('/register');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </button>
                  
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;