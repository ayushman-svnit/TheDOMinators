

// import React from 'react';
// import { Routes, Route, useParams, useLocation } from 'react-router-dom';
// import ChatList from '../components/ChatList';
// import ChatWindow from '../components/ChatWindow';
// import './GetYourChats.css';

// const GetYourChats = () => {
//   const location = useLocation();
//   const isChatOpen = location.pathname !== '/chats';

//   return (
//     <div className={`chats-page ${isChatOpen ? 'chat-open' : ''}`}>
//       <ChatList />
//       <Routes>
//         <Route path="/:chatId" element={<ChatWindowWrapper />} />
//       </Routes>
//     </div>
//   );
// };

// const ChatWindowWrapper = () => {
//   const { chatId } = useParams();
//   return <ChatWindow chatId={chatId} />;
// };

// export default GetYourChats;

import React from 'react';
import { Routes, Route, useParams, useLocation } from 'react-router-dom';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import './GetYourChats.css';

const GetYourChats = () => {
  const location = useLocation();
  const isChatOpen = location.pathname !== '/chats';

  return (
    <div className={`chats-app ${isChatOpen ? 'chat-open' : ''}`}>
      <div className="chats-container">
        <ChatList />
        <Routes>
          <Route path="/:chatId" element={<ChatWindowWrapper />} />
          <Route path="/" element={<EmptyChatState />} />
        </Routes>
      </div>
    </div>
  );
};

const ChatWindowWrapper = () => {
  const { chatId } = useParams();
  return <ChatWindow chatId={chatId} />;
};

const EmptyChatState = () => (
  <div className="empty-chat-state">
    <div className="empty-chat-content">
      <h3>Select a chat to start messaging</h3>
      <p>Your conversations will appear here</p>
    </div>
  </div>
);

export default GetYourChats;