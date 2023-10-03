const express = require("express");
const router = express.Router();

const {
  getAllDynamicModels,
} = require("./../controllers/dynamicModelController");

router.route("/").get(getAllDynamicModels);

module.exports = router;
