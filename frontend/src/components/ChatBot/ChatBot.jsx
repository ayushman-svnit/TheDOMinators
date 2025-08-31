import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm TransitBot, your transportation assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user'
    };
    
    setMessages([...messages, newUserMessage]);
    setInputValue('');
    
    // Simulate bot response after delay
    setTimeout(() => {
      const botResponses = [
        "I can help you with route planning, fare calculation, and service alerts.",
        "You can find real-time bus schedules and parking availability on our platform.",
        "Would you like me to help you plan a route?",
        "Our fare calculator can estimate costs for your entire journey.",
        "I can notify you about any service disruptions on your route."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const newBotMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, newBotMessage]);
    }, 1000);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {!isOpen ? (
        <motion.div 
          className="chat-bot-button"
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="chat-icon">💬</div>
          <span>TransitBot</span>
        </motion.div>
      ) : (
        <motion.div 
          className="chat-bot-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className="chat-header">
            <h3>TransitBot Assistant</h3>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>
          
          <div className="chat-messages">
            {messages.map(message => (
              <motion.div 
                key={message.id}
                className={`message ${message.sender}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {message.text}
              </motion.div>
            ))}
          </div>
          
          <div className="chat-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about routes, fares, or alerts..."
            />
            <button onClick={handleSendMessage}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ➤
              </motion.div>
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ChatBot;