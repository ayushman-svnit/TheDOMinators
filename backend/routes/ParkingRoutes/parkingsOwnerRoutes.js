import express from "express";
import * as maptilerClient from "@maptiler/client";
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;

import Parking from "../../models/parking.js";
import { protect } from "../../middleware/auth.js";
import ParkingUser from "../../models/parkinguser.js";

const router = express.Router();

// ✅ Get parkings owned by current user
router.get("/", protect, async (req, res, next) => {
  try {
    const id = req.parkinguserId;
    const owner = await ParkingUser.findById(id).populate("parkings");
    res.status(200).json({ owner });
  } catch (err) {
    next(err);
  }
});

// ✅ Create a new parking lot
router.post("/new", protect, async (req, res, next) => {
  try {
    const id = req.user._id;
    const parkinguserId = req.parkinguserId;
    const {
      name,
      location,
      totalSlots,
      availableSlots,
      rate,
      EVCharging,
      BikeWash,
      openTime,
      closeTime,
    } = req.body;
    const parking = new Parking({
      name,
      location,
      totalSlots,
      availableSlots,
      rate,
      EVCharging,
      BikeWash,
      openTime,
      closeTime,
      owner: id,
    });

    const geoData = await maptilerClient.geocoding.forward(location, {
      limit: 1,
    });
    parking.geometry = geoData.features[0].geometry;

    const owner = await ParkingUser.findById(parkinguserId);
    owner.parkings.push(parking._id);

    await parking.save();
    await owner.save();

    res.status(201).json({ message: "Parking created", parking });
  } catch (err) {
    next(err);
  }
});

// ✅ Get a specific parking with full info
router.get("/:parkingId", protect, async (req, res, next) => {
  try {
    const { parkingId } = req.params;
    const parking = await Parking.findById(parkingId)
      .populate("users.user")
      .populate("owner");
    res.status(200).json({ parking });
  } catch (err) {
    next(err);
  }
});

// ✅ Update a parking
router.put("/:parkingId", protect, async (req, res, next) => {
  try {
    const { parkingId } = req.params;
    const { location } = req.body;

    const parking = await Parking.findByIdAndUpdate(parkingId, req.body, {
      new: true,
      runValidators: true,
    });

    const geoData = await maptilerClient.geocoding.forward(location, {
      limit: 1,
    });
    parking.geometry = geoData.features[0].geometry;

    await parking.save();

    res.status(200).json({ message: "Parking updated", parking });
  } catch (err) {
    next(err);
  }
});

// ✅ Delete a parking
router.delete("/:parkingId", protect, async (req, res, next) => {
  try {
    const { parkingId } = req.params;

    const parking = await Parking.findById(parkingId);
    await ParkingUser.updateMany(
      { user: { $in: parking.users.map((u) => u.user) } },
      { $pull: { parkings: parkingId } }
    );

    await parking.deleteOne();

    res.status(200).json({ message: "Parking deleted successfully" });
  } catch (err) {
    next(err);
  }
});

// ✅ Get parking for editing (optional — use `/parkings/:id` instead)
router.get("/:parkingId/edit", protect, async (req, res, next) => {
  try {
    const { parkingId } = req.params;
    const parking = await Parking.findById(parkingId);
    res.status(200).json({ parking });
  } catch (err) {
    next(err);
  }
});

// ✅ Remove a user from a parking slot
router.delete("/:parkingId/user/:userId", protect, async (req, res, next) => {
  try {
    const { parkingId, userId } = req.params;
    const parking = await Parking.findById(parkingId);
    const userEntry = parking.users.find((entry) =>
      entry.user.equals(userId)
    );

    if (userEntry) {
      if (userEntry.vehicle === "car") parking.availableSlots += 4;
      else if (userEntry.vehicle === "auto") parking.availableSlots += 2;
      else parking.availableSlots += 1;

      parking.users = parking.users.filter((entry) => !entry.user.equals(userId));
      await parking.save();

      await ParkingUser.updateOne(
        { user: userId },
        { $pull: { parkings: parkingId } }
      );

      res.status(200).json({ message: "User removed from parking" });
    } else {
      res.status(404).json({ message: "User not found in parking" });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
