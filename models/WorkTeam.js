const mongoose = require("mongoose");
const ElementStyle = require("./ElementStyle");

const WorkTeamBarSchema = new mongoose.Schema({
  img: { type: String },
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
