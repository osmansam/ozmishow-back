const express = require("express");
const router = express.Router();

const {
  getPageTwoPictures,
  createTwoPictures,
  updateTwoPictures,
  addItemContainer,
  deleteTwoPictures,
  addExplanationBar,
  addWorkTeamBar,
  addSlider,
  deleteItemInContainer,
  updatePageAndLanguage,
  getSingleNew,
  createMap,
  getMap,
  searchNews,
  getNews,
} = require("../controllers/twoPictureController");

router.route("/").post(createTwoPictures);
router.route("/createMap").post(createMap);
router.route("/getMap").get(getMap);
router.route("/updateContainer/:id").patch(addItemContainer);
router.route("/getNews/:id").get(getNews);
router.route("/searchNews/:id").get(searchNews);
router.route("/updateExplanationBar/:id").patch(addExplanationBar);
router.route("/updateSlider/:id").patch(addSlider);
router.route("/getSingleNew/:twoPicturesId/:id").get(getSingleNew);
router.route("/updateWorkTeamBar/:id").patch(addWorkTeamBar);
router.route("/updatePageAndLanguage/:id").patch(updatePageAndLanguage);
router.route("/deleteItem/:id/:itemId").patch(deleteItemInContainer);
router.route("/:page").get(getPageTwoPictures);
router.route("/:id").patch(updateTwoPictures).delete(deleteTwoPictures);

module.exports = router;
