const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const DynamicModel = require("../models/DynamicModel");

//getAllDynamicModels
const getAllDynamicModels = async (req, res) => {
  const data = await DynamicModel.find({});
  res.status(StatusCodes.OK).json({ data });
};
//update dynamic model
const updateDynamicModel = async (req, res) => {
  const { id } = req.query;
  const dynamicModel = await DynamicModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!dynamicModel) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Model not found" });
  }
  res.status(StatusCodes.OK).json({ dynamicModel });
};

module.exports = { getAllDynamicModels, updateDynamicModel };
