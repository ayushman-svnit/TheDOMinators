import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';
import herotransport from '/src/assets/videos/hero-transport.mp4';

const Hero = () => {
  return (
    <div className="hero-section">
      <div className="video-overlay" />
      <video autoPlay muted loop className="hero-video">
        <source src={herotransport} />
        Your browser does not support the video tag.
      </video>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="blurred-box">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Revolutionizing <span className="highlight">Urban Mobility</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Seamless transportation solutions for campuses and cities
          </motion.p>
        </div>

      </motion.div>


      <div className="transport-icons">
        {['🚇', '🚌', '🚲', '🚗', '🛴'].map((icon, index) => (
          <motion.div
            key={index}
            className="transport-icon"
            initial={{ y: 0 }}
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.2
            }}
          >
            {icon}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Hero;