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

router.get("/:id", async (req, res) => {
  const turfId = req.params.id;
  const { date, time } = req.query;

  // Optional: Validate required parameters
  if (!date || !time) {
    return res.status(400).json({ message: "Missing date or time in query" });
  }

  try {
    const bookings = await Booking.find({ turfId, date, time }).exec();

    const isAvailable = bookings.length == 0;

    return res.json({ isAvailable: isAvailable });
  } catch (error) {
    console.error("Error checking booking availability:", error);
    res
      .status(500)
      .json({ message: "An error occurred while checking availability" });
  }
});

router.post("/", async (req, res) => {
  let newBooking = new Booking({
    userId: req.body.userId,
    turfId: req.body.turfId,
    date: req.body.date,
    time: req.body.startTime,
    status: req.body.status || "booked",
    paymentStatus: req.body.paymentStatus || "paid",
  });

  await newBooking
    .save()
    .then((result) => {
      res.send("success booked turf");
    })
    .catch((err) => {
      console.error("Error aaya: ", err);
    });
});

// post request to add a new booking

module.exports = router;
