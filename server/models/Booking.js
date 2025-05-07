const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  turfId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Turf",
    required: true,
  },

  date: {
    type: String, // "YYYY-MM-DD"
    required: true,
  },

  time: {
    type: String, // "03:00 PM"
    required: true,
  },

  status: {
    type: String,
    enum: ["confirmed", "cancelled"],
    default: "confirmed",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
