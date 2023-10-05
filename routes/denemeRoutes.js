const express = require("express");
const router = express.Router();

const {
  createDynamicModel,
  getDynamicModelItems,
  createDynamicModelItem,
  updateDynamicModelItem,
  deleteDynamicModelItem,
  getDynamicModelByItem,
  createDynamicModelItemWithImage,
  updateDynamicModelItemWithImage,
  handleSearch,
  artik,
} = require("../controllers/denemeController");

router.route("/").post(createDynamicModel).get(getDynamicModelItems);
router
  .route("/item")
  .post(createDynamicModelItem)
  .delete(deleteDynamicModelItem)
  .patch(updateDynamicModelItem)
  .get(getDynamicModelByItem);
router
  .route("/item/image")
  .post(createDynamicModelItemWithImage)
  .patch(updateDynamicModelItemWithImage);
router.route("/oylesine").get(artik);
router.route("/search").get(handleSearch);
module.exports = router;
