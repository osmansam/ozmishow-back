const mongoose = require("mongoose");

const WorkTeamBarSchema = new mongoose.Schema({
  img: { type: String },
  subHeaders: { type: [String] },
  paragraphs: { type: [String] },
  buttons: { type: [] },
  mainHeader: { type: String },
});

module.exports = mongoose.model("WorkTeam", WorkTeamBarSchema);
