// import Chat from "../models/Chat.js";
// import Message from "../models/Message.js";
// import CarpoolUser from "../models/CarpoolUser.js";

// // Create or get existing chat between two users
// export const getOrCreateChat = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     const currentUserId = req.user._id;

//     if (currentUserId.toString() === userId) {
//       return res.status(400).json({ message: "Cannot start a chat with yourself." });
//     }

//     let chat = await Chat.findOne({
//       participants: { $all: [currentUserId, userId], $size: 2 },
//     }).populate({
//   path: "participants",
//   populate: {
//     path: "user",
//     select: "username email"
//   }
// });

//     if (!chat) {
//       chat = new Chat({
//         participants: [currentUserId, userId],
//       });
//       await chat.save();

//       // Update each user's chat list
//       await Promise.all([
//         CarpoolUser.findByIdAndUpdate(currentUserId, {
//           $addToSet: { chats: chat._id },
//         }),
//         CarpoolUser.findByIdAndUpdate(userId, {
//           $addToSet: { chats: chat._id },
//         }),
//       ]);

//       await chat.populate({
//   path: "participants",
//   populate: {
//     path: "user",
//     select: "username email"
//   }
// });
//     }

//     return res.status(200).json(chat);
//   } catch (error) {
//     console.error("Error in getOrCreateChat:", error);
//     return res.status(500).json({ message: "Something went wrong while starting chat." });
//   }
// };

// // Send message inside a chat
// export const sendMessage = async (req, res) => {
//   try {
//     const { chatId, text } = req.body;
//     const senderId = req.user._id;

//     const chat = await Chat.findById(chatId);
//     if (!chat) return res.status(404).json({ message: "Chat not found" });

//     const message = new Message({
//       chat: chatId,
//       sender: senderId,
//       text,
//     });

//     await message.save();

//     chat.messages.push(message._id);
//     await chat.save();

//     await message.populate({
//   path: "participants",
//   populate: {
//     path: "user",
//     select: "username email"
//   }
// });

//     return res.status(200).json(message);
//   } catch (error) {
//     console.error("Error in sendMessage:", error);
//     return res.status(500).json({ message: "Something went wrong while sending message." });
//   }
// };

// // Get all chats for current user
// export const getUserChats = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const chats = await Chat.find({
//       participants: userId,
//     })
//       .populate({
//   path: "participants",
//   populate: {
//     path: "user",
//     select: "username email"
//   }
// })
//       .populate({
//         path: "messages",
//         populate: {
//           path: "sender",
//           select: "user",
//         },
//       })
//       .sort({ updatedAt: -1 });

//     return res.status(200).json(chats);
//   } catch (error) {
//     console.error("Error in getUserChats:", error);
//     return res.status(500).json({ message: "Something went wrong while fetching chats." });
//   }
// };

// // Get messages for a specific chat
// export const getChatMessages = async (req, res) => {
//   try {
//     const { chatId } = req.params;

//     const messages = await Message.find({ chat: chatId })
//       .populate("sender", "user")
//       .sort({ createdAt: 1 });

//     return res.status(200).json(messages);
//   } catch (error) {
//     console.error("Error in getChatMessages:", error);
//     return res.status(500).json({ message: "Something went wrong while fetching messages." });
//   }
// };

import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import CarpoolUser from "../models/CarpoolUser.js";
import Ride from "../models/Ride.js"; // needed for match validation
import mongoose from "mongoose";
import moment from "moment";


// now working

// Check if users were in the same ride (one as driver, one as passenger)
const isMatch = async (userA, userB) => {
  const userAId = new mongoose.Types.ObjectId(userA);
  const userBId = new mongoose.Types.ObjectId(userB);

  const ride = await Ride.findOne({
    status: { $in: ["completed", "upcoming"] },
    $or: [
      { driver: userAId, bookedUsers: { $in: [userBId] } },
      { driver: userBId, bookedUsers: { $in: [userAId] } },
    ],
  });

  console.log("🔍 Matching ride between", userAId, "and", userBId, "->", ride);
  return !!ride;
};

// ✅ Start or get chat
export const getOrCreateChat = async (req, res) => {
  try {
    const { userId } = req.body;

    const currentUser = await CarpoolUser.findOne({ user: req.user._id });
    if (!currentUser) {
      return res.status(404).json({ message: "Carpool profile not found." });
    }

    const currentUserId = currentUser._id;
    const otherUserId = new mongoose.Types.ObjectId(userId);

    // ✅ Block self-chat
    if (currentUserId.toString() === otherUserId.toString()) {
      return res.status(400).json({ message: "Cannot start a chat with yourself." });
    }
    // aa
    // ✅ Ensure other user exists
    const otherUser = await CarpoolUser.findById(otherUserId);
    if (!otherUser) {
      return res.status(404).json({ message: "User to chat with not found." });
    }

    // ✅ Check ride match
    const valid = await isMatch(currentUserId, otherUserId);
    if (!valid) {
      return res.status(403).json({ message: "You can only chat with matched carpool users." });
    }

    // ✅ Find or create chat
    let chat = await Chat.findOne({
      participants: { $all: [currentUserId, otherUserId], $size: 2 },
    }).populate({
      path: "participants",
      populate: { path: "user", select: "username" },
    });

    if (!chat) {
      chat = new Chat({ participants: [currentUserId, otherUserId] });
      await chat.save();

      await Promise.all([
        CarpoolUser.findByIdAndUpdate(currentUserId, { $addToSet: { chats: chat._id } }),
        CarpoolUser.findByIdAndUpdate(otherUserId, { $addToSet: { chats: chat._id } }),
      ]);

      await chat.populate({
        path: "participants",
        populate: { path: "user", select: "username" },
      });
    }

    return res.status(200).json(chat);
  } catch (error) {
    console.error("❌ Error in getOrCreateChat:", error);
    return res.status(500).json({ message: "Something went wrong while starting chat." });
  }
};


// ✅ Send a message
export const sendMessage = async (req, res) => {
  try {
    const { chatId, text } = req.body;
    const senderUser = await CarpoolUser.findOne({ user: req.user._id });
    if (!senderUser) {
      return res.status(404).json({ message: "Carpool profile not found." });
    }
    const senderId = senderUser._id;

    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    // Check if sender is a participant (convert to string)
    const isParticipant = chat.participants.some(participantId =>
      participantId.toString() === senderId.toString()
    );

    if (!isParticipant) {
      return res.status(403).json({ message: "You are not a participant in this chat." });
    }

    const message = new Message({
      chat: chatId,
      sender: senderId,
      text,
    });

    await message.save();

    chat.messages.push(message._id);
    await chat.save();

    await message.populate({
      path: "sender",
      populate: {
        path: "user",
        select: "username",
      },
    });

    // ✅ Emit message to Socket.IO room
    const io = req.app.get("io");
    io.to(chatId).emit("newMessage", message);

    return res.status(200).json(message);
  } catch (error) {
    console.error("Error in sendMessage:", error);
    return res.status(500).json({ message: "Something went wrong while sending message." });
  }
};


export const getUserChats = async (req, res) => {
  try {
    const carpoolUser = await CarpoolUser.findOne({ user: req.user._id });
    if (!carpoolUser) {
      return res.status(404).json({ message: "Carpool profile not found." });
    }

    const userId = carpoolUser._id;

    const chats = await Chat.find({ participants: userId })
      .populate({
        path: "participants",
        populate: { path: "user", select: "username" },
      })
      .populate({
        path: "messages",
        options: { sort: { createdAt: -1 } }, // All messages, latest first
        populate: {
          path: "sender",
          populate: { path: "user", select: "username" },
        },
      })
      .sort({ updatedAt: -1 });

    const formatted = chats.map(chat => {
      const otherUsers = chat.participants.filter(p => p._id.toString() !== userId.toString());
      const otherUsernames = otherUsers.map(u => u.user?.username || "Unknown");

      const cleanedMessages = chat.messages.map(msg => ({
        text: msg.text,
        username: msg.sender?.user?.username || "Unknown",
        timestamp: moment(msg.createdAt).fromNow(),
      }));

      return {
        _id: chat._id,
        participants: otherUsernames,
        messages: cleanedMessages, // all messages in latest-first order
      };
    });

    return res.status(200).json(formatted);
  } catch (error) {
    console.error("❌ Error in getUserChats:", error);
    return res.status(500).json({ message: "Something went wrong while fetching chats." });
  }
};




export const getChatMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const carpoolUser = await CarpoolUser.findOne({ user: req.user._id });
    if (!carpoolUser) {
      return res.status(404).json({ message: "Carpool profile not found." });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    const isParticipant = chat.participants.some(participantId =>
      participantId.toString() === carpoolUser._id.toString()
    );
    if (!isParticipant) {
      return res.status(403).json({ message: "You are not authorized to view this chat." });
    }

    const messages = await Message.find({ chat: chatId })
      .select("text sender createdAt")
      .populate({
        path: "sender",
        select: "user",
        populate: {
          path: "user",
          select: "username",
        },
      })
      .sort({ createdAt: 1 });

    // Format messages
    const formatted = messages.map(msg => ({
      _id: msg._id,
      text: msg.text,
      username: msg.sender?.user?.username || "Unknown",
      timestamp: moment(msg.createdAt).fromNow()  // e.g. "5 minutes ago"
    }));

    return res.status(200).json(formatted);
  } catch (error) {
    console.error("❌ Error in getChatMessages:", error);
    return res.status(500).json({ message: "Something went wrong while fetching messages." });
  }
};

export const getAllMessages = async (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).json({ message: 'Unauthorized admin access' });
  } try {
    const messages = await Message.find()
      .populate({
        path: "sender",
        populate: {
          path: "user",
          select: "username",
        },
      })
      .populate({
        path: "chat",
        select: "_id participants",
        populate: {
          path: "participants",
          populate: {
            path: "user",
            select: "username"
          }
        }
      })
      .sort({ createdAt: -1 });

    const formatted = messages.map(msg => ({
      _id: msg._id,
      text: msg.text,
      chatId: msg.chat?._id,
      participants: msg.chat?.participants?.map(p => p.user?.username || "Unknown"),
      sender: msg.sender?.user?.username || "Unknown",
      timestamp: moment(msg.createdAt).format("YYYY-MM-DD HH:mm:ss")
    }));

    return res.status(200).json(formatted);
  } catch (error) {
    console.error("❌ Error in getAllMessages:", error);
    return res.status(500).json({ message: "Something went wrong while fetching all messages." });
  }
};



