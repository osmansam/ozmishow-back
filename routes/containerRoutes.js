const express = require("express");
const router = express.Router();

const {
  createContainer,
  getAllContainers,
} = require("../controllers/containerControler");

router.route("/").post(createContainer).get(getAllContainers);

module.exports = router;
