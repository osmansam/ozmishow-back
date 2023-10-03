const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const DynamicModel = require("../models/DynamicModel");

//getAllDynamicModels
const getAllDynamicModels = async (req, res) => {
  const data = await DynamicModel.find({});
  res.status(StatusCodes.OK).json({ data });
};

module.exports = { getAllDynamicModels };
