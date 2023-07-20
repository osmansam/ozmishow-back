const mongoose = require("mongoose");

const ResumeBoxSchema = new mongoose.Schema({
  header: { type: String },
  year1: { type: String },
  year2: { type: String },
  university: { type: String },
  paragraph: { type: String },
});

module.exports = mongoose.model("ResumeBox", ResumeBoxSchema);
