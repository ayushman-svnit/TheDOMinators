// import express from "express";
// import dotenv from "dotenv";
// import session from "express-session";
// import passport from "passport";

// import { connectDB } from "./config/db.js";
// import authRoutes from "./routes/auth.js";
// import configurePassport from "./config/passport.js"; // 👈 new

// dotenv.config();
// const PORT = process.env.PORT || 5000;

// const app = express();
// app.use(express.json());

// // 💡 SESSION middleware
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'keyboard cat',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     httpOnly: true,
//     maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//   }
// }));

// // 💡 PASSPORT initialization
// configurePassport(passport);
// app.use(passport.initialize());
// app.use(passport.session());

// // 💡 Routes
// app.use("/api/users", authRoutes);

// // 💡 DB connect and start server
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

// 💡 SESSION
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  }
}));

// 💡 PASSPORT
configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// 💡 ROUTES
app.use("/api/users", authRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/rides", rideRoutes);         // ✅ Ride endpoints
app.use("/api/chats", chatRoutes);         // ✅ Chat endpoints
app.use("/api/ratings", ratingRoutes);     // ✅ Rating endpoints

// 💡 CONNECT DB & START SERVER
connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
