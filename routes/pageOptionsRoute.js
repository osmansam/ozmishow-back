const express = require("express");
const router = express.Router();

const {
  getPageOptions,
  createPageOptions,
  createNavbar,
  getNavbar,
  createFooter,
  getFooter,
  deletePage,
  updatePageOptions,
  deneme,
} = require("../controllers/pageOptionsController");

router.route("/").get(getPageOptions).post(createPageOptions);
router.route("/deneme").get(deneme);
router.route("/navbar").get(getNavbar).post(createNavbar);
router.route("/footer").get(getFooter).post(createFooter);
router.route("/:id").delete(deletePage).patch(updatePageOptions);

module.exports = router;
