import express from 'express';
import Parking from '../../models/parking.js';
import ParkingUser from '../../models/parkinguser.js';
import jwt from 'jsonwebtoken';
import axios from "axios";

const router = express.Router();
 
// 🔑 Admin login endpoint (validates master key)
router.get('/login',async (req, res) => {
  const { key } = req.query;
  const masterKeys = process.env.ADMIN_KEYS?.split(',') || [];

  if (masterKeys.includes(key)) {
    delete req.user;
    delete req.session.passport;
    req.session.isAdmin = true;
    const token = jwt.sign(
          { userId: 'admin'}, // Payload
          process.env.JWT_SECRET, // Secret key (must be set in .env)
          { expiresIn: "7d" }     // Optional: token expiry
        );
    const responseData = {
      user: null,
      isAdmin: true,
      token,
      message: 'Admin authenticated successfully'
    };
    console.log('Response data:', responseData);  // <---- LOG HERE);
    res.status(200).json(responseData);
  } else {
    console.log('Invalid master key:', key);  // <---- LOG INVALID KEY
    res.status(401).json({ message: 'Invalid master key' });
  }
})



// 🧠 Admin dashboard access check
router.get('/dashboard', (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).json({ message: 'Unauthorized admin access' });
  }

  res.status(200).json({ message: 'Welcome to Admin Dashboard', isAdmin: true });
});

// 🚪 Admin logout
// router.post('/logout', (req, res) => {
//   req.session.isAdmin = false;
//   req.isAdmin = false;
//   res.status(200).json({ message: 'Admin logged out' });
// });

export default router;