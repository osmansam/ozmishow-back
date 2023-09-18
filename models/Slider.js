const mongoose = require("mongoose");
const ElementStyle = require("./ElementStyle");
const ImageStyle = require("./ImageStyle");

const SliderSchema = new mongoose.Schema({
  img: { content: { type: String }, style: ImageStyle.schema },

  header: {
    content: { type: String },
    style: ElementStyle.schema, // Use ElementStyle schema for style
  },
  paragraphs: {
    content: [String],
    style: ElementStyle.schema, // Common style for all paragraphs},
  },
  buttons: { type: [] },
  mainHeader: {
    content: { type: String },
    style: ElementStyle.schema, // Use ElementStyle schema for style
  },
  name: {
    content: { type: String },
    style: ElementStyle.schema, // Use ElementStyle schema for style
  },
  lastName: {
    content: { type: String },
    style: ElementStyle.schema, // Use ElementStyle schema for style
  },
  title: {
    content: { type: String },
    style: ElementStyle.schema, // Use ElementStyle schema for style
  },
});

module.exports = mongoose.model("Slider", SliderSchema);
