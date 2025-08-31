// Key Features to Cover:

// Post a rating (ride complete → rate the driver/passenger)

// Prevent duplicate ratings for same ride by same user

// Update toUser.ratingsReceived[] and averageRating accordingly

// (Optional) Get all ratings for a user



import Ride from "../models/Ride.js";
import Rating from "../models/Rating.js";
import CarpoolUser from "../models/CarpoolUser.js";

// 1. post a rating
export const rateUser = async(req,res) => {
    try {
        const {
            rideId,
            toUserId,
            score,
            comment
        } = req.body;

        const userId = req.user._id;

        const fromCarpoolUser = await CarpoolUser.findOne({ user: userId });
        const toUser = await CarpoolUser.findById(toUserId);
        const ride = await Ride.findById(rideId);

        if (!fromCarpoolUser || !toUser || !ride) {
            return res.status(400).json({ message: "Insufficient credentials provided." });
        }

        if (ride.status == "upcoming") {
            return res.status(400).json({ message: "Invalid or incomplete ride" });
        }

        if (fromCarpoolUser._id.toString() === toUserId) {
            return res.status(403).json({ message: "You can't rate yourself." });
        }

        const existingRating = await Rating.findOne({
            ride: rideId,
            fromUser: fromCarpoolUser._id,
            toUser: toUserId
        });

        if (existingRating) {
            return res.status(409).json({ message: "You have already rated this user for this ride." });
        }

        const newRating = new Rating({
            ride: rideId,
            fromUser: fromCarpoolUser._id,
            toUser: toUserId,
            score,
            comment
        });

        await newRating.save();

        toUser.ratingsReceived.push(newRating._id);

        const ratings = await Rating.find({ toUser: toUserId });

        const totalScore = ratings.reduce((sum, r) => sum + r.score, 0);
        const avgRating = totalScore / ratings.length;

        toUser.averageRating = avgRating.toFixed(2);
        await toUser.save();

        res.status(201).json({ message: "Rating submitted successfully." });
    } catch (error) {
        console.error("Error rating user:", error);
        res.status(500).json({ message: "Something went wrong while rating." });
    }
};

// get all ratings
export const getUserRatings = async (req, res) => {
  try {
    const { userId } = req.params;

    const ratings = await Rating.find({ toUser: userId })
      .populate({
        path: "fromUser",
        populate: {
          path: "user",
          select: "username email"
        }
      })
      .populate("ride", "pickupLocation dropLocation date _id");

    const formattedRatings = ratings.map(rating => ({
      score: rating.score,
      comment: rating.comment,
      fromUser: {
        username: rating.fromUser?.user?.username,
        email: rating.fromUser?.user?.email
      },
      ride: {
        pickupLocation: rating.ride?.pickupLocation,
        dropLocation: rating.ride?.dropLocation,
        date: rating.ride?.date,
        id: rating.ride?._id
      }
    }));

    const averageRating =
      ratings.reduce((sum, r) => sum + r.score, 0) / (ratings.length || 1);

    res.status(200).json({
      averageRating: parseFloat(averageRating.toFixed(2)),
      ratings: formattedRatings
    });
  } catch (error) {
    console.error("Error fetching ratings:", error);
    res.status(500).json({ message: "Failed to fetch user ratings" });
  }
};

// ✅ Admin: Get all ratings in the system
export const getAllRatingsAdmin = async (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).json({ message: 'Unauthorized admin access' });
  }
  try {
    const ratings = await Rating.find()
      .populate({
        path: "fromUser",
        populate: { path: "user", select: "username email" }
      })
      .populate({
        path: "toUser",
        populate: { path: "user", select: "username email" }
      })
      .populate("ride", "pickupLocation dropLocation date");

    const formatted = ratings.map(rating => ({
      _id: rating._id,
      score: rating.score,
      comment: rating.comment,
      ride: {
        id: rating.ride?._id,
        pickupLocation: rating.ride?.pickupLocation,
        dropLocation: rating.ride?.dropLocation,
        date: rating.ride?.date
      },
      fromUser: {
        username: rating.fromUser?.user?.username,
        email: rating.fromUser?.user?.email
      },
      toUser: {
        username: rating.toUser?.user?.username,
        email: rating.toUser?.user?.email
      },
      timestamp: rating.createdAt
    }));

    return res.status(200).json(formatted);
  } catch (error) {
    console.error("❌ Error in getAllRatingsAdmin:", error);
    res.status(500).json({ message: "Failed to fetch all ratings." });
  }
};





