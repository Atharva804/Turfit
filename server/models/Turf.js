const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  startTime: {
    type: String, // "10:00 AM"
    required: true,
  },
  endTime: {
    type: String, // "10:00 AM"
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const turfSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    sportType: {
      type: Array,
      // enum: ["football", "cricket", "tennis", "badminton", "basketball"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    images: [
      {
        type: String, // URL or local path
      },
    ],

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    slots: [slotSchema],
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Turf", turfSchema);
