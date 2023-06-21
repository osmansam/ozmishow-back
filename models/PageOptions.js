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
  isSubpage: {
    type: Boolean,
    required: true,
  },
  hasSubpage: {
    type: Boolean,
    required: true,
  },
  motherPageTR: {
    type: String,
    required: false,
  },
  motherPageEN: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("PageOptions", PageOptionsSchema);
