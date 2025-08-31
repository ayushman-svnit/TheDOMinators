import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    ride: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ride",
        required: true
    },
    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CarpoolUser",
        required: true
    },
    toUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CarpoolUser",
        required: true
    },
    score: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String
    }

}, {timestamps: true})

export default mongoose.model("Rating", ratingSchema);