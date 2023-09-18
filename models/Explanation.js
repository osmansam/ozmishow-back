const mongoose = require("mongoose");
const ElementStyle = require("./ElementStyle");
const ImageStyle = require("./ImageStyle");

const ExplanationBarSchema = new mongoose.Schema({
  img: { content: { type: String }, style: ImageStyle.schema },

  mainHeader: {
    content: { type: String },
    style: ElementStyle.schema, // Use ElementStyle schema for style
  },
  header: {
    content: { type: String },
    style: ElementStyle.schema, // Use ElementStyle schema for style
  },
  paragraphs: {
    content: [String],
    style: ElementStyle.schema, // Common style for all paragraphs},
  },
  buttons: [
    {
      content: { type: String },
      style: ElementStyle.schema, // Use ElementStyle schema for style
    },
  ],
  percentage: { type: Number },
  icon: { type: String },
  paragraph: {
    content: { type: String },
    style: ElementStyle.schema, // Use ElementStyle schema for style
  },
});

module.exports = mongoose.model("ExplanationBar", ExplanationBarSchema);
