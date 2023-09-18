const mongoose = require("mongoose");

const PageStyleSchema = new mongoose.Schema({
  backgroundColor: { type: String },
  effectAll: { type: Boolean },
  backgroundImage: { type: String },
  backgroundSize: { type: String },
});

module.exports = mongoose.model("PageStyle", PageStyleSchema);
