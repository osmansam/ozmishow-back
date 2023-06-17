const mongoose = require("mongoose");

const MapSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

module.exports = mongoose.model("Map", MapSchema);
