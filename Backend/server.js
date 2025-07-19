import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import stopRouter from "./routes/admin/stop.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",  // ✅ must be exact
    credentials: true
}));

// 💡 ROUTES
app.use("/api/admin/stops", stopRouter);

// 💡 DB connect and start server
main()
    .then(() => {
        console.log("connected to database");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Timetable');
}

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
})  
