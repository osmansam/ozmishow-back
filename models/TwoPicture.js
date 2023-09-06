const mongoose = require("mongoose");

const TwoPictureSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
  },
  selectedSection: {
    type: String,
  },
  mainHeader: { type: String },
  componentName: { type: String },
  position: { type: Number, required: true },
  language: { type: String, required: true },
  twoPictureArray: [mongoose.Schema.Types.Mixed],
});

module.exports = mongoose.model("TwoPicture", TwoPictureSchema);
