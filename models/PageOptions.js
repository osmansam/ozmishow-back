const mongoose = require("mongoose");
const PageStyle = require("./PageStyle");
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
  isSectionPage: {
    type: Boolean,
    required: true,
  },
  sections: {
    type: [String],
    required: false,
  },
  sectionPageType: {
    type: String,
    required: false,
  },
  pageStyle: PageStyle.schema,
});

module.exports = mongoose.model("PageOptions", PageOptionsSchema);
