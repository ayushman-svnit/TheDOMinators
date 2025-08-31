

// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { io } from 'socket.io-client';
// import './ChatWindow.css';

// const ChatWindow = ({ chatId }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [socket, setSocket] = useState(null);
//   const messagesEndRef = useRef(null);

//   // Initialize socket connection
//   useEffect(() => {
//     const newSocket = io('https://thedominators.onrender.com', {
//       withCredentials: true,
//       transports: ['websocket']
//     });
//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   // Join room and setup listeners when chatId or socket changes
//   useEffect(() => {
//     if (!socket) return;

//     const fetchMessages = async () => {
//       try {
//         const response = await axios.get(
//           `https://thedominators.onrender.com/api/chats/${chatId}/messages`,
//           { withCredentials: true }
//         );
//         setMessages(response.data);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     socket.emit('joinRoom', { chatId });
//     fetchMessages();

//     // Setup message listener
//     const handleNewMessage = (message) => {
//       setMessages(prev => [...prev, {
//         text: message.text,
//         username: message.sender.user.username,
//         timestamp: new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//       }]);
//     };

//     socket.on('newMessage', handleNewMessage);

//     return () => {
//       socket.off('newMessage', handleNewMessage);
//     };
//   }, [chatId, socket]);

//   // Auto-scroll to bottom when messages change
//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!newMessage.trim()) return;

//     try {
//       const response = await axios.post(
//         'https://thedominators.onrender.com/api/chats/send',
//         { chatId, text: newMessage },
//         { withCredentials: true }
//       );

     
      
//       setNewMessage('');
      
//       // Socket will handle the actual update from the server
//     } catch (error) {
//       console.error('Error sending message:', error);
//       // Rollback optimistic update if needed
//     }
//   };

//   if (loading) return <div className="loading">Loading messages...</div>;

//   return (
//     <div className="chat-window">
//       <div className="messages-container">
//         {messages.length === 0 ? (
//           <p className="no-messages">No messages yet. Start the conversation!</p>
//         ) : (
//           messages.map((message, index) => (
//             <div 
//               key={index} 
//               className={`message ${message.username === 'You' || message.username === 'driver' ? 'sent' : 'received'}`}
//             >
//               <div className="message-header">
//                 <span className="sender">{message.username}</span>
//                 <span className="timestamp">{message.timestamp}</span>
//               </div>
//               <p className="message-text">{message.text}</p>
//             </div>
//           ))
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       <form onSubmit={handleSendMessage} className="message-input">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type your message..."
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default ChatWindow;

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { FiSend, FiImage, FiSmile } from 'react-icons/fi';
import './ChatWindow.css';

const ChatWindow = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const [typing, setTyping] = useState(false);
  const [typingUser, setTypingUser] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io('https://thedominators.onrender.com', {
      withCredentials: true,
      transports: ['websocket']
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Join room and setup listeners
  useEffect(() => {
    if (!socket || !chatId) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `/api/chats/${chatId}/messages`,
          { withCredentials: true }
        );
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    socket.emit('joinRoom', { chatId });
    fetchMessages();

    // Setup listeners
    const handleNewMessage = (message) => {
      setMessages(prev => [...prev, {
        text: message.text,
        username: message.sender.user.username,
        isYou: message.sender.user._id === localStorage.getItem('userId'),
        timestamp: new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    };

    const handleTyping = (data) => {
      if (data.userId !== localStorage.getItem('userId')) {
        setTyping(true);
        setTypingUser(data.username);
        setTimeout(() => setTyping(false), 2000);
      }
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('typing', handleTyping);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('typing', handleTyping);
    };
  }, [chatId, socket]);

  // Auto-scroll and typing indicator
  useEffect(() => {
    // scrollToBottom();
    const timer = typing && setTimeout(() => setTyping(false), 2000);
    return () => clearTimeout(timer);
  }, [messages, typing]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTyping = () => {
    if (socket && chatId) {
      socket.emit('typing', { 
        chatId, 
        userId: localStorage.getItem('userId'),
        username: localStorage.getItem('username')
      });
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await axios.post(
        '/api/chats/send',
        { chatId, text: newMessage },
        { withCredentials: true }
      );
      setNewMessage('');
      inputRef.current.focus();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading) {
    return (
      <div className="chat-window loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>Messages</h3>
      </div>

      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="no-messages">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div 
              key={index} 
              className={`message ${message.isYou ? 'sent' : 'received'}`}
            >
              {!message.isYou && (
                <div className="sender-avatar">
                  {message.username.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="message-content">
                {!message.isYou && (
                  <span className="sender-name">{message.username}</span>
                )}
                <div className="message-bubble">
                  <p>{message.text}</p>
                  <span className="message-time">{message.timestamp}</span>
                </div>
              </div>
            </div>
          ))
        )}
        {typing && (
          <div className="typing-indicator">
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span>{typingUser} is typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="message-input-area">
        <div className="input-actions">
          <button type="button" className="action-btn">
            <FiImage />
          </button>
          <button type="button" className="action-btn">
            <FiSmile />
          </button>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            handleTyping();
          }}
          placeholder="Message..."
          className="message-input"
        />
        <button 
          type="submit" 
          className="send-btn"
          disabled={!newMessage.trim()}
        >
          <FiSend />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;