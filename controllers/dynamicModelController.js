const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const DynamicModel = require("../models/DynamicModel");
const mongoose = require("mongoose");
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
  // delete and recreate the model to update the schema
  mongoose.deleteModel(dynamicModel.name);
  mongoose.model(dynamicModel.name, dynamicModel.schema);

  res.status(StatusCodes.OK).json({ dynamicModel });
};

module.exports = { getAllDynamicModels, updateDynamicModel };
