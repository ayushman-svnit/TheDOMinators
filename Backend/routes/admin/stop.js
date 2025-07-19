import express from "express";
import { getStopsList, createStop, updateStop, deleteStop } from "../../controllers/admin/stop.js";

const router = express.Router();

// Get all stops
router.get('/', getStopsList);

// Create a stop
router.post('/', createStop);

// Update a stop
router.put('/:id', updateStop);

// Delete a stop
router.delete('/:id', deleteStop);

export default router;
