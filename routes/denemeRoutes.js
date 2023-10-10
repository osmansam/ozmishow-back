const express = require("express");
const router = express.Router();
const { conditionalAuthentication } = require("../middleware/conditionalAuth");
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

router
  .route("/")
  .post(createDynamicModel)
  .get(conditionalAuthentication("getDynamicModelItems"), getDynamicModelItems);

router
  .route("/item")
  .post(
    conditionalAuthentication("createDynamicModelItem"),
    createDynamicModelItem
  )
  .delete(
    conditionalAuthentication("deleteDynamicModelItem"),
    deleteDynamicModelItem
  )
  .patch(
    conditionalAuthentication("updateDynamicModelItem"),
    updateDynamicModelItem
  )
  .get(
    conditionalAuthentication("getDynamicModelByItem"),
    getDynamicModelByItem
  );
router
  .route("/item/image")
  .post(
    conditionalAuthentication("createDynamicModelItemWithImage"),
    createDynamicModelItemWithImage
  )
  .patch(
    conditionalAuthentication("updateDynamicModelItemWithImage"),
    updateDynamicModelItemWithImage
  );
router.route("/oylesine").get(artik);
router
  .route("/search")
  .get(conditionalAuthentication("handleSearch"), handleSearch);
module.exports = router;
