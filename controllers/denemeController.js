const mongoose = require("mongoose");
const DynamicModel = require("../models/DynamicModel");
const { StatusCodes } = require("http-status-codes");
const cloudinary = require("cloudinary").v2;
// Create a dynamic model based on user input
const createDynamicModel = async (req, res) => {
  try {
    // Schema name and dynamic field definitions should come from the user
    const { schemaName } = req.query;
    const { dynamicFields, columns, rowKeys, isPage, pageName, addButtonName } =
      req.body;
    // Define common fields that all models will have

    // Merge common fields with user-defined fields
    const schemaFields = {
      ...dynamicFields,
    };

    // Save the model definition in the DynamicModel collection
    await DynamicModel.create({
      name: schemaName,
      schema: schemaFields,
      isPage: isPage,
      pageName: pageName,
      columns: columns,
      rowKeys: rowKeys,
      addButtonName: addButtonName,
    }); // Respond with success
    res.status(201).json({ message: "Dynamic model created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
// create an item for a dynamic model
const createDynamicModelItem = async (req, res) => {
  const { schemaName } = req.query;
  const dynamicModel = await DynamicModel.findOne({ name: schemaName });
  if (!dynamicModel) {
    return res.status(404).json({ error: "Model not found" });
  }
  let CurrentModel;
  const Models = mongoose.models;
  if (!(schemaName in Models)) {
    CurrentModel = mongoose.model(schemaName, dynamicModel.schema);
  } else {
    CurrentModel = mongoose.model(schemaName);
  }
  const item = await CurrentModel.create(req.body);
  if (!item) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "Could not create item" });
  }
  res.status(StatusCodes.CREATED).json({ item });
};
//create a dynamic model with image
const createDynamicModelItemWithImage = async (req, res) => {
  const { schemaName } = req.query;
  const dynamicModel = await DynamicModel.findOne({ name: schemaName });
  if (!dynamicModel) {
    return res.status(404).json({ error: "Model not found" });
  }
  let CurrentModel;
  const Models = mongoose.models;
  if (!(schemaName in Models)) {
    CurrentModel = mongoose.model(schemaName, dynamicModel.schema);
  } else {
    CurrentModel = mongoose.model(schemaName);
  }
  // finding which items isImage
  const schemaArray = Object.keys(dynamicModel.schema).map((key) => ({
    name: key,
    ...dynamicModel.schema[key],
  }));

  const imgItems = schemaArray
    .filter((item) => item.isImage === true)
    .map((item) => item.name);

  const imgUrls = {}; // Initialize an object to store the results

  // Process each image item
  await Promise.all(
    imgItems.map(async (imageItem) => {
      const tempFilePath = req.files[imageItem].tempFilePath;

      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(tempFilePath);

      // Store the secure_url in the object with the image item name as the key
      imgUrls[imageItem] = result.secure_url;
    })
  );

  const item = await CurrentModel.create({ ...req.body, ...imgUrls });
  if (!item) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "Could not create item" });
  }
  res.status(StatusCodes.CREATED).json({ item });
};
// delete an item from a dynamic model
const deleteDynamicModelItem = async (req, res) => {
  const { schemaName, id } = req.query;
  const dynamicModel = await DynamicModel.findOne({ name: schemaName });
  if (!dynamicModel) {
    return res.status(404).json({ error: "Model not found" });
  }
  let CurrentModel;
  const Models = mongoose.models;
  if (!(schemaName in Models)) {
    CurrentModel = mongoose.model(schemaName, dynamicModel.schema);
  } else {
    CurrentModel = mongoose.model(schemaName);
  }
  const item = await CurrentModel.findOneAndDelete({ _id: id });
  if (!item) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "Could not delete item" });
  }
  res.status(StatusCodes.OK).json({ item });
};
// update an item in a dynamic model
const updateDynamicModelItem = async (req, res) => {
  const { schemaName, id } = req.query;
  const dynamicModel = await DynamicModel.findOne({ name: schemaName });
  if (!dynamicModel) {
    return res.status(404).json({ error: "Model not found" });
  }
  let CurrentModel;
  const Models = mongoose.models;
  if (!(schemaName in Models)) {
    CurrentModel = mongoose.model(schemaName, dynamicModel.schema);
  } else {
    CurrentModel = mongoose.model(schemaName);
  }
  const item = await CurrentModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!item) {
    throw new CustomError.NotFoundError(`Item with id ${id} not found`);
  }
  res.status(StatusCodes.OK).json({ item });
};
// Load and use dynamic models
const getDynamicModelItems = async (req, res) => {
  try {
    const { schemaName, populate } = req.query;

    // Load the schema definition from the DynamicModel collection
    const dynamicModel = await DynamicModel.findOne({ name: schemaName });

    if (!dynamicModel) {
      return res
        .status(404)
        .json({ error: `Schema "${schemaName}" not found` });
    }
    let CurrentModel;
    const Models = mongoose.models;
    if (!(schemaName in Models)) {
      // Save the model definition in the DynamicModel collection

      CurrentModel = mongoose.model(schemaName, dynamicModel.schema);
    } else {
      CurrentModel = mongoose.model(schemaName);
    }

    const populateFields = populate ? populate?.split(",").join(" ") : [];
    if (populateFields.length > 0) {
      items = await CurrentModel.find().populate(populateFields);
    } else {
      items = await CurrentModel.find();
    }

    res.status(200).json({ items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
// get by specific item
const getDynamicModelByItem = async (req, res) => {
  const { schemaName, getFor, value } = req.query;
  const dynamicModel = await DynamicModel.findOne({ name: schemaName });
  if (!dynamicModel) {
    return res.status(404).json({ error: `Schema "${schemaName}" not found` });
  }
  let CurrentModel;
  const Models = mongoose.models;
  if (!(schemaName in Models)) {
    CurrentModel = mongoose.model(schemaName, dynamicModel.schema);
  } else {
    CurrentModel = mongoose.model(schemaName);
  }
  const items = await CurrentModel.find({ [getFor]: value });
  res.status(StatusCodes.OK).json({ items });
};
// search for a specific item
// Define a reusable function to filter items based on a search query
const filterItems = (items, searchQuery) => {
  return items.filter((item) => {
    // Create an array of field values from the item
    const itemFields = Object.values(item._doc);

    // Check if any of the field values match the search query
    return itemFields.some((field) => {
      if (typeof field === "string") {
        return field.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false; // Adjust as needed for non-string fields
    });
  });
};

// Your handleSearch function
const handleSearch = async (req, res) => {
  const { schemaName, searchQuery } = req.query;

  const dynamicModel = await DynamicModel.findOne({ name: schemaName });
  if (!dynamicModel) {
    return res.status(404).json({ error: `Schema "${schemaName}" not found` });
  }

  let CurrentModel;
  const Models = mongoose.models;

  if (!(schemaName in Models)) {
    CurrentModel = mongoose.model(schemaName, dynamicModel.schema);
  } else {
    CurrentModel = mongoose.model(schemaName);
  }

  // Get items from the CurrentModel (your dynamic model)
  const items = await CurrentModel.find();

  // Apply filtering using the filterItems function
  const filteredItems = filterItems(items, searchQuery);

  res.status(StatusCodes.OK).json({ items: filteredItems });
};

module.exports = {
  createDynamicModel,
  getDynamicModelItems,
  createDynamicModelItem,
  deleteDynamicModelItem,
  updateDynamicModelItem,
  getDynamicModelByItem,
  createDynamicModelItemWithImage,
  handleSearch,
};
