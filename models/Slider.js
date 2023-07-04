const mongoose = require("mongoose");

const SliderSchema = new mongoose.Schema({
  img: { type: String },
  header: { type: String },
  paragraphs: { type: [String] },
  buttons: { type: [] },
  mainHeader: { type: String },
  name: { type: String },
  lastName: { type: String },
  title: { type: String },
});

module.exports = mongoose.model("Slider", SliderSchema);
