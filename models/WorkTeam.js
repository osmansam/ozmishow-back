const mongoose = require("mongoose");
const ElementStyle = require("./ElementStyle");
const ImageStyle = require("./ImageStyle");

const WorkTeamBarSchema = new mongoose.Schema({
  img: { content: { type: String }, style: ImageStyle.schema },

  subHeaders: {
    content: [String],
    style: ElementStyle.schema, // Common style for all paragraphs},
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
  mainHeader: {
    content: { type: String },
    style: ElementStyle.schema, // Use ElementStyle schema for style
  },
});

module.exports = mongoose.model("WorkTeam", WorkTeamBarSchema);
