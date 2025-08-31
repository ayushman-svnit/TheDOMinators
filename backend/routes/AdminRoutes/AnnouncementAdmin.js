import { createAnnouncement } from "../../controllers/announcementController.js";
import express from "express";
import { getAnnouncements } from "../../controllers/announcementController.js";
import { deleteAnnouncement } from "../../controllers/announcementController.js";
import { updateAnnouncement } from "../../controllers/announcementController.js";

const router = express.Router();

router.post("/", createAnnouncement);
router.get("/", getAnnouncements);
router.delete("/:id", deleteAnnouncement);
router.put("/:id", updateAnnouncement);

export default router;
