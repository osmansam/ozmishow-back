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
//get all containers
const getAllContainers = async (req, res) => {
  const containers = await Container.find({});
  res.status(StatusCodes.OK).json({ containers });
};
// get container by id
const getContainerById = async (req, res) => {
  const { id: containerId } = req.params;
  const container = await Container.findOne({ _id: containerId }).populate(
    "twoPictures"
  );
  if (!container) {
    throw new CustomError.NotFoundError(
      `No container with id : ${containerId}`
    );
  }
  res.status(StatusCodes.OK).json({ container });
};
//update container
const updateContainer = async (req, res) => {
  const { id: containerId } = req.params;
  const { twoPictures, name, type } = req.body;

  // Find the container by its _id
  const container = await Container.findOne({ _id: containerId });
  if (!container) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "Container not found" });
  }

  // Retrieve the twoPictures associated with this container
  const twoPicturesToDelete = container.twoPictures;

  // Delete all the twoPictures associated with this container from the database
  await TwoPicture.deleteMany({ _id: { $in: twoPicturesToDelete } });
  const createdTwoPictures = await TwoPicture.insertMany(twoPictures);

  // Update the container with the new data, including the updated twoPictures
  const updatedContainer = await Container.findOneAndUpdate(
    { _id: containerId },
    {
      name,
      type,
      twoPictures: createdTwoPictures.map((twoPicture) => twoPicture._id),
    },
    { new: true, runValidators: true }
  ).populate("twoPictures");
  res.status(StatusCodes.OK).json({ container: updatedContainer });
};
//delete Container
const deleteContainer = async (req, res) => {
  const { id: containerId } = req.params;

  // Find the container by its _id
  const container = await Container.findOne({ _id: containerId });

  if (!container) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "Container not found" });
  }

  // Retrieve the twoPictures associated with this container
  const twoPicturesToDelete = container.twoPictures;
  // Delete all the twoPictures associated with this container from the database
  await TwoPicture.deleteMany({ _id: { $in: twoPicturesToDelete } });

  // Now that the twoPictures are deleted, delete the container
  await Container.findByIdAndDelete(containerId);

  res.status(StatusCodes.NO_CONTENT).send();
};

module.exports = {
  createContainer,
  getAllContainers,
  getContainerById,
  updateContainer,
  deleteContainer,
};
