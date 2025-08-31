import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "CarpoolUser" },
  text: String,
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Message", messageSchema);
