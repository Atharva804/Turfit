const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
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
      enum: ["booked", "cancelled", "completed"],
      default: "booked",
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "refunded", "partial_refund", "no_refund"],
      default: "paid",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
