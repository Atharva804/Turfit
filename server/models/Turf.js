const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  date: {
    type: String, // "YYYY-MM-DD"
    required: true,
  },
  time: {
    type: String, // "10:00 AM"
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

const turfSchema = new mongoose.Schema({
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
    type: String,
    enum: ["football", "cricket", "tennis", "badminton", "basketball"],
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

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Turf", turfSchema);
