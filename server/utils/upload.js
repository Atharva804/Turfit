// utils/upload.js
const multer = require("multer");
module.exports = multer({ storage: multer.memoryStorage() });
