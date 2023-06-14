const mongoose = require("mongoose");

const FooterSchema = new mongoose.Schema({
  adress: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  fax: { type: String, required: true },
});

module.exports = mongoose.model("Footer", FooterSchema);
