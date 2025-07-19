// controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Otp from "../models/Otp.js";
import { sendOTP } from "../utils/sendMail.js";
import CarpoolUser from "../models/CarpoolUser.js";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ username, email, password });
    const carpoolUser = new CarpoolUser({ user: user._id });
    await carpoolUser.save();
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      message: "User registered successfully",
    });

    
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};

export const loginUser = (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    message: "User logged in successfully",
  });
};

export const logoutUser = (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.status(200).json({ message: "Logged out successfully" });
  });
};

export const getMe = (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await Otp.create({ email, otp });
  await sendOTP(email, otp);
  res.json({ message: "OTP sent to email" });
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const record = await Otp.findOne({ email, otp });
  if (!record) return res.status(400).json({ message: "Invalid or expired OTP" });
  res.json({ message: "OTP verified" });
};

export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const hashed = await bcrypt.hash(newPassword, 10);
  await User.updateOne({ email }, { password: hashed });
  await Otp.deleteMany({ email });
  res.json({ message: "Password reset successful" });
};
