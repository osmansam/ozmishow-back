const mongoose = require("mongoose");

const PictureSchema = new mongoose.Schema({
  img: { type: String },
  header: { type: String, required: true },
  paragraphs: { type: [String], required: true },
  buttons: { type: [String] },
});

const TwoPictureSchema = new mongoose.Schema({
  page: { type: String, required: true },
  mainHeader: { type: String, required: true },
  twoPictureArray: { type: [PictureSchema], required: true },
});

module.exports = mongoose.model("TwoPicture", TwoPictureSchema);
