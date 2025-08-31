import express from 'express';

const router = express.Router();
import { getAnnouncements} from '../controllers/announcementController.js';
import e from 'express';

// Route to get all announcements
router.get("/", getAnnouncements);

export default router;