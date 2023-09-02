const mongoose = require("mongoose");

const ContainerSchema = new mongoose.Schema({
  name: { type: String },
  type: { type: String },
  twoPictures: [{ type: mongoose.Schema.Types.ObjectId, ref: "TwoPicture" }],
});

module.exports = mongoose.model("Container", ContainerSchema);
