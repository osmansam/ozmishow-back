const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const PageOptions = require("../models/PageOptions");
const Navbar = require("../models/Navbar");
const Footer = require("../models/Footer");
const { deleteMany } = require("../models/Picture");
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

module.exports = {
  getPageOptions,
  createPageOptions,
  createNavbar,
  getNavbar,
  createFooter,
  getFooter,
};
