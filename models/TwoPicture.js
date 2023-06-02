const mongoose = require("mongoose");

const TwoPictureSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
  },
  mainHeader: { type: String },
  componentName: { type: String },
  position: { type: Number, required: true },
  language: { type: String, required: true },
  twoPictureArray: {
    type: [],
  },
});

module.exports = mongoose.model("TwoPicture", TwoPictureSchema);
