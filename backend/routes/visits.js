import express from "express";
import {updateVisits,getVisits,getBannedUserCounts,getParkingStats,getTotalStops} from "../controllers/visitController.js";

const router = express.Router();

router.post("/",updateVisits)
router.get("/",getVisits);
router.get("/user",getBannedUserCounts);
router.get("/parking",getParkingStats);
router.get("/stop",getTotalStops);

export default router;
