import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import http from "http";
import * as maptilerClient from '@maptiler/client';
import { Server as SocketIO } from "socket.io";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import requestRoutes from "./routes/requests.js";
import rideRoutes from "./routes/rides.js";
import chatRoutes from "./routes/chat.js";
import ratingRoutes from "./routes/ratings.js";
import configurePassport from "./config/passport.js";
import carpoolRoutes from "./routes/carpool.js";
import registerAdmin from "./routes/AdminRoutes/RegisterAdmin.js"
import parkingAdmin from './routes/AdminRoutes/ParkingAdmin.js';
import stopAdmin from "./routes/AdminRoutes/StopAdmin.js";
import carpoolAdmin from "./routes/AdminRoutes/CarPoolAdmin.js";
import functionAdmin from "./routes/AdminRoutes/FunctionAdmin.js";
import parkingRoutes from './routes/ParkingRoutes/parkingRoutes.js';
import parkingsUserRoutes from './routes/ParkingRoutes/parkingsUserRoutes.js';
import parkingsOwnerRoutes from './routes/ParkingRoutes/parkingsOwnerRoutes.js';
import visitRoutes from './routes/visits.js';
import clearParking from './utils/clearParking.js';

dotenv.config(); 
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",  // ✅ must be exact
  credentials: true
}));

maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;

// 💡 SESSION
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    secure: false
  }
}));

// 💡 PASSPORT
configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  req.isAdmin = req.session.isAdmin || false;
  next();
}); 

// app.get('/api/auth/me', (req, res) => {
//   console.log("User from session:", req.user);
//   if (req.isAdmin)
//     return res.json({ isAdmin: req.isAdmin });  
//   else if (!req.isAuthenticated()) {
//     return res.status(401).json({ user: null, isAdmin: false });
//   } 
//   res.json({
//     _id: req.user._id,
//     username: req.user.username, 
//     email: req.user.email,
//     isAdmin: req.isAdmin
//   });
// });

app.use('/api/parkings/:subroute', (req, res, next) => {
  req.parkinguserId = req.session.parkinguserId;
  next();
});

// 💡 ROUTES
app.use("/api/users", authRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/carpool", carpoolRoutes);
app.use('/api/parkings', parkingRoutes);
app.use('/api/admin', registerAdmin);
app.use('/api/admin/parkingusers', parkingAdmin);
app.use('/api/admin', carpoolAdmin);
app.use("/api/admin/stops", stopAdmin);
app.use("/api/admin", functionAdmin);
app.use('/api/parkings/user', parkingsUserRoutes);
app.use('/api/parkings/owner', parkingsOwnerRoutes);
app.use('/api/visits',visitRoutes)

// 🧠 SOCKET.IO
const server = http.createServer(app);
const io = new SocketIO(server, {
  cors: {
    origin: "https://transitflow-delta.vercel.app",
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  socket.on("joinRoom", ({ chatId }) => {
    socket.join(chatId);
    console.log(`Socket ${socket.id} joined room ${chatId}`);
  });

  socket.on("sendMessage", ({ chatId, message }) => {
    io.to(chatId).emit("newMessage", message); // ✅ broadcast to ALL clients in room
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

app.set("io", io);


// 💡 DB connect and start server
connectDB()
  .then(() => {
    console.log("Database connected successfully");
    server.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });


