const mongoose = require("mongoose");

const ElementStyleSchema = new mongoose.Schema({
  color: { type: String },
  "font-weight": { type: String },
  backgroundColor: { type: String },
  padding: { type: String },
  "font-size": { type: String },
  "font-family": { type: String },
});

module.exports = mongoose.model("ElementStyle", ElementStyleSchema);
