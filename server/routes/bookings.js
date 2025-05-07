const express = require("express");
const Booking = require("../models/Booking");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().exec();
    res.json({ data: bookings });
  } catch (error) {
    res.status(500).json({ message: "No turf found" });
  }
});

// post request to add a new booking

module.exports = router;
