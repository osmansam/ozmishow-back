const mongoose = require("mongoose");

const PageStyleSchema = new mongoose.Schema({
  backgroundColor: { type: String },
});

module.exports = mongoose.model("PageStyle", PageStyleSchema);
