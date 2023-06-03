const express = require("express");
const router = express.Router();

const {
  getPageTwoPictures,
  createTwoPictures,
  updateTwoPictures,
  addItemContainer,
  deleteTwoPictures,
  addExplanationBar,
  deleteItemInContainer,
} = require("../controllers/twoPictureController");

router.route("/:page").get(getPageTwoPictures);
router.route("/").post(createTwoPictures);
router.route("/updateContainer/:id").patch(addItemContainer);
router.route("/updateExplanationBar/:id").patch(addExplanationBar);
router.route("/deleteItem/:id/:itemId").patch(deleteItemInContainer);
router.route("/:id").patch(updateTwoPictures).delete(deleteTwoPictures);

module.exports = router;
