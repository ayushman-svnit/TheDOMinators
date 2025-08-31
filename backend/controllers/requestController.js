import JoinRequest from "../models/JoinRequest.js";
import Ride from "../models/Ride.js";
import CarpoolUser from "../models/CarpoolUser.js";



export const sendJoinRequest = async (req, res) => {
  try {
    const { rideId, seatsRequested } = req.body;

    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ message: "Ride not found" });

   const carpoolUser = await CarpoolUser.findOne({ user: req.user._id });
    if (!carpoolUser) {
      return res.status(404).json({ message: "Carpool user not found" });
    }

    // ✅ Compare using CarpoolUser ID
    if (ride.driver.toString() == carpoolUser._id.toString()) {
      return res.status(403).json({ message: "You are the driver. you cant sent request" });
    }

    // Check if requested seats are available
    if (ride.availableSeats < seatsRequested) {
  return res.status(400).json({ message: "Not enough seats available" });
}


    // ✅ GET THE CARPOOL USER ID
    const fromCarpoolUser = await CarpoolUser.findOne({ user: req.user._id });
    if (!fromCarpoolUser) {
      return res.status(404).json({ message: "CarpoolUser not found" });
    }

    // also handle duplicate requests
    const existingRequest = await JoinRequest.findOne({
      ride: ride._id,
      fromUser: fromCarpoolUser._id,  // ✅ use CarpoolUser _id
      status: "pending",
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Join request already sent" });
    }

    const newRequest = new JoinRequest({
      ride: ride._id,
      fromUser: fromCarpoolUser._id,  // ✅ fix here
      toUser: ride.driver,
      seatsRequested,
    });

    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(500).json({
      message: "Error sending join request",
      error: error.message,
    });
  }
};


// getting all join requests received by logged-in user:


export const getReceivedRequests = async (req, res) => {
  try {
    const carpoolUser = await CarpoolUser.findOne({ user: req.user._id });

    if (!carpoolUser) {
      return res.status(404).json({ message: "Carpool user not found" });
    }

    const requests = await JoinRequest.find({ toUser: carpoolUser._id })
      .populate("ride", "pickupLocation dropLocation date")
      .populate({
        path: "fromUser",
        populate: {
          path: "user",
          model: "User",
          select: "username email",
        },
      });

    // flatten fromUser -> user
    const flattenedRequests = requests.map((req) => {
      const { fromUser, ...rest } = req.toObject();
      return {
        ...rest,
        fromUser: {
          _id: fromUser?.user?._id || null,
          username: fromUser?.user?.username || null,
          email: fromUser?.user?.email || null,
        },
      };
    });

    res.status(200).json(flattenedRequests);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching received requests",
      error: error.message,
    });
  }
};


// accept or reject a join request
export const updateJoinRequestStatus = async (req,res) => {
    try {
        const {
            requestId
        } = req.params;
        const {status} = req.body; // "accepted or rejected"

        if(!["accepted", "rejected"].includes(status)){
            return res.status(400).json({message: "Invalid status value"})
        }

        const request = await JoinRequest.findById(requestId).populate("ride");
        if(!request) return res.status(400).json({message: "Request not found"});

        // only the ride owner/driver can update
        const carpoolUser = await CarpoolUser.findOne({ user: req.user._id });
if (!carpoolUser || request.toUser.toString() !== carpoolUser._id.toString()) {
  return res.status(403).json({ message: "Not authorised to update this request" });
}


        request.status = status;
        await request.save();

        // If accepted, add user to ride's bookedUsers
        if(status === "accepted"){
            const ride = await Ride.findById(request.ride._id);
            
           ride.bookedUsers.push(request.fromUser);
          ride.availableSeats -= request.seatsRequested;

          if (ride.availableSeats < 0) {
            return res.status(400).json({ message: "Not enough seats left to accept this request" });
          }

await ride.save();

        }
        res.status(200).json({message: `Request ${status}`})
    } catch (error) {
         res.status(500).json({ message: "Error updating request", error: error.message });
    }
};

// get join requests sent by the user(for their own tracking)
export const getSentRequests = async(req, res) => {
  try {
    const carpoolUser = await CarpoolUser.findOne({ user: req.user._id });
    if (!carpoolUser) {
      return res.status(404).json({ message: "Carpool user not found" });
    }

    const requests = await JoinRequest.find({ fromUser: carpoolUser._id })
      .populate("ride", "pickupLocation dropLocation date")
      .populate({
        path: "toUser",
        populate: {
          path: "user",
          model: "User",
          select: "username email"
        }
      });

    // Optional: flatten toUser -> user if needed
    const flattened = requests.map((req) => {
      const { toUser, ...rest } = req.toObject();
      return {
        ...rest,
        toUser: {
          _id: toUser?.user?._id || null,
          username: toUser?.user?.username || null,
          email: toUser?.user?.email || null,
        },
      };
    });

    res.status(200).json(flattened);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sent requests", error: error.message });
  }
};

export const getAllJoinRequestsAdmin = async (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).json({ message: 'Unauthorized admin access' });
  }
  try {
    const requests = await JoinRequest.find()
      .populate({
        path: "ride",
        select: "pickupLocation dropLocation date availableSeats status"
      })
      .populate({
        path: "fromUser",
        populate: {
          path: "user",
          select: "username email"
        }
      })
      .populate({
        path: "toUser",
        populate: {
          path: "user",
          select: "username email"
        }
      })
      .sort({ createdAt: -1 });

    const formatted = requests.map(req => ({
      _id: req._id,
      status: req.status,
      seatsRequested: req.seatsRequested,
      ride: {
        id: req.ride?._id,
        pickupLocation: req.ride?.pickupLocation,
        dropLocation: req.ride?.dropLocation,
        date: req.ride?.date,
        availableSeats: req.ride?.availableSeats,
        status: req.ride?.status
      },
      fromUser: {
        id: req.fromUser?._id,
        username: req.fromUser?.user?.username,
        email: req.fromUser?.user?.email
      },
      toUser: {
        id: req.toUser?._id,
        username: req.toUser?.user?.username,
        email: req.toUser?.user?.email
      },
      createdAt: req.createdAt,
      updatedAt: req.updatedAt
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error("❌ Error in getAllJoinRequestsAdmin:", error);
    res.status(500).json({ message: "Failed to fetch all join requests." });
  }
};

