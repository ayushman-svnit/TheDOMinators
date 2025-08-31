import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: '📱', label: 'App Store' },
    { icon: '🤖', label: 'Play Store' },
    { icon: '💻', label: 'Web App' }
  ];
  
  const navLinks = [
    { title: 'Smart Parking', path: '/parkings' },
    { title: 'Car Pooling', path: '/car-pooling' },
    { title: 'Route + Fare', path: '/route-calculator' },
    { title: 'Bus Booking', path: '/bus-info' },
    { title: 'Future Transport', path: '/future-transport' },
  ];
  
  const infoLinks = [
    { title: 'About Us', path: '#' },
    { title: 'Contact / Report', path: '/reports' },
    { title: 'Privacy Policy', path: '#' },
    { title: 'Terms of Service', path: '#' },
    { title: 'Careers', path: '#' }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <motion.div 
            className="footer-logo"
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/">
              <span>Transit</span>
              <span>Flow</span>
            </Link>
          </motion.div>
          <p>Redefining urban mobility with smart, sustainable transportation solutions for everyone.</p>
          
          <div className="social-links">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="social-icon">{link.icon}</span>
                <span>{link.label}</span>
              </motion.a>
            ))}
          </div>
        </div>
        
        <div className="footer-column">
          <h4>Navigation</h4>
          <ul>
            {navLinks.map((link, index) => (
              <motion.li
                key={index}
                whileHover={{ x: 5 }}
              >
                <Link to={link.path}>{link.title}</Link>
              </motion.li>
            ))}
          </ul>
          
        </div>
        
        <div className="footer-column">
          <h4>Information</h4>
          <ul>
            {infoLinks.map((link, index) => (
              <motion.li
                key={index}
                whileHover={{ x: 5 }}
              >
                <a href={link.path}>{link.title}</a>
              </motion.li>
            ))}
          </ul>
        </div>
        
        <div className="footer-column">
          <h4>Newsletter</h4>
          <p>Subscribe for updates on new features and services</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} TransitFlow. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Accessibility</a>
          <a href="#">Sitemap</a>
          <a href="#">Partners</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;