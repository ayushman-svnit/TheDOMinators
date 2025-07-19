import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ServiceAlerts.css'; // Ensure you have the appropriate CSS for styling


const ServiceAlerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      message: "🚧 Route 12: Temporary detour due to construction on Main Street",
      type: "warning",
      active: true
    },
    {
      id: 2,
      message: "⚠️ Shuttle service suspended between 10 AM - 12 PM for maintenance",
      type: "critical",
      active: true
    },
    {
      id: 3,
      message: "🎉 New express route added from Campus West to Downtown!",
      type: "info",
      active: true
    }
  ]);
  
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAlertIndex((prevIndex) => 
        prevIndex === alerts.filter(a => a.active).length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);
    
    return () => clearInterval(interval);
  }, [alerts]);
  
  const activeAlerts = alerts.filter(alert => alert.active);
  
  if (activeAlerts.length === 0) return null;
  
  return (
    <div className="service-alerts-container">
      <div className="alert-icon">⚠️</div>
      <div className="alerts-track">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeAlerts[currentAlertIndex]?.id || 'empty'}
            className={`alert ${activeAlerts[currentAlertIndex]?.type}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {activeAlerts[currentAlertIndex]?.message}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ServiceAlerts;