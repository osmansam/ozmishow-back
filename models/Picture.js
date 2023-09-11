const mongoose = require("mongoose");
const ElementStyle = require("./ElementStyle");

const PictureSchema = new mongoose.Schema({
  img: { type: String },
  header: {
    content: { type: String },
    style: ElementStyle.schema, // Use ElementStyle schema for style
  },
  paragraphs: {
    content: [String],
    style: ElementStyle.schema, // Common style for all paragraphs},
  },
  buttons: { type: [] },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Picture", PictureSchema);
