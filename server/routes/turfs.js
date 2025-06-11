const express = require("express");
const Turf = require("../models/Turf");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  try {
    const turfs = await Turf.find().exec();
    res.json({ data: turfs });
  } catch (error) {
    res.status(500).json({ message: "No turf found" });
  }
});

router.get("/:id", async (req, res) => {
  const turfId = req.params.id;
  try {
    const turf = await Turf.findById(turfId);
    res.json({ data: turf });
  } catch (error) {
    res.status(500).json({ message: "No turf found" });
  }
});

router.get("/owner/:id", async (req, res) => {
  const ownerId = req.params.id;

  // Check for valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(ownerId)) {
    return res.status(400).json({ data: "Invalid owner ID" });
  }

  try {
    const turfs = await Turf.find({ ownerId: ownerId }).exec();

    if (!turfs || turfs.length === 0) {
      return res.status(404).json({ data: "No turfs found for this owner" });
    }

    res.status(200).json({ data: turfs });
  } catch (error) {
    console.error("Error fetching turfs by owner:", error);
    res.status(500).json({ data: "Server error", error: error.message });
  }
});

// Post request to add a new turf
router.post("/", async (req, res) => {
  let newTurf = new Turf({
    name: req.body.name,
    address: req.body.address,
    description: req.body.description,
    city: req.body.city,
    price: req.body.price,
    sportType: req.body.sportType,
    // Assuming sportType is an array of strings
    images: req.body.images, // Array of image URLs or paths
    ownerId: req.body.owner, // Assuming user ID is available in req.user
    slots: req.body.slots, // Array of slot objects
  });

  // let newTurf = console.log("Request body: ", req.body);
  // console.log("Owner id:", req.user);

  await newTurf
    .save()
    .then((doc) => {
      res.send("success added turf");
    })
    .catch((err) => {
      console.error("Error aaya: ", err);
    });
  // res.json({ message: "Turf added successfully" });
});

// Put request to update a turf
router.put("/:id", async (req, res) => {
  const turfId = req.params.id;
  const turf = req.body;
  const editedTurf = await Turf.findByIdAndUpdate(turfId, turf, { new: true });
  if (!editedTurf || editedTurf.length === 0) {
    return res.status(404).json({ data: "No turfs found for this owner" });
  }
  res.send("successfully edited turf");
});

// Delete request to delete a turf
router.delete("/:id", async (req, res) => {
  const turfId = req.params.id;
  try {
    const deletedTurf = await Turf.findByIdAndDelete(turfId);
    if (!deletedTurf) {
      return res.status(404).json({ message: "Turf not found" });
    }
    res.json({ message: "Turf deleted successfully" });
  } catch (error) {
    console.error("Error deleting turf:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
