const mongoose = require("mongoose");
const ElementStyle = require("./ElementStyle");
const ComponentStyle = require("./ComponentStyle");

const TwoPictureSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
  },
  selectedSection: {
    type: String,
  },
  mainHeader: {
    content: { type: String },
    style: ElementStyle.schema, // Use ElementStyle schema for style
  },
  componentName: { type: String },
  position: { type: Number, required: true },
  language: { type: String, required: true },
  style: ComponentStyle.schema, // Use ComponentStyle schema for style
  componentType: { type: String },
  twoPictureArray: [mongoose.Schema.Types.Mixed],
});

module.exports = mongoose.model("TwoPicture", TwoPictureSchema);
