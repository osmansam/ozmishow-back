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
  handleSearch,
} = require("../controllers/denemeController");

router.route("/").post(createDynamicModel).get(getDynamicModelItems);
router
  .route("/item")
  .post(createDynamicModelItem)
  .delete(deleteDynamicModelItem)
  .patch(updateDynamicModelItem)
  .get(getDynamicModelByItem);
router.route("/item/image").post(createDynamicModelItemWithImage);
router.route("/search").get(handleSearch);
module.exports = router;
