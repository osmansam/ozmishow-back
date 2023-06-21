const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const PageOptions = require("../models/PageOptions");
const TwoPicture = require("../models/TwoPicture");
const Navbar = require("../models/Navbar");
const Footer = require("../models/Footer");
const { deleteMany } = require("../models/Picture");
const { set } = require("mongoose");
// get all page options
const getPageOptions = async (req, res) => {
  const pageOptions = await PageOptions.find({});
  res.status(StatusCodes.OK).json({ pageOptions });
};

// create page options
const createPageOptions = async (req, res) => {
  const pageOptions = await PageOptions.create(req.body);
  res.status(StatusCodes.CREATED).json({ pageOptions });
};
//create navbar logo
const createNavbar = async (req, res) => {
  await Navbar.deleteMany();
  const navbar = await Navbar.create(req.body);
  res.status(StatusCodes.CREATED).json({ navbar });
};
// get navbar logo
const getNavbar = async (req, res) => {
  const navbar = await Navbar.find({});
  res.status(StatusCodes.OK).json({ navbar });
};
//create footer
const createFooter = async (req, res) => {
  await Footer.deleteMany();
  const footer = await Footer.create(req.body);
  res.status(StatusCodes.CREATED).json({ footer });
};
// get footer
const getFooter = async (req, res) => {
  const footer = await Footer.find({});
  res.status(StatusCodes.OK).json({ footer });
};
//detele page
const deletePage = async (req, res) => {
  const { id } = req.params;
  const page = await PageOptions.findByIdAndDelete({
    _id: id,
  });

  const twoPicture = await TwoPicture.deleteMany({
    page: page.pageNameEN,
  }).exec();

  const subPages = await PageOptions.find({
    motherPageEN: page.pageNameEN,
  });

  const deletedSubPages = await PageOptions.deleteMany({
    motherPageEN: page.pageNameEN,
  });
  subPages.forEach(async (subPage) => {
    const twoPictures = await TwoPicture.deleteMany({
      page: subPage.pageNameEN,
    });
  });

  if (!page) {
    throw new CustomError.NotFoundError(`No page with id : ${id}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  getPageOptions,
  createPageOptions,
  createNavbar,
  getNavbar,
  createFooter,
  getFooter,
  deletePage,
};
