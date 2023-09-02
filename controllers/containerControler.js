const TwoPicture = require("../models/TwoPicture");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Container = require("../models/Container");

//create Container
const createContainer = async (req, res) => {
  const { twoPictures, name, type } = req.body;
  const createdTwoPictures = await TwoPicture.insertMany(twoPictures);
  const container = await Container.create({
    name,
    type,
    twoPictures: createdTwoPictures.map((twoPicture) => twoPicture._id),
  });
  res.status(StatusCodes.CREATED).json({ container });
};

const getAllContainers = async (req, res) => {
  const containers = await Container.find({});
  res.status(StatusCodes.OK).json({ containers });
};

module.exports = {
  createContainer,
  getAllContainers,
};
