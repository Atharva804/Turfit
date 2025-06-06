const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./init/connect");
const mainRouter = require("./routes/main");
const turfRouter = require("./routes/turfs");
const bookingRouter = require("./routes/bookings");
const authRouter = require("./routes/auth");
const userSchema = require("./models/User");
const turfSchema = require("./models/Turf");
const bookingSchema = require("./models/Booking");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // allow credentials (cookies) in frontend requests
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/home", mainRouter);
app.use("/turf", turfRouter);
app.use("/booking", bookingRouter);
app.use("/auth", authRouter);

// Connect to MongoDB
connectDB();

// Inserting data (Initializing db)
// app.get("/test", async (req, res) => {
//   let newTurf = new turfSchema({
//     name: "Test Turf 3",
//     address: "Test Location 3",
//     description:
//       "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor",
//     city: "Test City 3",
//     sportType: ["football", "cricket"],
//     price: 500,
//     images: ["image1.jpg", "image2.jpg"],
//     ownerId: "681b44865f89be2db10afba4",
//     slots: [
//       { date: "2023-10-01", time: "10:00 AM", isBooked: false },
//       { date: "2023-10-01", time: "11:00 AM", isBooked: false },
//     ],
//   });

//   await newTurf
//     .save()
//     .then((doc) => {
//       console.log("Saved ", doc);
//       res.send("success added turf");
//     })
//     .catch((err) => {
//       console.error("Error aaya: ", err);
//     });
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
