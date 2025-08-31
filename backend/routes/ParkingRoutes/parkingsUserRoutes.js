import express from "express";
import Parking from "../../models/parking.js";
import ParkingUser from "../../models/parkinguser.js";
import { protect } from "../../middleware/auth.js";

const router = express.Router();

// ✅ GET all available & booked parkings for this user
router.get("/", protect, async (req, res, next) => {
  try {
    const id = req.parkinguserId;
    const user = await ParkingUser.findById(id).populate("parkings");
    const allParkings = await Parking.find({ _id: { $nin: user.parkings } });

    res.status(200).json({ user, allParkings });
  } catch (err) {
    next(err);
  }
});

// ✅ GET single parking details (for booking view)
router.get("/:parkingId", protect, async (req, res, next) => {
  try {
    const { parkingId } = req.params;
    const parking = await Parking.findById(parkingId).populate("owner");

    if (!parking) return res.status(404).json({ message: "Parking not found" });

    res.status(200).json({ parking });
  } catch (err) {
    next(err);
  }
});

// ✅ POST to book a parking
router.post("/:parkingId", protect, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const parkinguserId = req.parkinguserId;
    const { parkingId } = req.params;
    const { vehicle } = req.body;

    const requiredSlots =
      vehicle === "car" ? 4 : vehicle === "auto" ? 2 : 1;

    const parking = await Parking.findById(parkingId);
    if (!parking) return res.status(404).json({ message: "Parking not found" });

    if (parking.availableSlots < requiredSlots) {
      return res
        .status(400)
        .json({ message: "Not enough slots available", available: parking.availableSlots });
    }

    parking.availableSlots -= requiredSlots;
    parking.users.push({ user: userId, vehicle });

    const parkinguser = await ParkingUser.findById(parkinguserId);
    parkinguser.parkings.push(parking._id);

    await parking.save();
    await parkinguser.save();

    res.status(200).json({ message: "Parking booked successfully", parking });
  } catch (err) {
    next(err);
  }
});

// ✅ DELETE booking
router.delete("/:parkingId", protect, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const parkinguserId = req.parkinguserId;
    const { parkingId } = req.params;

    const parking = await Parking.findById(parkingId);
    const parkinguser = await ParkingUser.findById(parkinguserId);

    const booking = parking.users.find(entry => entry.user.equals(userId));
    if (!booking) {
      return res.status(404).json({ message: "User booking not found in parking" });
    }

    // Adjust slot count based on vehicle
    if (booking.vehicle === "car") parking.availableSlots += 4;
    else if (booking.vehicle === "auto") parking.availableSlots += 2;
    else parking.availableSlots += 1;

    // Remove user from parking
    parking.users = parking.users.filter(entry => !entry.user.equals(userId));
    await parking.save();

    // Remove parking from user's bookings
    await ParkingUser.updateOne(
      { _id: parkinguserId },
      { $pull: { parkings: parkingId } }
    );

    res.status(200).json({ message: "Left parking successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;
