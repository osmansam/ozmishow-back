const mongoose = require("mongoose");

const PageOptionsSchema = new mongoose.Schema({
  pageNameTR: {
    type: String,
    required: true,
  },
  pageNameEN: {
    type: String,
    required: true,
  },
  isNavbar: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("PageOptions", PageOptionsSchema);
