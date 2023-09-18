const mongoose = require("mongoose");

const ImageStyleSchema = new mongoose.Schema({
  width: { type: String },
  height: { type: String },
  effectAll: { type: Boolean },
});

module.exports = mongoose.model("ImageStyle", ImageStyleSchema);
