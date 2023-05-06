const express = require("express");
const router = express.Router();

const {
  getPageOptions,
  createPageOptions,
} = require("../controllers/pageOptionsController");

router.route("/").get(getPageOptions).post(createPageOptions);

module.exports = router;
