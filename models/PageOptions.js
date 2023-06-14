const mongoose = require("mongoose");

const PageOptionsSchema = new mongoose.Schema({
  pageName: {
    type: String,
    required: true,
  },
  isNavbar: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("PageOptions", PageOptionsSchema);
