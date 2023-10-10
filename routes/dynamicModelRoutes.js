const express = require("express");
const router = express.Router();

const {
  getAllDynamicModels,
  updateDynamicModel,
  oylesine,
} = require("./../controllers/dynamicModelController");

router.route("/").get(getAllDynamicModels).patch(updateDynamicModel);

module.exports = router;
