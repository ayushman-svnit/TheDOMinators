

// // import React, { useEffect, useState } from 'react';
// // import { useNavigate, useParams } from 'react-router-dom';
// // import axios from 'axios';
// // import './ChatList.css';

// // const ChatList = () => {
// //   const [chats, setChats] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const navigate = useNavigate();
// //   const { chatId: currentChatId } = useParams();

// //   useEffect(() => {
// //     const fetchChats = async () => {
// //       try {
// //         const response = await axios.get('https://thedominators.onrender.com/api/chats/my-chats', {
// //           withCredentials: true
// //         });
// //         setChats(response.data);
// //       } catch (error) {
// //         console.error('Error fetching chats:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchChats();
// //   }, []);

// //   const handleChatClick = (chatId) => {
// //     navigate(`/chats/${chatId}`);
// //   };

// //   if (loading) return <div className="loading">Loading chats...</div>;

// //   return (
// //     <div className="chat-list-container">
// //       <h2>Your Chats</h2>
// //       {chats.length === 0 ? (
// //         <p className="no-chats">No chats yet. Start a conversation after a ride!</p>
// //       ) : (
// //         <ul className="chat-list">
// //           {chats.map(chat => (
// //             <li 
// //               key={chat._id} 
// //               className={`chat-item ${currentChatId === chat._id ? 'active' : ''}`}
// //               onClick={() => handleChatClick(chat._id)}
// //             >
// //               <div className="chat-header">
// //                 <h3>{chat.participants.join(', ')}</h3>
// //                 <span className="last-message-time">
// //                   {chat.messages[0]?.timestamp || ''}
// //                 </span>
// //               </div>
// //               <p className="last-message">
// //                 {chat.messages[0]?.text || 'No messages yet'}
// //               </p>
// //             </li>
// //           ))}
// //         </ul>
// //       )}
// //     </div>
// //   );
// // };

// // export default ChatList;

// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { FiMessageSquare } from 'react-icons/fi';
// import './ChatList.css';

// const ChatList = () => {
//   const [chats, setChats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();
//   const { chatId: currentChatId } = useParams();

//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const response = await axios.get('https://thedominators.onrender.com/api/chats/my-chats', {
//           withCredentials: true
//         });
//         setChats(response.data);
//       } catch (error) {
//         console.error('Error fetching chats:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChats();
//   }, []);

//   const handleChatClick = (chatId) => {
//     navigate(`/chats/${chatId}`);
//   };

//   const filteredChats = chats.filter(chat => 
//     chat.participants.some(p => 
//       p.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   if (loading) {
//     return (
//       <div className="chat-list-container loading">
//         <div className="loading-spinner"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="chat-list-container">
//       <div className="chat-list-header">
//         <h2>Messages</h2>
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search messages"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       {filteredChats.length === 0 ? (
//         <div className="no-chats">
//           <FiMessageSquare size={48} />
//           <h3>No chats yet</h3>
//           <p>Your conversations will appear here after rides</p>
//         </div>
//       ) : (
//         <ul className="chat-list">
//           {filteredChats.map(chat => (
//             <li 
//               key={chat._id} 
//               className={`chat-item ${currentChatId === chat._id ? 'active' : ''}`}
//               onClick={() => handleChatClick(chat._id)}
//             >
//               <div className="chat-avatar">
//                 {chat.participants[0].charAt(0).toUpperCase()}
//               </div>
//               <div className="chat-info">
//                 <div className="chat-header">
//                   <h3>{chat.participants.join(', ')}</h3>
//                   <span className="last-message-time">
//                     {new Date(chat.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                   </span>
//                 </div>
//                 <p className="last-message-preview">
//                   {chat.lastMessage?.text || 'No messages yet'}
//                 </p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ChatList;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FiMessageSquare } from 'react-icons/fi';
import './ChatList.css';

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { chatId: currentChatId } = useParams();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get('/api/chats/my-chats', {
          withCredentials: true
        });
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const handleChatClick = (chatId) => {
    navigate(`/chats/${chatId}`);
  };

  // 🔍 Filter chats by participant search
  const filteredChats = chats.filter(chat => 
    chat.participants.some(p => 
      p.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="chat-list-container loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="chat-list-container">
      <div className="chat-list-header">
        <h2>Messages</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search messages"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredChats.length === 0 ? (
        <div className="no-chats">
          <FiMessageSquare size={48} />
          <h3>No chats yet</h3>
          <p>Your conversations will appear here after rides</p>
        </div>
      ) : (
        <ul className="chat-list">
          {filteredChats.map(chat => {
            // ✅ Get the latest message from the array (last element)
            const lastMsg = chat.messages?.length > 0 
              ? chat.messages[chat.messages.length - 1] 
              : null;

            return (
              <li 
                key={chat._id} 
                className={`chat-item ${currentChatId === chat._id ? 'active' : ''}`}
                onClick={() => handleChatClick(chat._id)}
              >
                <div className="chat-avatar">
                  {chat.participants[0].charAt(0).toUpperCase()}
                </div>
                <div className="chat-info">
                  <div className="chat-headero">
               <h3>{chat.participants.join(', ')}</h3>
              <span className="last-message-time">
{chat.messages[0]?.timestamp || ''}             </span>
                </div>
                  <p className="last-message-preview">
                    {chat.messages[0]?.text || 'No messages yet'}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ChatList;
