// import React from 'react';
// import RideForm from '../components/RideForm/RideForm';

// const PostRidePage = () => {
//   return (
//     <div className="min-h-screen p-6 bg-gray-100">
//       <h1 className="text-3xl font-bold mb-4 text-center flex-1/4 bg-amber-800">Post a Ride</h1>
//       <RideForm />
//     </div>
//   );
// };

// export default PostRidePage;

import React from 'react';
import { motion } from 'framer-motion';
import RideForm from '../components/RideForm/RideForm';
import './PostRidePage.css';

const PostRidePage = () => {
  return (
    <div className="post-ride-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="post-ride-header"
      >
        <h1>Post a Ride</h1>
        <p>Fill in the details to offer your ride to others</p>
      </motion.div>
      <RideForm />
    </div>
  );
};

export default PostRidePage;