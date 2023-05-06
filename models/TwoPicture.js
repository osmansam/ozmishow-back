const mongoose = require("mongoose");

const PictureSchema = new mongoose.Schema({
  img: { type: String },
  header: { type: String },
  paragraphs: { type: [String] },
  buttons: { type: [] },
});

const TwoPictureSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
  },
  mainHeader: { type: String },
  componentName: { type: String },
  position: { type: Number, required: true },
  language: { type: String, required: true },
  twoPictureArray: {
    type: [PictureSchema],
    validate: [
      function validateTwoPictureArrayLength(val) {
        switch (this.componentType) {
          case "TwoPictureContainer":
            return val.length === 2;
          case "IconExplainContainer":
            return val.length === 3;
          case "PictureAtRight":
          case "PictureAtLeft":
            return val.length === 1;
          default:
            return true;
        }
      },
      "Invalid length for twoPictureArray",
    ],
  },
});

module.exports = mongoose.model("TwoPicture", TwoPictureSchema);
