const mongoose = require("mongoose");

const NavbarSchema = new mongoose.Schema({
  logo: { type: String, required: true },
});

module.exports = mongoose.model("Navbar", NavbarSchema);
