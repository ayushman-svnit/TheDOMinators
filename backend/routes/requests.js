import express from "express";
import {
  sendJoinRequest,
  getReceivedRequests,
  updateJoinRequestStatus,
  getSentRequests
} from "../controllers/requestController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Send a join request to a ride
router.post("/send", protect, sendJoinRequest); // done test

// Get all join requests received by the logged-in user
router.get("/received", protect, getReceivedRequests); // done test

// Get all join requests sent by the logged-in user
router.get("/sent", protect, getSentRequests); // done test

// Update join request status (accept or reject)
router.put("/update/:requestId", protect, updateJoinRequestStatus); // done test

export default router;
