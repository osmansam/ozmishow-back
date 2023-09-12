const mongoose = require("mongoose");
const ElementStyle = require("./ElementStyle");

const ResumeBoxSchema = new mongoose.Schema({
  header: {
    content: { type: String },
    style: ElementStyle.schema, // Use ElementStyle schema for style
  },
  year1: {
    content: { type: String },
    style: ElementStyle.schema, // Use ElementStyle schema for style
  },
  year2: {
    content: { type: String },
    style: ElementStyle.schema, // Use ElementStyle schema for style
  },
  university: {
    content: { type: String },
    style: ElementStyle.schema, // Use ElementStyle schema for style
  },
  paragraph: {
    content: { type: String },
    style: ElementStyle.schema, // Use ElementStyle schema for style
  },
});

module.exports = mongoose.model("ResumeBox", ResumeBoxSchema);
