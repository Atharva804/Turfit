// const express = require("express");
// const Turf = require("../models/Turf");
// const router = express.Router();
// const mongoose = require("mongoose");

// router.get("/", async (req, res) => {
//   try {
//     const turfs = await Turf.find({ isAvailable: true }).exec();
//     res.json({ data: turfs });
//   } catch (error) {
//     res.status(500).json({ message: "No turf found" });
//   }
// });

// router.get("/search", async (req, res) => {
//   const turfName = req.query.turfName;

//   if (!turfName) {
//     return res
//       .status(400)
//       .json({ message: "Missing turfName query parameter" });
//   }

//   try {
//     const turf = await Turf.find({
//       name: { $regex: turfName, $options: "i" },
//     }).exec(); // case-insensitive search
//     res.json({ data: turf });
//   } catch (error) {
//     console.error("Search error:", error);
//     res.status(500).json({ message: "Failed to search for turf" });
//   }
// });

// router.get("/:id", async (req, res) => {
//   const turfId = req.params.id;
//   try {
//     const turf = await Turf.findById(turfId);
//     res.json({ data: turf });
//   } catch (error) {
//     res.status(500).json({ message: "No turf found" });
//   }
// });

// router.get("/owner/:id", async (req, res) => {
//   const ownerId = req.params.id;

//   // Check for valid MongoDB ObjectId
//   if (!mongoose.Types.ObjectId.isValid(ownerId)) {
//     return res.status(400).json({ data: "Invalid owner ID" });
//   }

//   try {
//     const turfs = await Turf.find({ ownerId: ownerId }).exec();

//     if (!turfs || turfs.length === 0) {
//       return res.status(404).json({ data: "No turfs found for this owner" });
//     }

//     res.status(200).json({ data: turfs });
//   } catch (error) {
//     console.error("Error fetching turfs by owner:", error);
//     res.status(500).json({ data: "Server error", error: error.message });
//   }
// });

// const upload = require("../utils/upload");
// // Post request to add a new turf
// router.post(
//   "/",
//   upload.array("images", 5), // only this route uses multer
//   async (req, res) => {
//     try {
//       const filePaths = req.files.map((f) => f.path);
//       let newTurf = new Turf({
//         name: req.body.name,
//         address: req.body.address,
//         description: req.body.description,
//         city: req.body.city,
//         price: req.body.price,
//         sportType: req.body.sportType,
//         // Assuming sportType is an array of strings
//         images: req.body.images, // Array of image URLs or paths
//         ownerId: req.body.owner, // Assuming user ID is available in req.user
//         slots: req.body.slots, // Array of slot objects
//       });

//       // let newTurf = console.log("Request body: ", req.body);
//       // console.log("Owner id:", req.user);

//       await newTurf
//         .save()
//         .then((doc) => {
//           res.send("success added turf");
//         })
//         .catch((err) => {
//           console.error("Error aaya: ", err);
//         });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ msg: "Create turf failed", error: err.message });
//     }
//     // res.json({ message: "Turf added successfully" });
//   }
// );

// // Put request to update a turf
// router.put("/:id", async (req, res) => {
//   const turfId = req.params.id;
//   const turf = req.body;
//   const editedTurf = await Turf.findByIdAndUpdate(turfId, turf, { new: true });
//   if (!editedTurf || editedTurf.length === 0) {
//     return res.status(404).json({ data: "No turfs found for this owner" });
//   }
//   res.send("successfully edited turf");
// });

// // Delete request to delete a turf
// router.delete("/:id", async (req, res) => {
//   const turfId = req.params.id;
//   try {
//     const deletedTurf = await Turf.findByIdAndDelete(turfId);
//     if (!deletedTurf) {
//       return res.status(404).json({ message: "Turf not found" });
//     }
//     res.json({ message: "Turf deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting turf:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const Turf = require("../models/Turf");
const router = express.Router();
const upload = require("../utils/upload"); // multer memory
const cloudinary = require("../utils/cloudinary");

/*──────────────────── GET all available ────────────────────*/
router.get("/", async (req, res) => {
  try {
    const turfs = await Turf.find({ isAvailable: true });
    res.json({ data: turfs });
  } catch (err) {
    res.status(500).json({ message: "No turf found" });
  }
});

/*──────────────────── Turf search by name ──────────────────*/
router.get("/search", async (req, res) => {
  const { turfName } = req.query;
  if (!turfName)
    return res
      .status(400)
      .json({ message: "Missing turfName query parameter" });

  try {
    const turfs = await Turf.find({
      name: { $regex: turfName, $options: "i" },
    });
    res.json({ data: turfs });
  } catch (err) {
    res.status(500).json({ message: "Failed to search for turf" });
  }
});

/*──────────────────── Turfs by owner (keep BEFORE '/:id') ──*/
router.get("/owner/:id", async (req, res) => {
  const ownerId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(ownerId)) {
    return res.status(400).json({ data: "Invalid owner ID" });
  }

  try {
    const turfs = await Turf.find({ ownerId });
    if (!turfs.length)
      return res.status(404).json({ data: "No turfs found for this owner" });
    res.json({ data: turfs });
  } catch (err) {
    res.status(500).json({ data: "Server error", error: err.message });
  }
});

/*──────────────────── Single turf by ID ─────────────────────*/
router.get("/:id", async (req, res) => {
  try {
    const turf = await Turf.findById(req.params.id);
    turf
      ? res.json({ data: turf })
      : res.status(404).json({ message: "Turf not found" });
  } catch (err) {
    res.status(500).json({ message: "No turf found" });
  }
});

/*──────────────────── Create turf (with images) ─────────────*/
router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    // 1. push every buffer to cloudinary and await URLs
    const uploadPromises = req.files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "turfs" }, // options
            (err, result) => {
              if (err) return reject(err);
              resolve(result.secure_url); // full https URL
            }
          );
          stream.end(file.buffer); // ⬅️ push buffer
        })
    );

    const imageUrls = await Promise.all(uploadPromises);

    /* sportType & slots arrive as JSON strings from FormData → parse */
    const sportTypeArr = JSON.parse(req.body.sportType || "[]"); // ["football","cricket"]
    const slotsArr = JSON.parse(req.body.slots || "[]"); // [{day,startTime,endTime,isAvailable}, …]

    const turf = await Turf.create({
      name: req.body.name,
      address: req.body.address,
      description: req.body.description,
      city: req.body.city,
      sportType: sportTypeArr, // ← matches schema Array
      price: req.body.price,
      images: imageUrls, // ← matches [String]
      ownerId: req.body.owner, // ObjectId of owner
      slots: slotsArr, // ← matches [slotSchema]
      // totalBookings, totalRevenue, isAvailable default themselves
    });

    res.status(201).json({ msg: "Turf created", data: turf });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Create turf failed", error: err.message });
  }
});

/*──────────────────── Update turf ───────────────────────────*/
// router.put("/:id", upload.array("images", 5), async (req, res) => {
//   const imagePaths = (req.files || []).map((f) => f.path);
//   const sportTypeArr = JSON.parse(req.body.sportType || "[]"); // ["football","cricket"]
//   const slotsArr = JSON.parse(req.body.slots || "[]");

//   const turf = req.body;
//   turf.sportType = sportTypeArr;
//   turf.images = imagePaths;
//   turf.slots = slotsArr;

//   const updated = await Turf.findByIdAndUpdate(req.params.id, turf, {
//     new: true,
//   });
//   updated
//     ? res.json({ msg: "Turf updated", data: updated })
//     : res.status(404).json({ message: "Turf not found" });
// });

router.put("/:id", upload.array("images", 5), async (req, res) => {
  try {
    // const newImagePaths = req.files.map((f) => f.path); // new uploads
    const uploadPromises = req.files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "turfs" }, // options
            (err, result) => {
              if (err) return reject(err);
              resolve(result.secure_url); // full https URL
            }
          );
          stream.end(file.buffer); // ⬅️ push buffer
        })
    );

    const imageUrls = await Promise.all(uploadPromises);
    const keptImages = JSON.parse(req.body.existingImages || "[]"); // URLs still kept

    const finalImages = [...keptImages, ...imageUrls];

    const updated = await Turf.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        address: req.body.address,
        description: req.body.description,
        city: req.body.city,
        price: req.body.price,
        sportType: JSON.parse(req.body.sportType || "[]"),
        slots: JSON.parse(req.body.slots || "[]"),
        images: finalImages, // ← merged array
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Turf not found" });
    res.json({ msg: "Turf updated", data: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Update failed", error: err.message });
  }
});

/*──────────────────── Delete turf ───────────────────────────*/
router.delete("/:id", async (req, res) => {
  const deleted = await Turf.findByIdAndDelete(req.params.id);
  deleted
    ? res.json({ message: "Turf deleted successfully" })
    : res.status(404).json({ message: "Turf not found" });
});

module.exports = router;
