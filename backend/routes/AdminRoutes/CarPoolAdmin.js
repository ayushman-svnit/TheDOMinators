import express from "express";
// import Message from "../../models/Message.js";
// import Chat from "../../models/Chat.js";
import { getAllMessages } from "../../controllers/chatController.js";
import { getAllRatingsAdmin } from "../../controllers/ratingController.js";
import { getAllJoinRequestsAdmin } from "../../controllers/requestController.js";
import { getAllRidesAdminGrouped } from "../../controllers/rideController.js";

const router = express.Router();

router.get("/messages",  getAllMessages);
router.get("/ratings",  getAllRatingsAdmin);
router.get("/requests",  getAllJoinRequestsAdmin);
router.get("/rides",  getAllRidesAdminGrouped);

export default router;

