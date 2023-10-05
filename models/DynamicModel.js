const mongoose = require("mongoose");

const DynamicModelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  schema: { type: Object, required: true }, // Store schema definitions as an object
  pageName: { type: String },
  columns: { type: Object },
  rowKeys: { type: [String] }, // Use an array for string values
  isPage: { type: Boolean },
  addButtonName: { type: String },
  createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("DynamicModel", DynamicModelSchema);
