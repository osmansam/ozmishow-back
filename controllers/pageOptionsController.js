const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const PageOptions = require("../models/PageOptions");

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

module.exports = {
  getPageOptions,
  createPageOptions,
};
