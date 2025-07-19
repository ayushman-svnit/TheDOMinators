import React, { useState } from 'react';
import axios from 'axios';

const RideForm = () => {
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropLocation: '',
    date: '',
    time: '',
    availableSeats: '',
    vehicleModel: '',
    vehicleNumber: '',
    pricePerSeat: '',
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rideData = {
      pickupLocation: formData.pickupLocation,
      dropLocation: formData.dropLocation,
      date: formData.date,
      time: formData.time,
      availableSeats: Number(formData.availableSeats),
      pricePerSeat: Number(formData.pricePerSeat),
      vehicleDetails: {
        model: formData.vehicleModel,
        number: formData.vehicleNumber,
      },
    };

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post('/api/rides/post', rideData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      setMessage("✅ Ride posted successfully!");
      setFormData({
        pickupLocation: '',
        dropLocation: '',
        date: '',
        time: '',
        availableSeats: '',
        vehicleModel: '',
        vehicleNumber: '',
        pricePerSeat: '',
      });
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to post ride.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4">
      <input name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} placeholder="Pickup Location" className="w-full p-2 border rounded" required />
      <input name="dropLocation" value={formData.dropLocation} onChange={handleChange} placeholder="Drop Location" className="w-full p-2 border rounded" required />
      <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded" required />
      <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full p-2 border rounded" required />
      <input type="number" name="availableSeats" value={formData.availableSeats} onChange={handleChange} placeholder="Available Seats" className="w-full p-2 border rounded" required />
      <input name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} placeholder="Vehicle Model" className="w-full p-2 border rounded" required />
      <input name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} placeholder="Vehicle Number" className="w-full p-2 border rounded" required />
      <input type="number" name="pricePerSeat" value={formData.pricePerSeat} onChange={handleChange} placeholder="Price per Seat" className="w-full p-2 border rounded" required />

      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Post Ride</button>

      {message && <p className="text-center mt-2">{message}</p>}
    </form>
  );
};

export default RideForm;
