// // import express from "express";
// // import dotenv from "dotenv";
// // import session from "express-session";
// // import passport from "passport";

// // import { connectDB } from "./config/db.js";
// // import authRoutes from "./routes/auth.js";
// // import configurePassport from "./config/passport.js"; // 👈 new

// // dotenv.config();
// // const PORT = process.env.PORT || 5000;

// // const app = express();
// // app.use(express.json());

// // // 💡 SESSION middleware
// // app.use(session({
// //   secret: process.env.SESSION_SECRET || 'keyboard cat',
// //   resave: false,
// //   saveUninitialized: false,
// //   cookie: {
// //     httpOnly: true,
// //     maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
// //   }
// // }));

// // // 💡 PASSPORT initialization
// // configurePassport(passport);
// // app.use(passport.initialize());
// // app.use(passport.session());

// // // 💡 Routes
// // app.use("/api/users", authRoutes);

// // // 💡 DB connect and start server
// // connectDB()
// //   .then(() => {
// //     console.log("Database connected successfully");
// //     app.listen(PORT, () => {
// //       console.log(`Server is running on port ${PORT}`);
// //     });
// //   })
// //   .catch((error) => {
// //     console.error("Database connection failed:", error);
// //   });

// import express from "express";
// import dotenv from "dotenv";
// import session from "express-session";
// import passport from "passport";

// import { connectDB } from "./config/db.js";
// import authRoutes from "./routes/auth.js";
// import requestRoutes from "./routes/requests.js";
// import rideRoutes from "./routes/rides.js";      
// import chatRoutes from "./routes/chat.js";       
// import ratingRoutes from "./routes/ratings.js";   
// import configurePassport from "./config/passport.js";

// dotenv.config();
// const PORT = process.env.PORT || 5000;

// const app = express();
// app.use(express.json());

// // 💡 SESSION
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'keyboard cat',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     httpOnly: true,
//     maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//   }
// }));

// // 💡 PASSPORT
// configurePassport(passport);
// app.use(passport.initialize());
// app.use(passport.session());

// // 💡 ROUTES
// app.use("/api/users", authRoutes);
// app.use("/api/requests", requestRoutes);
// app.use("/api/rides", rideRoutes);         // ✅ Ride endpoints
// app.use("/api/chats", chatRoutes);         // ✅ Chat endpoints
// app.use("/api/ratings", ratingRoutes);     // ✅ Rating endpoints

// // 💡 CONNECT DB & START SERVER
// connectDB()
//   .then(() => {
//     console.log("Database connected successfully");
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error("Database connection failed:", error);
//   });

import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import http from "http";
import { Server as SocketIO } from "socket.io";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import requestRoutes from "./routes/requests.js";
import rideRoutes from "./routes/rides.js";
import chatRoutes from "./routes/chat.js";
import ratingRoutes from "./routes/ratings.js";
import configurePassport from "./config/passport.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",  // ✅ must be exact
  credentials: true
}));

// 💡 SESSION
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  }
}));

// 💡 PASSPORT
configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// 💡 ROUTES
app.use("/api/users", authRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/ratings", ratingRoutes);

// 🧠 SOCKET.IO
const server = http.createServer(app);
const io = new SocketIO(server, {
  cors: {
    origin: "*",
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
    socket.to(chatId).emit("newMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

app.set("io", io); // attach io to express app for controller access

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
