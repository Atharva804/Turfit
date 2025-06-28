// utils/upload.js  (same as earlier)
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/turfs"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const imageFilter = (req, file, cb) => {
  /image\/(jpeg|png|jpg)/.test(file.mimetype)
    ? cb(null, true)
    : cb(new Error("Only JPG/PNG allowed"));
};

module.exports = multer({ storage, fileFilter: imageFilter });
