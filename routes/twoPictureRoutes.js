const express = require("express");
const router = express.Router();

const {
  getPageTwoPictures,
  createTwoPictures,
  updateTwoPictures,
  updateNewsContainer,
  deleteTwoPictures,
} = require("../controllers/twoPictureController");

router.route("/:page").get(getPageTwoPictures);
router.route("/").post(createTwoPictures);
router.route("/updateContainer/:id").patch(updateNewsContainer);
router.route("/:id").patch(updateTwoPictures).delete(deleteTwoPictures);

module.exports = router;
