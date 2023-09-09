const mongoose = require("mongoose");
const ElementStyle = require("./ElementStyle");

const ExplanationBarSchema = new mongoose.Schema({
  img: { type: String },
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
