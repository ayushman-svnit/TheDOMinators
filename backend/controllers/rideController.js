import Ride from "../models/Ride.js";
import User from "../models/User.js";
import CarpoolUser from "../models/CarpoolUser.js";
import JoinRequest from "../models/JoinRequest.js";

export const postRide = async (req, res) => {

  try {
    const {
      pickupLocation,
      dropLocation,
      time,
      date,
      availableSeats,
      vehicleDetails,
      pricePerSeat
    } = req.body;

    // Step 1: Find the CarpoolUser associated with this User
    const carpoolUser = await CarpoolUser.findOne({ user: req.user._id });

    if (!carpoolUser) {
      return res.status(404).json({ message: "CarpoolUser profile not found" });
    }

    // Step 2: Use CarpoolUser _id in the ride
    const ride = new Ride({
      driver: carpoolUser._id,
      pickupLocation,
      dropLocation,
      date,
      time,
      availableSeats,
      vehicleDetails,
      pricePerSeat
    });


    await ride.save();
    carpoolUser.ridesPosted.push(ride._id);
    await carpoolUser.save();


    res.status(201).json({ message: "Ride posted successfully", ride });
  } catch (error) {
    res.status(500).json({ message: "Error posting ride", error: error.message });
  }
};

export const searchRides = async (req, res) => {
  try {
    const { pickupLocation, dropLocation, date } = req.query;

    const query = {};

    if (pickupLocation) {
      query.pickupLocation = { $regex: pickupLocation, $options: "i" };
    }

    if (dropLocation) {
      query.dropLocation = { $regex: dropLocation, $options: "i" };
    }

    if (date) {
      query.date = date;
    }

    const rides = await Ride.find(query).populate({
      path: "driver",
      populate: [
        {
          path: "user",
          model: "User",
          select: "username email"
        },
        {
          path: "ratingsReceived",
          model: "Rating",
          select: "score comment"
        }
      ]
    });

    const result = rides.map((ride) => {
      const { driver, ...rest } = ride.toObject();

      return {
        ...rest,
        driver: {
          username: driver?.user?.username || "N/A",
          email: driver?.user?.email || "N/A",
          averageRating: driver?.averageRating || 0,
          feedbacks: driver?.ratingsReceived?.map(r => ({
            score: r.score,
            comment: r.comment
          })) || []
        }
      };
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error searching ride", error: error.message });
  }
};


export const getPostedRides = async (req, res) => {
  try {
    const carpoolUser = await CarpoolUser.findOne({ user: req.user._id });
    if (!carpoolUser)
      return res.status(404).json({ message: "Carpool user not found" });

    const rides = await Ride.find({ driver: carpoolUser._id })
      .populate({
        path: "bookedUsers",
        populate: {
          path: "user",
          select: "username email"
        }
      });

    // Format rides with only username, email, and seatsBooked
    const formattedRides = await Promise.all(
      rides.map(async (ride) => {
        const rideObj = ride.toObject();

        const bookedUsers = await Promise.all(
          ride.bookedUsers.map(async (bookedUser) => {
            const joinRequest = await JoinRequest.findOne({
              ride: ride._id,
              fromUser: bookedUser._id,
              status: "accepted"
            });

            return {
              username: bookedUser.user.username,
              email: bookedUser.user.email,
              seatsBooked: joinRequest ? joinRequest.seatsRequested : 0
            };
          })
        );

        return {
          _id: ride._id,
          pickupLocation: ride.pickupLocation,
          dropLocation: ride.dropLocation,
          date: ride.date,
          time: ride.time,
          status: ride.status,
          pricePerSeat: ride.pricePerSeat,
          vehicleDetails: ride.vehicleDetails,
          availableSeats: ride.availableSeats,
          bookedUsers
        };
      })
    );

    res.status(200).json(formattedRides);
  } catch (error) {
    res.status(500).json({
      message: "Error searching your posted rides",
      error: error.message
    });
  }
};


export const getBookedRides = async (req, res) => {
  try {
    const carpoolUser = await CarpoolUser.findOne({ user: req.user._id });
    if (!carpoolUser) {
      return res.status(404).json({ message: "Carpool user not found" });
    }

    const rides = await Ride.find({ bookedUsers: carpoolUser._id })
      .populate({
        path: "driver",
        populate: { path: "user", select: "username email" } // driver's name
      })
      .populate("pickupLocation dropLocation");

    // Now also fetch join requests made by this user
    const requests = await JoinRequest.find({
      fromUser: carpoolUser._id,
      status: "accepted"
    });

    // Map rideId to seatsRequested
    const seatsMap = {};
    requests.forEach(req => {
      seatsMap[req.ride.toString()] = req.seatsRequested;
    });

    // Combine data
    const formatted = rides.map(ride => ({
      rideId: ride._id,
      driverName: ride.driver?.user?.username || "Unknown",
      pickup: ride.pickupLocation,
      drop: ride.dropLocation,
      status: ride.status,
      date: ride.date,
      time: ride.time,
      seatsBooked: seatsMap[ride._id.toString()] || 0,
      pricePerSeat: ride.pricePerSeat,
      totalFare: ride.pricePerSeat * (seatsMap[ride._id.toString()] || 0)
    }));

    res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booked rides", error: error.message });
  }
};


export const getRideHistory = async (req, res) => {
  try {
    const carpoolUser = await CarpoolUser.findOne({ user: req.user._id });
    if (!carpoolUser) {
      return res.status(404).json({ message: "Carpool user not found" });
    }

    const rides = await Ride.find({
      $or: [
        { driver: carpoolUser._id },
        { bookedUsers: carpoolUser._id }
      ],
      status: { $in: ["completed", "cancelled"] }
    })
      .populate({
        path: "driver",
        select: "_id user",
        populate: {
          path: "user",
          select: "username email"
        }
      })

      .populate({
        path: "bookedUsers",
        populate: { path: "user", select: "username email" },
        select: "user"
      })
      .select("pickupLocation dropLocation date time status vehicleDetails driver bookedUsers");

    const cleanedHistory = [];

    for (const ride of rides) {
      const rideData = {
        _id: ride._id,
        pickupLocation: ride.pickupLocation,
        dropLocation: ride.dropLocation,
        date: ride.date,
        time: ride.time,
        status: ride.status,
        vehicleDetails: ride.vehicleDetails,
        driver: {
          _id: ride.driver?._id,
          username: ride.driver?.user?.username,
          email: ride.driver?.user?.email
        },

        bookedUsers: [],
      };

      // Fetch all join requests for this ride
      const joinRequests = await JoinRequest.find({
        ride: ride._id,
        status: "accepted" // ✅ only accepted requests
      })
        .populate({
          path: "fromUser", // ✅ this matches your schema
          populate: { path: "user", select: "username email" }
        })

      // Add each booked user's name, email, and seatsBooked
      for (const req of joinRequests) {
        if (req.fromUser?.user) {
          rideData.bookedUsers.push({
            _id: req.fromUser._id,
            username: req.fromUser.user.username,
            email: req.fromUser.user.email,
            seatsBooked: req.seatsRequested,
          });
        }
      }


      cleanedHistory.push(rideData);
    }

    res.status(200).json(cleanedHistory);
  } catch (err) {
    res.status(500).json({ message: "Error fetching ride history", error: err.message });
  }
};


export const updateUpcomingRide = async (req, res) => {
  try {
    const { rideId, status } = req.body;

    // 1. Only allow valid status changes
    if (!["cancelled", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value. Use 'cancelled' or 'completed'." });
    }

    // 2. Check if ride exists
    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: "This ride doesn't even exist" });
    }

    // 3. Prevent redundant status changes
    if (ride.status === "completed" || ride.status === "cancelled") {
      return res.status(400).json({ message: `Ride is already ${ride.status}. Cannot update.` });
    }

    // ✅ Get the CarpoolUser of the logged-in user
    const carpoolUser = await CarpoolUser.findOne({ user: req.user._id });
    if (!carpoolUser) {
      return res.status(404).json({ message: "Carpool user not found" });
    }

    // ✅ Compare using CarpoolUser ID
    if (ride.driver.toString() !== carpoolUser._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to update this ride" });
    }

    // 5. Update ride status
    ride.status = status;
    await ride.save();

    return res.status(200).json({ message: `Ride status updated to '${status}' successfully` });

  } catch (error) {
    console.error("Update Ride Error:", error);
    return res.status(500).json({ message: "Failed to update the ride", error: error.message });
  }
};

export const getRidesforChat = async (req, res) => {
  try {
    const carpoolUser = await CarpoolUser.findOne({ user: req.user._id });
    if (!carpoolUser) {
      return res.status(404).json({ message: "Carpool user not found" });
    }

    const rides = await Ride.find({
      $or: [
        { driver: carpoolUser._id },
        { bookedUsers: carpoolUser._id }
      ],
      status: { $in: ["completed", "upcoming"] }
    })
      .populate({
        path: "driver",
        select: "_id user",
        populate: {
          path: "user",
          select: "username email"
        }
      })

      .populate({
        path: "bookedUsers",
        populate: { path: "user", select: "username email" },
        select: "user"
      })
      .select("pickupLocation dropLocation date time status vehicleDetails driver bookedUsers");

    const cleanedHistory = [];

    for (const ride of rides) {
      const rideData = {
        _id: ride._id,
        pickupLocation: ride.pickupLocation,
        dropLocation: ride.dropLocation,
        date: ride.date,
        time: ride.time,
        status: ride.status,
        vehicleDetails: ride.vehicleDetails,
        driver: {
          _id: ride.driver?._id,
          username: ride.driver?.user?.username,
          email: ride.driver?.user?.email
        },

        bookedUsers: [],
      };

      // Fetch all join requests for this ride
      const joinRequests = await JoinRequest.find({
        ride: ride._id,
        status: "accepted" // ✅ only accepted requests
      })
        .populate({
          path: "fromUser", // ✅ this matches your schema
          populate: { path: "user", select: "username email" }
        })

      // Add each booked user's name, email, and seatsBooked
      for (const req of joinRequests) {
        if (req.fromUser?.user) {
          rideData.bookedUsers.push({
            _id: req.fromUser._id,
            username: req.fromUser.user.username,
            email: req.fromUser.user.email,
            seatsBooked: req.seatsRequested,
          });
        }
      }


      cleanedHistory.push(rideData);
    }

    res.status(200).json(cleanedHistory);
  } catch (err) {
    res.status(500).json({ message: "Error fetching ride history", error: err.message });
  }
}

export const getAllRidesAdminGrouped = async (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).json({ message: 'Unauthorized admin access' });
  }
  try {
    const rides = await Ride.find()
      .populate({
        path: "driver",
        select: "user",
        populate: {
          path: "user",
          select: "username email"
        }
      })
      .populate({
        path: "bookedUsers",
        populate: {
          path: "user",
          select: "username email"
        }
      })
      .sort({ date: -1, time: -1 }); // Latest rides first

    // Fetch all accepted join requests to calculate booked seats
    const allAcceptedRequests = await JoinRequest.find({ status: "accepted" });

    // Map: rideId => [{ fromUser, seatsRequested }]
    const seatMap = {};
    allAcceptedRequests.forEach(req => {
      const rideId = req.ride.toString();
      if (!seatMap[rideId]) seatMap[rideId] = [];
      seatMap[rideId].push({
        user: req.fromUser,
        seatsRequested: req.seatsRequested
      });
    });

    // Format rides and split into 3 arrays
    const upcoming = [], cancelled = [], completed = [];

    for (const ride of rides) {
      const rideObj = {
        _id: ride._id,
        pickupLocation: ride.pickupLocation,
        dropLocation: ride.dropLocation,
        date: ride.date,
        time: ride.time,
        status: ride.status,
        vehicleDetails: ride.vehicleDetails,
        availableSeats: ride.availableSeats,
        pricePerSeat: ride.pricePerSeat,
        driver: {
          _id: ride.driver?._id,
          username: ride.driver?.user?.username,
          email: ride.driver?.user?.email
        },
        bookedUsers: []
      };

      const requests = seatMap[ride._id.toString()] || [];

      for (const req of requests) {
        const bookedUser = ride.bookedUsers.find(
          bu => bu._id.toString() === req.user.toString()
        );
        if (bookedUser?.user) {
          rideObj.bookedUsers.push({
            _id: bookedUser._id,
            username: bookedUser.user.username,
            email: bookedUser.user.email,
            seatsBooked: req.seatsRequested
          });
        }
      }

      if (ride.status === "upcoming") upcoming.push(rideObj);
      else if (ride.status === "cancelled") cancelled.push(rideObj);
      else if (ride.status === "completed") completed.push(rideObj);
    }

    res.status(200).json({
      upcoming,
      cancelled,
      completed
    });

  } catch (err) {
    console.error("❌ Admin Ride Fetch Error:", err);
    res.status(500).json({
      message: "Error fetching ride data for admin",
      error: err.message
    });
  }
};
