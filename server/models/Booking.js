const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    turfId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Turf",
      required: true,
    },

    turfName: {
      type: String,
      required: true,
    },

    location: {
      type: String,
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

    fullTime: {
      type: String, // "03:00 PM"
      required: true,
    },

    duration: {
      type: Number, // "03 in hours"
      required: true,
    },

    price: {
      type: Number, // "03 in hours"
      required: true,
    },

    sportType: {
      type: String,
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
