const express = require("express");
const router = express.Router();

const {
  createContainer,
  getAllContainers,
  getContainerById,
  updateContainer,
  deleteContainer,
} = require("../controllers/containerControler");

router.route("/").post(createContainer).get(getAllContainers);
router
  .route("/:id")
  .get(getContainerById)
  .patch(updateContainer)
  .delete(deleteContainer);

module.exports = router;
