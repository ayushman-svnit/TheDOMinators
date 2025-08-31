// controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Otp from "../models/Otp.js";
import { sendOTP } from "../utils/sendMail.js";
import CarpoolUser from "../models/CarpoolUser.js";
import Report from "../models/reportUser.js";
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // 🚨 Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // ❌ User already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 👤 Create user
    const newUser = new User({ username, email, password });
    await newUser.save();

    // 🚗 Create linked CarpoolUser
    const carpoolUser = new CarpoolUser({ user: newUser._id });
    await carpoolUser.save();

    // ✅ Log the user in (creates req.user and session)
    req.login(newUser, async (err) => {
      if (err) return next(err); // use express error handler

      // 🎟️ JWT token (optional if you're also using session)
      const token = jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.status(201).json({
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
        token,
        message: "User registered and logged in successfully",
        isAdmin: req.session?.isAdmin || false
      });
    });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Error registering user" });
  }
};

export const loginUser = (req, res) => {
  const user = {
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  }
  const token = jwt.sign(
      { userId: user ? user._id : 'admin'}, // Payload
      process.env.JWT_SECRET, // Secret key (must be set in .env)
      { expiresIn: "7d" }     // Optional: token expiry
    );
  res.status(200).json({
    user,
    token,
    message: "User logged in successfully",
    isAdmin: req.session.isAdmin || false
  });
};

export const logoutUser = (req, res) => {
  req.logout(function(err) {
    if (err) return res.status(500).json({ message: "Logout failed" });

    req.session.destroy((err) => {
      if (err) return res.status(500).json({ message: "Logout failed" });

      res.clearCookie("connect.sid"); // adjust if you're using a different session cookie name
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
};

export const getMe = (req, res) => {
  if (req.isAdmin)
    return res.json({ isAdmin: true, user: null });
  else if (req.isAuthenticated()) {
    return res.status(200).json({
      user: {
        _id: req.user._id,
        username: req.user.username,
        email: req.user.email,
      },
      isAdmin: false
    });
  }
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

export const reportUser = async (req, res) => {
  try {
    console.log(req.body);
    const {reportedUser, comment, username} = req.body;
    const user = await User.findOne({username: reportedUser});
    if(user) {
      const report = new Report({username, reportedUser, comment});
      await report.save();
      res.status(200).json({ message: 'Report was submitted successfully'});
    } else {
      res.status(200).json({ message: "User doesn't exist" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Report submission failed' });
  }
  
}