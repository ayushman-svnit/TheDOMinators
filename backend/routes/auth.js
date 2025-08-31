import express from "express";
import passport from "passport";
import { protect } from "../middleware/auth.js";
import { BanUser } from "../middleware/auth.js";

import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  forgotPassword,
  verifyOtp,
  resetPassword,
  reportUser
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", passport.authenticate("local"), BanUser, loginUser);
router.post("/logout", logoutUser);
router.get("/me", protect, getMe);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.post("/report", protect, reportUser);

export default router;

