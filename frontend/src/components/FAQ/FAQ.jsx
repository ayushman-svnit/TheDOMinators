import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  const faqs = [
    {
      question: "How accurate are the real-time arrival predictions?",
      answer: "Our predictions are 95% accurate within 2 minutes, using a combination of GPS tracking, historical data, and machine learning algorithms to account for traffic patterns and delays."
    },
    {
      question: "Can I book parking in advance?",
      answer: "Yes! Our Smart Parking feature allows you to reserve parking spots up to 7 days in advance. Simply select your location, choose a spot, and pay through our secure platform."
    },
    {
      question: "How does the fare calculator work?",
      answer: "The fare calculator considers multiple factors including distance, time of day, transportation mode, and any applicable discounts. It provides the most cost-effective route options for your journey."
    },
    {
      question: "Is carpooling safe?",
      answer: "Safety is our top priority. All carpool participants are verified through our platform. We also offer features like ride tracking, emergency contacts, and user ratings to ensure a safe experience."
    },
    {
      question: "What futuristic transport options are available?",
      answer: "We're currently piloting autonomous shuttles on campus routes and working with partners on eVTOL (electric vertical take-off and landing) projects for urban air mobility. Check our Future Transport section for updates!"
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='faq-title'
      >
        Frequently Asked Questions
      </motion.h2>
      
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <motion.div 
            key={index}
            className="faq-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div 
              className={`faq-question ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <motion.div 
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ▼
              </motion.div>
            </div>
            
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  className="faq-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;