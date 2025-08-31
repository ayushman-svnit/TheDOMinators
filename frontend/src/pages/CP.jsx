// // // import React from 'react';
// // // import { useNavigate } from 'react-router-dom';

// // // const CarpoolHomePage = () => {
// // //   const navigate = useNavigate();

// // //   const handlePostRideClick = () => {
// // //     navigate('/post-ride');
// // //   };

// // //   const handleSearchRideClick = () => {
// // //     navigate('/search-ride');
// // //   };

// // //   const handleViewPostedRidesClick = () => {
// // //     navigate('/posted-rides');
// // //   };

// // //   const handleViewHistoryRidesClick = () => {
// // //     navigate('/ride-history');
// // //   };

// // //   const handleViewSentRequestsClick = () => {
// // //     navigate('/sent-requests');
// // //   };

// // //   return (
// // //     <div className="max-w-5xl mx-auto mt-10 p-6 space-y-10">
      
// // //       {/* Post a Ride Box */}
// // //       <div className="p-6 bg-purple-100 rounded-xl shadow-md">
// // //         <h2 className="text-2xl font-bold mb-4 text-gray-800">Post a Ride</h2>
// // //         <p className="text-gray-700 mb-6">
// // //           Have empty seats on your commute? Help others by offering a ride and save fuel costs!
// // //           Easily post a ride with your pickup location, vehicle details, and available seats.
// // //         </p>
// // //         <button
// // //           onClick={handlePostRideClick}
// // //           className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
// // //         >
// // //           Post a Ride
// // //         </button>
// // //       </div>

// // //       {/* Search a Ride Box */}
// // //       <div className="p-6 bg-green-100 rounded-xl shadow-md">
// // //         <h2 className="text-2xl font-bold mb-4 text-gray-800">Search for a Ride</h2>
// // //         <p className="text-gray-700 mb-6">
// // //           Need a lift? Enter your pickup and drop location to find available rides posted by others. 
// // //           Save money and travel comfortably!
// // //         </p>
// // //         <button
// // //           onClick={handleSearchRideClick}
// // //           className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded transition"
// // //         >
// // //           Search Ride
// // //         </button>
// // //       </div>
// // //       {/* View Posted Rides */}
// // //       <div className="p-6 bg-green-100 rounded-xl shadow-md">
// // //         <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Posted Rides</h2>
// // //         <p className="text-gray-700 mb-6">
// // //           View all the rides you have posted. Track bookings, manage your rides, and update statuses.
// // //         </p>
// // //         <button
// // //           onClick={handleViewPostedRidesClick}
// // //           className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded transition"
// // //         >
// // //           View Posted Rides
// // //         </button>
// // //       </div>
// // //       {/* Ride History Box */}
// // // <div className="p-6 bg-yellow-100 rounded-xl shadow-md">
// // //   <h2 className="text-2xl font-bold mb-4 text-gray-800">Ride History</h2>
// // //   <p className="text-gray-700 mb-6">
// // //     View your completed and cancelled rides — both those you posted and those you booked. Keep a record of your travel activity.
// // //   </p>
// // //   <button
// // //     onClick={handleViewHistoryRidesClick}
// // //     className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-2 rounded transition"
// // //   >
// // //     View Ride History
// // //   </button>
// // // </div>


// // // {/* Booked Rides Box */}
// // // <div className="p-6 bg-blue-100 rounded-xl shadow-md">
// // //   <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Booked Rides</h2>
// // //   <p className="text-gray-700 mb-6">
// // //     View all the rides you've booked. Check driver details, timing, and fare breakdown for your upcoming or past bookings.
// // //   </p>
// // //   <button
// // //     onClick={() => navigate('/booked-rides')}
// // //     className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
// // //   >
// // //     View Booked Rides
// // //   </button>
// // // </div>

// // // <div className="p-6 bg-orange-100 rounded-xl shadow-md">
// // //   <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Sent Requests</h2>
// // //   <p className="text-gray-700 mb-6">
// // //     View all the requests you have sent. Check driver details, timing, and fare breakdown for your sent requests.
// // //   </p>
// // //   <button
// // //     onClick={() => navigate('/sent-requests')}
// // //     className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
// // //   >
// // //     View Sent Requests
// // //   </button>
// // // </div>

// // // <div className="p-6 bg-pink-100 rounded-xl shadow-md">
// // //   <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Received Requests</h2>
// // //   <p className="text-gray-700 mb-6">
// // //     View all the requests you have received. Check driver details, timing, and fare breakdown for your received requests.
// // //   </p>
// // //   <button
// // //     onClick={() => navigate('/received-requests')}
// // //     className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
// // //   >
// // //     View Received Requests
// // //   </button>
// // // </div>

// // // <div className="p-6 bg-pink-100 rounded-xl shadow-md">
// // //   <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Received Ratings</h2>
// // //   <p className="text-gray-700 mb-6">
// // //     View all the requests you have received. Check driver details, timing, and fare breakdown for your received requests.
// // //   </p>
// // //   <button
// // //     onClick={() => navigate('/get-ratings')}
// // //     className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
// // //   >
// // //     Get ratings received
// // //   </button>
// // // </div>

// // // <div className="p-6 bg-pink-100 rounded-xl shadow-md">
// // //   <h2 className="text-2xl font-bold mb-4 text-gray-800">get your chats</h2>
// // //   <p className="text-gray-700 mb-6">
// // //     View all the requests you have received. Check driver details, timing, and fare breakdown for your received requests.
// // //   </p>
// // //   <button
// // //     onClick={() => navigate('/chats/*')}
// // //     className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
// // //   >
// // //     Get your chats
// // //   </button>
// // // </div>

// // // <div className="p-6 bg-blue-100 rounded-xl shadow-md">
// // //   <h2 className="text-2xl font-bold mb-4 text-gray-800">Start a new chat</h2>
// // //   <p className="text-gray-700 mb-6">
// // //     View all the requests you have received. Check driver details, timing, and fare breakdown for your received requests.
// // //   </p>
// // //   <button
// // //     onClick={() => navigate('/chat-rides')}
// // //     className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
// // //   >
// // //     Start a new chat
// // //   </button>
// // // </div>

// // //     </div>
// // //   );
// // // };

// // // export default CarpoolHomePage;

// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { 
// //   DirectionsCar,
// //   Search,
// //   History,
// //   Mail,
// //   Star,
// //   Chat,
// //   AddComment,
// //   ListAlt,
// //   Send,
// //   RequestPage
// // } from '@mui/icons-material';
// // import { motion } from 'framer-motion';
// // import './CarpoolHomePage.css'
// // const CarpoolHomePage = () => {
// //   const navigate = useNavigate();

// //   const actionCards = [
// //     {
// //       title: "Post a Ride",
// //       description: "Have empty seats on your commute? Help others by offering a ride!",
// //       icon: <DirectionsCar fontSize="large" />,
// //       path: '/post-ride',
// //       color: '#6c5ce7'
// //     },
// //     {
// //       title: "Search for a Ride",
// //       description: "Need a lift? Find available rides matching your route.",
// //       icon: <Search fontSize="large" />,
// //       path: '/search-ride',
// //       color: '#0984e3'
// //     },
// //     {
// //       title: "Your Posted Rides",
// //       description: "Manage rides you've posted and track bookings.",
// //       icon: <ListAlt fontSize="large" />,
// //       path: '/posted-rides',
// //       color: '#6c5ce7'
// //     },
// //     {
// //       title: "Ride History",
// //       description: "View your completed and cancelled rides.",
// //       icon: <History fontSize="large" />,
// //       path: '/ride-history',
// //       color: '#0984e3'
// //     },
// //     {
// //       title: "Your Booked Rides",
// //       description: "Check details of rides you've booked.",
// //       icon: <DirectionsCar fontSize="large" />,
// //       path: '/booked-rides',
// //       color: '#6c5ce7'
// //     },
// //     {
// //       title: "Your Sent Requests",
// //       description: "View all the requests you have sent.",
// //       icon: <Send fontSize="large" />,
// //       path: '/sent-requests',
// //       color: '#0984e3'
// //     },
// //     {
// //       title: "Received Requests",
// //       description: "Manage ride requests you've received.",
// //       icon: <RequestPage fontSize="large" />,
// //       path: '/received-requests',
// //       color: '#6c5ce7'
// //     },
// //     {
// //       title: "Your Ratings",
// //       description: "See feedback from other users.",
// //       icon: <Star fontSize="large" />,
// //       path: '/get-ratings',
// //       color: '#0984e3'
// //     },
// //     {
// //       title: "Your Chats",
// //       description: "Communicate with drivers/passengers.",
// //       icon: <Chat fontSize="large" />,
// //       path: '/chats',
// //       color: '#6c5ce7'
// //     },
// //     {
// //       title: "Start New Chat",
// //       description: "Initiate conversation with others.",
// //       icon: <AddComment fontSize="large" />,
// //       path: '/chat-rides',
// //       color: '#0984e3'
// //     }
// //   ];

// //   return (
// //     <div className="carpool-container">
// //       <header className="app-header">
// //         <h1>Carpool Dashboard</h1>
// //         <p>Connect with others for your daily commute</p>
// //       </header>

// //       <main className="card-grid">
// //         {actionCards.map((card, index) => (
// //           <motion.div
// //             key={index}
// //             className="action-card"
// //             style={{ borderTop: `4px solid ${card.color}` }}
// //             onClick={() => navigate(card.path)}
// //             whileHover={{ y: -5 }}
// //             transition={{ type: "spring", stiffness: 300 }}
// //           >
// //             <div className="card-icon" style={{ color: card.color }}>
// //               {card.icon}
// //             </div>
// //             <h3>{card.title}</h3>
// //             <p>{card.description}</p>
// //             <button 
// //               className="card-button"
// //               style={{ backgroundColor: card.color }}
// //             >
// //               {card.title.includes('Chat') ? 'Open Chats' : `View ${card.title.split(' ')[0]}`}
// //             </button>
// //           </motion.div>
// //         ))}
// //       </main>

// //       <footer className="app-footer">
// //         <p>© {new Date().getFullYear()} Carpool Connect</p>
// //       </footer>
// //     </div>
// //   );
// // };

// // export default CarpoolHomePage;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   DirectionsCar,
//   Search,
//   History,
//   Star,
//   Chat,
//   AddComment,
//   ListAlt,
//   Send,
//   RequestPage,
//   EventSeat,
//   People,
//   LocalGasStation,
//   Payment
// } from '@mui/icons-material';
// import { motion } from 'framer-motion';
// import './CarpoolHomePage.css';

// const CarpoolHomePage = () => {
//   const navigate = useNavigate();

//   const actionCards = [
//     {
//       title: "Post a Ride",
//       description: "Offer your empty seats to fellow commuters",
//       icon: <DirectionsCar fontSize="large" />,
//       path: '/post-ride',
//       color: '#6c5ce7',
//       stats: "3 active posts",
//       features: ["Set your price", "Choose your route", "Flexible timing"]
//     },
//     {
//       title: "Search Rides",
//       description: "Find rides matching your commute route",
//       icon: <Search fontSize="large" />,
//       path: '/search-ride',
//       color: '#0984e3',
//       stats: "12 rides available",
//       features: ["Filter by time", "See ratings", "Direct messaging"]
//     },
//     {
//       title: "Your Posted Rides",
//       description: "Manage rides you've posted",
//       icon: <ListAlt fontSize="large" />,
//       path: '/posted-rides',
//       color: '#6c5ce7',
//       stats: "2 upcoming rides",
//       features: ["Track bookings", "Edit details", "Cancel rides"]
//     },
//     {
//       title: "Ride History",
//       description: "View your past carpool experiences",
//       icon: <History fontSize="large" />,
//       path: '/ride-history',
//       color: '#0984e3',
//       stats: "8 completed trips",
//       features: ["See ratings", "View earnings", "Repeat routes"]
//     },
//     {
//       title: "Booked Rides",
//       description: "Your scheduled carpools as passenger",
//       icon: <EventSeat fontSize="large" />,
//       path: '/booked-rides',
//       color: '#6c5ce7',
//       stats: "1 upcoming booking",
//       features: ["Driver details", "Trip status", "Cancel booking"]
//     },
//     {
//       title: "Sent Requests",
//       description: "Ride join requests you've sent",
//       icon: <Send fontSize="large" />,
//       path: '/sent-requests',
//       color: '#0984e3',
//       stats: "3 pending requests",
//       features: ["Track status", "Cancel requests", "Message drivers"]
//     },
//     {
//       title: "Received Requests",
//       description: "Requests to join your rides",
//       icon: <People fontSize="large" />,
//       path: '/received-requests',
//       color: '#6c5ce7',
//       stats: "5 new requests",
//       features: ["Approve/deny", "Message passengers", "See profiles"]
//     },
//     {
//       title: "Your Ratings",
//       description: "Feedback from other users",
//       icon: <Star fontSize="large" />,
//       path: '/get-ratings',
//       color: '#0984e3',
//       stats: "4.8★ average",
//       features: ["12 reviews", "See comments", "Improve rating"]
//     },
//     {
//       title: "Messages",
//       description: "Communicate with carpool partners",
//       icon: <Chat fontSize="large" />,
//       path: '/chats',
//       color: '#6c5ce7',
//       stats: "3 unread messages",
//       features: ["Real-time chat", "Share locations", "Trip updates"]
//     },
//     {
//       title: "Start New Chat",
//       description: "Initiate conversation with users",
//       icon: <AddComment fontSize="large" />,
//       path: '/chat-rides',
//       color: '#0984e3',
//       stats: "Connect instantly",
//       features: ["Find contacts", "Group chats", "Media sharing"]
//     },
//     {
//       title: "Fuel Savings",
//       description: "Track your cost savings from carpooling",
//       icon: <LocalGasStation fontSize="large" />,
//       path: '/fuel-savings',
//       color: '#6c5ce7',
//       stats: "¥12,500 saved",
//       features: ["Monthly reports", "Cost breakdown", "Eco impact"]
//     }
//   ];

//   return (
//     <div className="carpool-container">
//       <header className="app-header">
//         <motion.h1 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           Carpool Connect
//         </motion.h1>
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//         >
//           Smart ridesharing for your daily commute
//         </motion.p>
//       </header>

//       <main className="card-grid">
//         {actionCards.map((card, index) => (
//           <motion.div
//             key={index}
//             className="action-card"
//             style={{ borderTop: `4px solid ${card.color}` }}
//             onClick={() => navigate(card.path)}
//             whileHover={{ 
//               y: -5, 
//               boxShadow: `0 10px 20px ${card.color}33`,
//               borderColor: card.color
//             }}
//             transition={{ type: "spring", stiffness: 300, delay: index * 0.1, duration: 0.5 }}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             <div className="card-icon" style={{ color: card.color }}>
//               {card.icon}
//             </div>
//             <h3>{card.title}</h3>
//             <p className="card-description">{card.description}</p>
            
//             <div className="card-stats">
//               <span>{card.stats}</span>
//             </div>
            
//             <ul className="card-features">
//               {card.features.map((feature, i) => (
//                 <li key={i}>
//                   <span className="feature-bullet" style={{ backgroundColor: card.color }}></span>
//                   {feature}
//                 </li>
//               ))}
//             </ul>
            
//             <button 
//               className="card-button"
//               style={{ backgroundColor: card.color }}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 navigate(card.path);
//               }}
//             >
//               {card.title.includes('Chat') ? 'Open Chats' : `View ${card.title.split(' ')[0]}`}
//             </button>
//           </motion.div>
//         ))}
//       </main>

//       <footer className="app-footer">
//         <p>© {new Date().getFullYear()} Carpool Connect • v2.4.1</p>
//       </footer>
//     </div>
//   );
// };

// export default CarpoolHomePage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DirectionsCar,
  Search,
  History,
  Star,
  Chat,
  AddComment,
  ListAlt,
  Send,
  RequestPage,
  EventSeat,
  People
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import './CarpoolHomePage.css';

const CarpoolHomePage = () => {
  const navigate = useNavigate();

  const actionCards = [
    {
      title: "Post a Ride",
      description: "Offer your empty seats to fellow commuters and save on fuel costs. Create a new ride with your preferred route, schedule, and pricing. Manage all your posted rides in one convenient location.",
      icon: <DirectionsCar fontSize="large" />,
      path: '/post-ride',
      color: '#0984e3'
    },
    {
      title: "Search Rides",
      description: "Find the perfect ride matching your commute needs. Filter by time, location, and price. View driver ratings and vehicle details before booking your seat.",
      icon: <Search fontSize="large" />,
      path: '/search-ride',
      color: '#0984e3'
    },
    {
      title: "Your Posted Rides",
      description: "Manage all rides you've created as a driver. Track bookings, update availability, and communicate with passengers. Edit ride details or cancel upcoming trips.",
      icon: <ListAlt fontSize="large" />,
      path: '/posted-rides',
      color: '#0984e3'
    },
    {
      title: "Ride History",
      description: "Review your complete carpooling history including past trips, ratings received, and earnings. Filter by date range or route for detailed insights.",
      icon: <History fontSize="large" />,
      path: '/ride-history',
      color: '#0984e3'
    },
    {
      title: "Booked Rides",
      description: "Access all rides you've booked as a passenger. View upcoming trip details, driver information, and payment status. Cancel bookings if plans change.",
      icon: <EventSeat fontSize="large" />,
      path: '/booked-rides',
      color: '#0984e3'
    },
    {
      title: "Sent Requests",
      description: "Track all ride join requests you've submitted. See approval status, message drivers, or withdraw requests. Get notified when drivers respond.",
      icon: <Send fontSize="large" />,
      path: '/sent-requests',
      color: '#0984e3'
    },
    {
      title: "Received Requests",
      description: "Manage requests from passengers wanting to join your rides. Approve or decline requests, view passenger profiles, and set preferences.",
      icon: <People fontSize="large" />,
      path: '/received-requests',
      color: '#0984e3'
    },
    {
      title: "Your Ratings",
      description: "See feedback from other users about your carpooling experiences. Improve your rating with positive interactions and reliable service.",
      icon: <Star fontSize="large" />,
      path: '/get-ratings',
      color: '#0984e3'
    },
    {
      title: "Messages",
      description: "Communicate directly with drivers or passengers. Share trip updates, coordinate pickup details, and build trust before riding together.",
      icon: <Chat fontSize="large" />,
      path: '/chats',
      color: '#0984e3'
    },
    {
      title: "Start New Chat",
      description: "Initiate conversations with potential carpool partners. Create group chats for regular commutes or discuss specific trip arrangements.",
      icon: <AddComment fontSize="large" />,
      path: '/chat-rides',
      color: '#0984e3'
    }
  ];

  return (
    <div className="carpool-container">
      <header className="app-header">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Carpool Connect
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          Smart ridesharing for your daily commute
        </motion.p>
      </header>

      <main className="card-grid">
        {actionCards.map((card, index) => (
          <motion.div
            key={index}
            className="action-card"
            style={{ borderTop: `4px solid ${card.color}` }}
            onClick={() => navigate(card.path)}
            whileHover={{ 
              y: -5, 
              boxShadow: `0 10px 20px ${card.color}33`,
              borderColor: card.color
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 , duration: 0.3}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div 
              className="card-icon" 
              style={{ color: card.color }}
              whileHover={{
                scale: 1.2,
                rotate: [0, 10, -10, 0],
                transition: { duration: 0.5 }
              }}
            >
              {card.icon}
            </motion.div>
            <h3>{card.title}</h3>
            <p className="card-description">{card.description}</p>
            
            <button 
              className="card-button"
              style={{ backgroundColor: card.color }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(card.path);
              }}
            >
              {card.title.includes('Chat') ? 'Open Chats' : `View ${card.title.split(' ')[0]}`}
            </button>
          </motion.div>
        ))}
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Carpool Connect</p>
      </footer>
    </div>
  );
};

export default CarpoolHomePage;