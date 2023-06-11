const TwoPicture = require("../models/TwoPicture");
const Picture = require("../models/Picture");
const ExplanationBar = require("../models/Explanation");
const WorkTeam = require("../models/WorkTeam");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const ObjectId = require("mongoose").Types.ObjectId;

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
//Add items into WorkTeam
const addWorkTeamBar = async (req, res) => {
  const { id: twoPicturesId } = req.params;
  const twoPictures = await TwoPicture.findById(twoPicturesId);
  if (!twoPictures) {
    throw new CustomError.NotFoundError(
      `No two pictures with id: ${twoPicturesId}`
    );
  }
  const { container } = req.body;
  const newWorkTeams = container.map((item) => {
    const { img, subHeaders, paragraphs, mainHeader } = item;
    // Define the new explanation object
    const newWorkTeam = new WorkTeam({
      img: img,
      mainHeader: mainHeader,
      subHeaders: subHeaders,
      paragraphs: paragraphs,
    });
    return newWorkTeam;
  });

  // Push the new work teams to the twoPictureArray
  twoPictures.twoPictureArray.push(...newWorkTeams);

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
  console.log(twoPictures.twoPictureArray);
  twoPictures.twoPictureArray = twoPictures.twoPictureArray.filter(
    (item) => item._id?.toString() !== itemId
  );

  await twoPictures.save();

  res.status(StatusCodes.OK).json({ message: "item deleted successfully" });
};
//update page and language
const updatePageAndLanguage = async (req, res) => {
  const { id: twoPicturesId } = req.params;
  const { page, language } = req.body;

  const positionFind = await TwoPicture.find({
    page: page,
    language: language,
  });

  const twoPictures = await TwoPicture.findOneAndUpdate(
    { _id: twoPicturesId },
    {
      ...req.body,
      page: page,
      language: language,
      position: positionFind?.length ?? 0,
    },
    { new: true, runValidators: true }
  );

  if (!twoPictures) {
    throw new CustomError.NotFoundError(
      `No two pictures with id : ${twoPicturesId}`
    );
  }
  res.status(StatusCodes.OK).json({ twoPictures });
};

module.exports = {
  getPageTwoPictures,
  createTwoPictures,
  updateTwoPictures,
  deleteTwoPictures,
  addItemContainer,
  addExplanationBar,
  addWorkTeamBar,
  deleteItemInContainer,
  updatePageAndLanguage,
};
