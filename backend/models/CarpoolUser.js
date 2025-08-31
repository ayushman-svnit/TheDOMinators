import mongoose from "mongoose";

const carpoolUserSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    ridesPosted: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ride"
        }
    ],
    ridesBooked: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ride"
        }
    ],
    ratingsReceived: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rating" 
    }],
    averageRating: {
        type: Number,
        default: 0
    },
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    }]

}, {timestamps: true});

export default mongoose.model("CarpoolUser", carpoolUserSchema);
