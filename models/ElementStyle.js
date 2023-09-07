const mongoose = require("mongoose");

const ElementStyleSchema = new mongoose.Schema({
  color: { type: String },
  "font-weight": { type: String },
  backgroundColor: { type: String },
  padding: { type: String },
  fontSize: { type: String },
  fontFamily: { type: String },
});

module.exports = mongoose.model("ElementStyle", ElementStyleSchema);
