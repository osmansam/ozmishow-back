const mongoose = require("mongoose");

const PictureSchema = new mongoose.Schema({
  img: { type: String },
  header: { type: String },
  paragraphs: { type: [String] },
  buttons: { type: [] },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Picture", PictureSchema);
