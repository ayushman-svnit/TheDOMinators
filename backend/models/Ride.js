import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CarpoolUser",
        required: true
    },
    pickupLocation: {
        type: String,
        required: true
    },
    dropLocation: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    availableSeats: {
        type: Number,
        required: true
    },
    vehicleDetails: {
  model: { type: String, required: true },
  number: { type: String, required: true }
},
    
    pricePerSeat: {
        type: Number,
        required: true
    },
    cancellationCharge: {
        type: Number,
        default: 0
    },
    bookedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CarpoolUser"
    }],
    status: {
        type: String,
        enum: ["upcoming", "completed", "cancelled"],
        default: "upcoming"
    }
}, {timestamps: true});

export default mongoose.model("Ride", rideSchema)