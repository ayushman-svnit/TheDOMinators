import Visit from "../models/visits.js";
import User from "../models/User.js";
import Parking from "../models/parking.js";
import Stop from "../models/stop.js";

export const updateVisits = async (req, res) => {
  try {
    const visitDoc = await Visit.findOne();
    visitDoc.visits += 1;
    await visitDoc.save();

    res.status(200).json({ visits: visitDoc.visits });
  } catch (error) {
    console.error("Error updating visits:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getVisits = async (req, res) => {
  try {
    const visitDoc = await Visit.findOne();

    if (!visitDoc) {
      return res.status(404).json({ message: "Visit record not found" });
    }

    res.status(200).json({ visits: visitDoc.visits });
  } catch (err) {
    console.error("Error fetching visits:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getBannedUserCounts = async (req, res) => {
  try {
    const bannedCount = await User.countDocuments({ isBanned: true });
    const notBannedCount = await User.countDocuments({ isBanned: false });

    res.status(200).json({
      banned: bannedCount,
      notBanned: notBannedCount,
    });
  } catch (err) {
    console.error("Error counting users:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getParkingStats = async (req, res) => {
  try {
    // Total number of parking documents
    const totalParkingSpots = await Parking.countDocuments();

    // Unique owners using distinct
    const uniqueOwners = await Parking.distinct("owner");
    const totalUniqueOwners = uniqueOwners.length;

    res.status(200).json({
      totalParkingSpots,
      totalUniqueOwners,
    });
  } catch (err) {
    console.error("Error fetching parking stats:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getTotalStops = async (req, res) => {
  try {
    const totalStops = await Stop.countDocuments();
    res.status(200).json({ totalStops });
  } catch (err) {
    console.error("Error fetching stop count:", err);
    res.status(500).json({ message: "Server error" });
  }
};

