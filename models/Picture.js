const mongoose = require("mongoose");
const ElementStyle = require("./ElementStyle");
const ImageStyle = require("./ImageStyle");

const PictureSchema = new mongoose.Schema({
  img: { content: { type: String }, style: ImageStyle.schema },
  header: {
    content: { type: String },
    style: ElementStyle.schema, // Use ElementStyle schema for style
  },
  paragraphs: {
    content: [String],
    style: ElementStyle.schema, // Common style for all paragraphs},
  },
  buttons: {
    type: [
      {
        content: { type: String },
        style: ElementStyle.schema, // Common style for all buttons
        link: { type: String },
      },
    ],
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Picture", PictureSchema);
