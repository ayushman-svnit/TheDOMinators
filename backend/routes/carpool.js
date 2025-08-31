import express from "express";
import { protect } from "../middleware/auth.js";
import CarpoolUser from "../models/CarpoolUser.js";

const router = express.Router();

// GET /api/carpool/me – returns CarpoolUser info for current user
router.get("/me", protect, async (req, res) => {
  try {
    const carpoolUser = await CarpoolUser.findOne({ user: req.user._id });

    if (!carpoolUser) {
      return res.status(404).json({ message: "Carpool user not found" });
    }

    res.json({
      _id: carpoolUser._id,
      username: carpoolUser.username,
      email: carpoolUser.email,
      averageRating: carpoolUser.averageRating || null,
      chats: carpoolUser.chats || []
    });
  } catch (err) {
    console.error("Error in /api/carpool/me:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
