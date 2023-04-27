const TwoPicture = require("../models/TwoPicture");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

// get two pictures by page
const getPageTwoPictures = async (req, res) => {
  const { page } = req.params;
  const twoPictures = await TwoPicture.find({ page: page });
  res.status(StatusCodes.OK).json({ twoPictures });
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

module.exports = {
  getPageTwoPictures,
  createTwoPictures,
  updateTwoPictures,
  deleteTwoPictures,
};
