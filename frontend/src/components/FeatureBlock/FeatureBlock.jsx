import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './FeatureBlock.css';
// import future from '/src/assets/videos/future.mp4';
// import smartParking from '/src/assets/videos/parking.mp4';
// import carPooling from '/src/assets/videos/carpool.mp4';
// import route from '/src/assets/videos/routefare.mp4';
// import busBooking from '/src/assets/videos/bus.mp4';

const FeatureBlock = ({ title, description, video, link, reverse }) => {
  return (
    <motion.div 
      className={`feature-block ${reverse ? 'reverse' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="feature-content">
        <motion.h2 
          initial={{ opacity: 0, x: reverse ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: reverse ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          {description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Link to={link}>
            <motion.button 
              className="feature-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore More
            </motion.button>
          </Link>
        </motion.div>
      </div>
      
      <motion.div 
        className="feature-image-container"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <video
          className="feature-video"
          src={video}
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="image-overlay" />
      </motion.div>
    </motion.div>
  );
};

export default FeatureBlock;