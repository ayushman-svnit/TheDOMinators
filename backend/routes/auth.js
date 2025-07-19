// import express from "express";
// import User from "../models/User.js";
// import { protect } from "../middleware/auth.js";
// import passport from "passport";
// import Otp from '../models/Otp.js';
// import { sendOTP } from '../utils/sendMail.js';
// import bcrypt from "bcryptjs";

// const router = express.Router();

// // REGISTER
// router.post("/register", async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     if (!username || !email || !password) {
//       return res.status(400).json({ message: "Please fill all fields" });
//     }

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const user = await User.create({ username, email, password });
//     res.status(201).json({
//       _id: user._id,
//       username: user.username,
//       email: user.email,
//       message: "User registered successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error registering user" });
//   }
// });

// // LOGIN
// router.post("/login", passport.authenticate("local"), (req, res) => {
//   res.status(200).json({
//     _id: req.user._id,
//     username: req.user.username,
//     email: req.user.email,
//     message: "User logged in successfully",
//   });
// });

// // LOGOUT
// router.post("/logout", (req, res) => {
//   req.logout(err => {
//     if (err) return res.status(500).json({ message: "Logout failed" });
//     res.status(200).json({ message: "Logged out successfully" });
//   });
// });

// // ME (protected route)
// router.get("/me", protect, (req, res) => {
//   res.status(200).json({
//     _id: req.user._id,
//     username: req.user.username,
//     email: req.user.email,
//   });
// });

// router.post("/forgot-password", async (req, res) => {
//   const { email } = req.body;
  
//   // Generate 6-digit OTP
//   const otp = Math.floor(100000 + Math.random() * 900000).toString();

//   // Save to DB
//   await Otp.create({ email, otp });

//   // Send OTP to email
//   await sendOTP(email, otp);

//   res.json({ message: "OTP sent to email" });
// });

// router.post("/verify-otp", async (req, res) => {
//   const { email, otp } = req.body;

//   const record = await Otp.findOne({ email, otp });

//   if (!record) {
//     return res.status(400).json({ message: "Invalid or expired OTP" });
//   }

//   res.json({ message: "OTP verified" });
// });

// router.post("/reset-password", async (req, res) => {
//   const { email, newPassword } = req.body;

//   const hashed = await bcrypt.hash(newPassword, 10);

//   await User.updateOne({ email }, { password: hashed });

//   // Optional: delete OTPs after use
//   await Otp.deleteMany({ email });

//   res.json({ message: "Password reset successful" });
// });

// export default router;

import express from "express";
import passport from "passport";
import { protect } from "../middleware/auth.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  forgotPassword,
  verifyOtp,
  resetPassword
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", passport.authenticate("local"), loginUser);
router.post("/logout", logoutUser);
router.get("/me", protect, getMe);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

export default router;

