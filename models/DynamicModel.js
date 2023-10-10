const mongoose = require("mongoose");

const DynamicModelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  schema: { type: Object, required: true }, // Store schema definitions as an object
  pageName: { type: String },
  columns: { type: Object },
  rowKeys: { type: Object }, // Use an array for string values
  routes: { type: Object }, // routes to keep track of authantication and authorization
  isPage: { type: Boolean },
  addButtonName: { type: String },
  createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("DynamicModel", DynamicModelSchema);
