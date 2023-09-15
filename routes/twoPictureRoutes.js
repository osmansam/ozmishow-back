const express = require("express");
const router = express.Router();

const {
  getPageTwoPictures,
  createTwoPictures,
  updateTwoPictures,
  addItemContainer,
  deleteTwoPictures,
  addResumeBox,
  addExplanationBar,
  addProgressBar,
  addWorkTeamBar,
  addSlider,
  deleteItemInContainer,
  updatePageAndLanguage,
  getSingleNew,
  createMap,
  getMap,
  searchNews,
  getNews,
  getAllTwoPictures,
  editExplanationBar,
  editWorkTeamBar,
  editTwoPictureStyle,
  editTwoPictureIndexStyle,
  editMainMainHeader,
  editResumeBox,
  editComponentStyle,
  deneme,
} = require("../controllers/twoPictureController");

router.route("/").post(createTwoPictures).get(getAllTwoPictures);
router.route("/createMap").post(createMap);
router.route("/getMap").get(getMap);
router.route("/updateContainer/:id").patch(addItemContainer);
router.route("/getNews/:id").get(getNews);
router.route("/searchNews/:id").get(searchNews);
router.route("/updateExplanationBar/:id").patch(addExplanationBar);
router.route("/updateProgressBar/:id").patch(addProgressBar);
router.route("/updateResumeBox/:id").patch(addResumeBox);
router.route("/updateSlider/:id").patch(addSlider);
router.route("/getSingleNew/:twoPicturesId/:id").get(getSingleNew);
router.route("/updateWorkTeamBar/:id").patch(addWorkTeamBar);
router.route("/deneme").get(deneme);
router.route("/updatePageAndLanguage/:id").patch(updatePageAndLanguage);
router.route("/editMainMainHeader/:twoPicturesId").patch(editMainMainHeader);
router.route("/deleteItem/:id/:itemId").patch(deleteItemInContainer);
router
  .route("/editExplanationBar/:twoPicturesId/:explanationBarId")
  .patch(editExplanationBar);
router
  .route("/editWorkTeamBar/:twoPicturesId/:workTeamBarId")
  .patch(editWorkTeamBar);
router
  .route("/editTwoPictureIndexStyle/:twoPicturesId/:index")
  .patch(editTwoPictureIndexStyle);
router.route("/editComponentStyle/:twoPicturesId/").patch(editComponentStyle);
router.route("/editResumeBox/:twoPicturesId/:index").patch(editResumeBox);
router.route("/editTwoPictureStyle/:twoPicturesId/").patch(editTwoPictureStyle);
router.route("/:page").get(getPageTwoPictures);
router.route("/:id").patch(updateTwoPictures).delete(deleteTwoPictures);

module.exports = router;
