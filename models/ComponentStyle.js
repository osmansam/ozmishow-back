const mongoose = require("mongoose");

const ComponentStyle = new mongoose.Schema({
  backgroundColor: { type: String },
  width: { type: String },
  backgroundImage: { type: String },
});

module.exports = mongoose.model("ComponentStyle", ComponentStyle);
