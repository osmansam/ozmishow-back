const TwoPicture = require("../models/TwoPicture");
const Picture = require("../models/Picture");
const ExplanationBar = require("../models/Explanation");
const { StatusCodes } = require("http-status-codes");
const ObjectId = require("mongoose").Types.ObjectId;
const CustomError = require("../errors");

// get two pictures by page
const getPageTwoPictures = async (req, res) => {
  const { page } = req.params;
  const data = await TwoPicture.find({ page: page });
  res.status(StatusCodes.OK).json({ data });
};
// create two pictures
const createTwoPictures = async (req, res) => {
  const twoPictures = await TwoPicture.create(req.body);
  res.status(StatusCodes.CREATED).json({ twoPictures });
};
// update two pictures
const updateTwoPictures = async (req, res) => {
  const { id: twoPicturesId } = req.params;
  const twoPictures = await TwoPicture.findOneAndUpdate(
    { _id: twoPicturesId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!twoPictures) {
    throw new CustomError.NotFoundError(
      `No two pictures with id : ${twoPicturesId}`
    );
  }
  res.status(StatusCodes.OK).json({ twoPictures });
};

// delete two pictures
const deleteTwoPictures = async (req, res) => {
  const { id: twoPicturesId } = req.params;
  const twoPictures = await TwoPicture.findByIdAndDelete({
    _id: twoPicturesId,
  });
  if (!twoPictures) {
    throw new CustomError.NotFoundError(
      `No two pictures with id : ${twoPicturesId}`
    );
  }
  res.status(StatusCodes.OK).send();
};
//add items into Container
const addItemContainer = async (req, res) => {
  const { id: twoPicturesId } = req.params;
  const { container } = req.body;
  const { img, header, paragraphs, buttons } = container[0];
  // Define the new PictureSchema object
  const newPicture = new Picture({
    img: img,
    header: header,
    paragraphs: paragraphs,
    buttons: buttons,
  });
  // Retrieve the TwoPicture document and update twoPictureArray
  const twoPictures = await TwoPicture.findById(twoPicturesId);
  if (!twoPictures) {
    throw new CustomError.NotFoundError(
      `No two pictures with id: ${twoPicturesId}`
    );
  }

  twoPictures.twoPictureArray.push(newPicture);
  await twoPictures.save();

  res.status(StatusCodes.OK).json({ data: twoPictures });
};
//Add items into ExplanationBar
const addExplanationBar = async (req, res) => {
  const { id: twoPicturesId } = req.params;
  const { container } = req.body;
  const { img, header, paragraphs, mainHeader } = container[0];
  // Define the new explanation object
  const newExplain = new ExplanationBar({
    img: img,
    mainHeader: mainHeader,
    header: header,
    paragraphs: paragraphs,
  });

  // Retrieve the TwoPicture document and update twoPictureArray
  const twoPictures = await TwoPicture.findById(twoPicturesId);
  if (!twoPictures) {
    throw new CustomError.NotFoundError(
      `No two pictures with id: ${twoPicturesId}`
    );
  }

  twoPictures.twoPictureArray.push(newExplain);
  await twoPictures.save();

  res.status(StatusCodes.OK).json({ data: twoPictures });
};
//delete item from Container
const deleteItemInContainer = async (req, res) => {
  const { id: twoPicturesId, itemId } = req.params;
  const twoPictures = await TwoPicture.findById(twoPicturesId);
  if (!twoPictures) {
    throw new CustomError.NotFoundError(
      `No two pictures with id: ${twoPicturesId}`
    );
  }
  const itemIdObj = ObjectId(itemId); // Convert itemId to ObjectId

  const index = twoPictures.twoPictureArray.findIndex((item) => {
    return item._id.equals(itemIdObj); // Use the equals() method to compare ObjectId values
  });

  if (index !== -1) {
    twoPictures.twoPictureArray.splice(index, 1);
  }

  await twoPictures.save();
  res.status(StatusCodes.OK).json({ message: "item deleted successfully" });
};
module.exports = {
  getPageTwoPictures,
  createTwoPictures,
  updateTwoPictures,
  deleteTwoPictures,
  addItemContainer,
  addExplanationBar,
  deleteItemInContainer,
};
