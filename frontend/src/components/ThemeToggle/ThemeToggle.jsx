import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();
  
  return (
    <motion.div 
      className="theme-toggle"
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
    >
      <div className={`toggle-container ${darkMode ? 'dark' : 'light'}`}>
        <motion.div 
          className="toggle-handle"
          animate={{ x: darkMode ? 24 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {darkMode ? (
            <span className="moon">🌙</span>
          ) : (
            <span className="sun">☀️</span>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ThemeToggle;