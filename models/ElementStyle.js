const mongoose = require("mongoose");

const ElementStyleSchema = new mongoose.Schema({
  color: { type: String },
  "text-size": { type: String },
  backgroundColor: { type: String },
  padding: { type: String },
  "font-size": { type: String },
});

module.exports = mongoose.model("ElementStyle", ElementStyleSchema);
