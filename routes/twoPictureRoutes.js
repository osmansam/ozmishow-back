const express = require("express");
const router = express.Router();

const {
  getPageTwoPictures,
  createTwoPictures,
  updateTwoPictures,
  deleteTwoPictures,
} = require("../controllers/twoPictureController");

router.route("/:page").get(getPageTwoPictures);
router.route("/").post(createTwoPictures);
router.route("/:id").patch(updateTwoPictures).delete(deleteTwoPictures);

module.exports = router;
