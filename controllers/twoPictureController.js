const TwoPicture = require("../models/TwoPicture");
const Picture = require("../models/Picture");
const ExplanationBar = require("../models/Explanation");
const WorkTeam = require("../models/WorkTeam");
const ResumeBox = require("../models/ResumeBox");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Slider = require("../models/Slider");
const ObjectId = require("mongoose").Types.ObjectId;
const Map = require("../models/Map");
const { paginate } = require("../utils/pagination");

// get two pictures by page
const getPageTwoPictures = async (req, res) => {
  const { page } = req.params;
  const data = await TwoPicture.find({ page: page });
  res.status(StatusCodes.OK).json({ data });
};
//get all two pictures
const getAllTwoPictures = async (req, res) => {
  const data = await TwoPicture.find({});
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
//edit explanation bar
const editExplanationBar = async (req, res) => {
  const { twoPicturesId, explanationBarId } = req.params;
  const { container } = req.body;

  // Retrieve the TwoPicture document
  const twoPictures = await TwoPicture.findById(twoPicturesId);
  if (!twoPictures) {
    throw new CustomError.NotFoundError(
      `No two pictures with id: ${twoPicturesId}`
    );
  }

  // Find the ExplanationBar item to be edited in the twoPictureArray
  const explanationBarIndex = twoPictures.twoPictureArray.findIndex(
    (item) => item._id.toString() === explanationBarId
  );

  if (explanationBarIndex === -1) {
    throw new CustomError.NotFoundError(
      `No ExplanationBar with id: ${explanationBarId}`
    );
  }
  // If effectAll is false, update the style of the specific elementBar
  if (!container[0].style.effectAll) {
    twoPictures.twoPictureArray[explanationBarIndex] = container[0];
  } else {
    for (let i = 0; i < twoPictures.twoPictureArray.length; i++) {
      twoPictures.twoPictureArray[i].style = container[0].style;
    }
    twoPictures.twoPictureArray[explanationBarIndex].content =
      container[0].content;
  }
  await TwoPicture.findByIdAndUpdate(twoPicturesId, twoPictures, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ data: twoPictures });
};

//Add items into ProgressBar
const addProgressBar = async (req, res) => {
  const { id: twoPicturesId } = req.params;
  const { container } = req.body;
  const { img, header, paragraphs, mainHeader, percentage, icon, paragraph } =
    container[0];
  // Define the new explanation object
  const newExplain = new ExplanationBar({
    img: img,
    mainHeader: mainHeader,
    header: header,
    paragraphs: paragraphs,
    percentage: percentage,
    icon: icon,
    paragraph: paragraph,
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
//Add items into ResumeBox
const addResumeBox = async (req, res) => {
  const { id: twoPicturesId } = req.params;
  const { container } = req.body;
  const { header, year1, year2, university, paragraph } = container[0];
  console.log(container[0]);
  // Define the new ResumeBox object
  const newResume = new ResumeBox({
    header: header,
    year1: year1,
    year2: year2,
    university: university,
    paragraph: paragraph,
  });

  // Retrieve the TwoPicture document and update twoPictureArray
  const twoPictures = await TwoPicture.findById(twoPicturesId);
  if (!twoPictures) {
    throw new CustomError.NotFoundError(
      `No two pictures with id: ${twoPicturesId}`
    );
  }

  twoPictures.twoPictureArray.push(newResume);
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
//Add items into WorkTeam
const addSlider = async (req, res) => {
  const { id: twoPicturesId } = req.params;
  const twoPictures = await TwoPicture.findById(twoPicturesId);
  if (!twoPictures) {
    throw new CustomError.NotFoundError(
      `No two pictures with id: ${twoPicturesId}`
    );
  }
  const { container } = req.body;
  const newSliders = container.map((item) => {
    const {
      img,
      header,
      paragraphs,
      buttons,
      mainHeader,
      name,
      lastName,
      title,
    } = item;
    // Define the new slider object
    const newSlider = new Slider({
      img: img,
      mainHeader: mainHeader,
      header: header,
      paragraphs: paragraphs,
      buttons: buttons,
      name: name,
      lastName: lastName,
      title: title,
    });
    return newSlider;
  });

  // Push the new work teams to the twoPictureArray
  twoPictures.twoPictureArray.push(...newSliders);

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
//get single new
const getSingleNew = async (req, res) => {
  const { twoPicturesId, id } = req.params;

  const twoPictures = await TwoPicture.findById(twoPicturesId);

  var news = {};
  if (!id || id === "undefined") {
    news = twoPictures.twoPictureArray[0];
  } else {
    news = await twoPictures.twoPictureArray.find((item) => item._id === id);
  }
  if (!news) {
    news = await twoPictures.twoPictureArray.find((item) => {
      const itemId = new ObjectId(item._id);
      return itemId.equals(id);
    });
  }

  if (!news) {
    throw new CustomError.NotFoundError(
      `No two pictures with id : ${twoPicturesId}`
    );
  }
  res.status(StatusCodes.OK).json({ news });
};
//create Map
const createMap = async (req, res) => {
  await Map.deleteMany({});
  const map = await Map.create(req.body);
  res.status(StatusCodes.CREATED).json({ map });
};
//get Map
const getMap = async (req, res) => {
  const map = await Map.find({});
  res.status(StatusCodes.OK).json({ map });
};
//search news
const searchNews = async (req, res) => {
  const { id: twoPicturesId } = req.params;
  const { searchQuery } = req.query;
  const twoPictures = await TwoPicture.findById(twoPicturesId);

  const formattedSearchQuery = searchQuery.toLowerCase();

  const news = twoPictures.twoPictureArray.filter((item) => {
    const formattedHeader = item.header.toLowerCase();
    return formattedHeader.includes(formattedSearchQuery);
  });

  res.status(StatusCodes.OK).json({ news });
};
//const get news
const getNews = async (req, res) => {
  const { id: twoPicturesId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limitPerPage = parseInt(req.query.limit) || 10;
  const twoPictures = await TwoPicture.findById(twoPicturesId);

  // Sort the twoPictureArray by date in descending order
  twoPictures.twoPictureArray.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const startIndex = (page - 1) * limitPerPage;
  const endIndex = page * limitPerPage;

  const results = twoPictures.twoPictureArray.slice(startIndex, endIndex);

  res.status(StatusCodes.OK).json({
    news: results,
    totalPages: Math.ceil(twoPictures.twoPictureArray.length / limitPerPage),
    currentPage: page,
    totalItems: twoPictures.twoPictureArray.length,
  });
};

module.exports = {
  getPageTwoPictures,
  getAllTwoPictures,
  createTwoPictures,
  updateTwoPictures,
  deleteTwoPictures,
  addItemContainer,
  addExplanationBar,
  addProgressBar,
  addWorkTeamBar,
  addResumeBox,
  addSlider,
  deleteItemInContainer,
  updatePageAndLanguage,
  getSingleNew,
  createMap,
  getMap,
  searchNews,
  getNews,
  editExplanationBar,
};
