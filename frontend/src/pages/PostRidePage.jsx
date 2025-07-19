import React from 'react';
import RideForm from '../components/RideForm/RideForm';

const PostRidePage = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-center flex-1/4 bg-amber-800">Post a Ride</h1>
      <RideForm />
    </div>
  );
};

export default PostRidePage;
