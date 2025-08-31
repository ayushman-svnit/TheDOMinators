// import React, { useState } from 'react';
// import axios from 'axios';

// const RideForm = () => {
//   const [formData, setFormData] = useState({
//     pickupLocation: '',
//     dropLocation: '',
//     date: '',
//     time: '',
//     availableSeats: '',
//     vehicleModel: '',
//     vehicleNumber: '',
//     pricePerSeat: '',
//   });

//   const [message, setMessage] = useState(null);

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const rideData = {
//       pickupLocation: formData.pickupLocation,
//       dropLocation: formData.dropLocation,
//       date: formData.date,
//       time: formData.time,
//       availableSeats: Number(formData.availableSeats),
//       pricePerSeat: Number(formData.pricePerSeat),
//       vehicleDetails: {
//         model: formData.vehicleModel,
//         number: formData.vehicleNumber,
//       },
//     };

//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.post('/api/rides/post', rideData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json"
//         }
//       });

//       setMessage("✅ Ride posted successfully!");
//       setFormData({
//         pickupLocation: '',
//         dropLocation: '',
//         date: '',
//         time: '',
//         availableSeats: '',
//         vehicleModel: '',
//         vehicleNumber: '',
//         pricePerSeat: '',
//       });
//     } catch (error) {
//       console.error(error);
//       setMessage("❌ Failed to post ride.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4">
//       <input name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} placeholder="Pickup Location" className="w-full p-2 border rounded" required />
//       <input name="dropLocation" value={formData.dropLocation} onChange={handleChange} placeholder="Drop Location" className="w-full p-2 border rounded" required />
//       <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded" required />
//       <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full p-2 border rounded" required />
//       <input type="number" name="availableSeats" value={formData.availableSeats} onChange={handleChange} placeholder="Available Seats" className="w-full p-2 border rounded" required />
//       <input name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} placeholder="Vehicle Model" className="w-full p-2 border rounded" required />
//       <input name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} placeholder="Vehicle Number" className="w-full p-2 border rounded" required />
//       <input type="number" name="pricePerSeat" value={formData.pricePerSeat} onChange={handleChange} placeholder="Price per Seat" className="w-full p-2 border rounded" required />

//       <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Post Ride</button>

//       {message && <p className="text-center mt-2">{message}</p>}
//     </form>
//   );
// };

// export default RideForm;

import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  DirectionsCar,
  LocationOn,
  Event,
  Schedule,
  People,
  AttachMoney
} from '@mui/icons-material';
import './RideForm.css';

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

      setMessage({ text: "Ride posted successfully!", type: "success" });
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
      setMessage({ text: "Failed to post ride.", type: "error" });
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="ride-form"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="form-group">
        <LocationOn className="input-icon" />
        <input
          name="pickupLocation"
          value={formData.pickupLocation}
          onChange={handleChange}
          placeholder="Pickup Location"
          required
        />
      </div>

      <div className="form-group">
        <LocationOn className="input-icon" />
        <input
          name="dropLocation"
          value={formData.dropLocation}
          onChange={handleChange}
          placeholder="Drop Location"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <Event className="input-icon" />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <Schedule className="input-icon" />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <People className="input-icon" />
          <input
            type="number"
            name="availableSeats"
            value={formData.availableSeats}
            onChange={handleChange}
            placeholder="Available Seats"
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <AttachMoney className="input-icon" />
          <input
            type="number"
            name="pricePerSeat"
            value={formData.pricePerSeat}
            onChange={handleChange}
            placeholder="Price per Seat"
            min="1"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <DirectionsCar className="input-icon" />
        <input
          name="vehicleModel"
          value={formData.vehicleModel}
          onChange={handleChange}
          placeholder="Vehicle Model"
          required
        />
      </div>

      <div className="form-group">
        <DirectionsCar className="input-icon" />
        <input
          name="vehicleNumber"
          value={formData.vehicleNumber}
          onChange={handleChange}
          placeholder="Vehicle Number"
          required
        />
      </div>

      <button type="submit" className="submit-button">
        Post Ride
      </button>

      {message && (
        <div className={`message ${message.type}`}>
          {message.type === 'success' ? '✅' : '❌'} {message.text}
        </div>
      )}
    </motion.form>
  );
};

export default RideForm;