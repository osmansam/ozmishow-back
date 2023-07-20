const mongoose = require("mongoose");

const ExplanationBarSchema = new mongoose.Schema({
  img: { type: String },
  header: { type: String },
  paragraphs: { type: [String] },
  buttons: { type: [] },
  percentage: { type: Number },
  mainHeader: { type: String },
  icon: { type: String },
  paragraph: { type: String },
});

module.exports = mongoose.model("ExplanationBar", ExplanationBarSchema);
