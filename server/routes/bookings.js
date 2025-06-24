const express = require("express");
const Booking = require("../models/Booking");
const Turf = require("../models/Turf");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const bookings = await Booking.find({ ownerId: id })
      .populate({
        path: "turfId",
        select: "totalBookings totalRevenue", // only include what you need
      })
      .exec();
    res.json({ data: bookings });
  } catch (error) {
    res.status(500).json({ message: "No turf found" });
  }
});

router.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const bookings = await Booking.find({ userId: id }).exec();
    res.json({ data: bookings });
  } catch (error) {
    res.status(500).json({ message: "No turf found" });
  }
});

router.get("/user/turf/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const booking = await Booking.findById(id).exec();
    res.json({ data: booking });
  } catch (error) {
    res.status(500).json({ message: "No Booking found" });
  }
});

router.get("/validate/:id", async (req, res) => {
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

// post request to add a new booking
router.post("/", async (req, res) => {
  let newBooking = new Booking({
    userId: req.body.userId,
    userName: req.body.userName,
    ownerId: req.body.ownerId,
    turfId: req.body.turfId,
    turfName: req.body.turfName,
    location: req.body.location,
    date: req.body.date,
    time: req.body.startTime,
    fullTime: req.body.startTime + " - " + req.body.endTime,
    duration: req.body.duration,
    price: req.body.totalPrice,
    sportType: req.body.sport,
    status: req.body.status || "booked",
    paymentStatus: req.body.paymentStatus || "paid",
  });

  const turfId = req.body.turfId;
  const totalPrice = req.body.totalPrice;

  await Turf.findByIdAndUpdate(turfId, {
    $inc: { totalBookings: 1, totalRevenue: totalPrice },
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

router.put("/complete", async (req, res) => {
  const { turfId, ownerId } = req.body;

  try {
    const booking = await Booking.findOneAndUpdate(
      { turfId: turfId, ownerId: ownerId, status: "booked" },
      { status: "completed" },
      { new: true }
    );
    return res.json({ message: "Booking completed successfully" });
  } catch (error) {
    console.error("Error completing booking:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while completing the booking" });
  }
});

module.exports = router;
