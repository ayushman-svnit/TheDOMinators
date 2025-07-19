import express from "express";
import {
  postRide,
  searchRides,
  getPostedRides,
  getBookedRides,
  getRideHistory,
  updateUpcomingRide
} from "../controllers/rideController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Post a new ride
router.post("/post", protect, postRide); // done test + page

// Search rides by pickup/drop/date
router.get("/search", protect, searchRides); // done test + page

// Get rides posted by logged-in user
router.get("/posted", protect, getPostedRides); // done test

// Get rides booked by logged-in user
router.get("/booked", protect, getBookedRides); // done test

// Get ride history (both posted and booked, completed/cancelled)
router.get("/history", protect, getRideHistory); // donetest

// update an upcoming ride
router.post("/update", protect, updateUpcomingRide); // donetest

export default router;
