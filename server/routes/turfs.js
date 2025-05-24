const express = require("express");
const Turf = require("../models/Turf");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const turfs = await Turf.find().exec();
    res.json({ data: turfs });
  } catch (error) {
    res.status(500).json({ message: "No turf found" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const turfId = req.params.id;
    const turf = await Turf.findById(turfId);
    res.json({ data: turf });
  } catch (error) {
    res.status(500).json({ message: "No turf found" });
  }
});

// Post request to add a new turf
// router.post("/", async (req, res) => {
// let newTurf = new turfSchema({
// name: "Test Turf 2",
// location: "Test Location 2",
// city: "Test City 2",
// sportType: "cricket",
// images: ["image1.jpg", "image2.jpg"],
// ownerId: "681b44865f89be2db10afba4",
// slots: [
//     { date: "2023-10-01", time: "10:00 AM", isBooked: false },
//     { date: "2023-10-01", time: "11:00 AM", isBooked: false },
// ],
// createdAt: new Date(),
// });

// let newTurf =

//   console.log("Request body: ", req.body);

// await newTurf
// .save()
// .then((doc) => {
//     console.log("Saved ", doc);
//     res.send("success added turf");
// })
// .catch((err) => {
//     console.error("Error aaya: ", err);
// });
// });

// Put request to update a turf

module.exports = router;
