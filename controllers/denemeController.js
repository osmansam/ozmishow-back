const mongoose = require("mongoose");
const DynamicModel = require("../models/DynamicModel");
const { StatusCodes } = require("http-status-codes");
const cloudinary = require("cloudinary").v2;
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
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
    const authValues = {
      isAuthanticated: false,
      isAuthorized: false,
    };
    const routes = {
      createDynamicModelItem: authValues,
      createDynamicModelItemWithImage: authValues,
      getDynamicModelItems: authValues,
      getDynamicModelByItem: authValues,
      updateDynamicModelItem: authValues,
      updateDynamicModelItemWithImage: authValues,
      deleteDynamicModelItem: authValues,
      handleSearch: authValues,
    };

    // Save the model definition in the DynamicModel collection
    await DynamicModel.create({
      name: schemaName,
      schema: schemaFields,
      isPage: isPage,
      pageName: pageName,
      columns: columns,
      routes: routes,
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
// update an item with an image
const updateDynamicModelItemWithImage = async (req, res) => {
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
      if (req.files && req.files[imageItem]) {
        const tempFilePath = req.files[imageItem].tempFilePath;

        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(tempFilePath);

        // Store the secure_url in the object with the image item name as the key
        imgUrls[imageItem] = result.secure_url;
      }
    })
  );

  const item = await CurrentModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
      ...imgUrls,
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
    const { schemaName } = req.query;

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
    const populateFileds = Object.keys(dynamicModel.schema)
      .map((key) => ({
        name: key,
        ...dynamicModel.schema[key],
      }))
      .filter((item) => item.type === "ObjectId")
      .map((item) => item.name);
    let items;
    if (populateFileds.length > 0) {
      await Promise.all(
        populateFileds.map(async (item) => {
          const populateModel = await DynamicModel.findOne({
            name: item,
          });

          if (populateModel && !(item in Models)) {
            mongoose.model(item, populateModel.schema);
          }
        })
      );
      items = await CurrentModel.find().populate(populateFileds);
    } else {
      items = await CurrentModel.find();
    }

    res.status(200).json({ items, schemaName });
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
  const populateFileds = Object.keys(dynamicModel.schema)
    .map((key) => ({
      name: key,
      ...dynamicModel.schema[key],
    }))
    .filter((item) => item.type === "ObjectId")
    .map((item) => item.name);

  if (populateFileds.length > 0) {
    await Promise.all(
      populateFileds.map(async (item) => {
        const populateModel = await DynamicModel.findOne({
          name: item,
        });

        if (populateModel && !(item in Models)) {
          mongoose.model(item, populateModel.schema);
        }
      })
    );
  }
  let items;
  if (populateFileds.length > 0) {
    items = await CurrentModel.find({ [getFor]: value }).populate(
      populateFileds
    );
  } else {
    items = await CurrentModel.find({ [getFor]: value });
  }

  res.status(StatusCodes.OK).json({ items, schemaName });
};
// search for a specific item
// Define a reusable function to filter items based on a search query
const filterItems = (items, searchQuery) => {
  const checkStringMatch = (value, query) => {
    return (
      typeof value === "string" &&
      value.toLowerCase().includes(query.toLowerCase())
    );
  };

  const checkObjectForMatch = (object, query, depth = 0) => {
    if (depth > 5) return false; // To prevent infinite loops in deep objects

    return Object.values(object).some((value) => {
      if (checkStringMatch(value, query)) {
        return true;
      }
      if (typeof value === "object" && value !== null) {
        return checkObjectForMatch(value, query, depth + 1);
      }
      return false;
    });
  };

  return items.filter((item) => checkObjectForMatch(item._doc, searchQuery));
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
  const populateFileds = Object.keys(dynamicModel.schema)
    .map((key) => ({
      name: key,
      ...dynamicModel.schema[key],
    }))
    .filter((item) => item.type === "ObjectId")
    .map((item) => item.name);

  if (populateFileds.length > 0) {
    await Promise.all(
      populateFileds.map(async (item) => {
        const populateModel = await DynamicModel.findOne({
          name: item,
        });

        if (populateModel && !(item in Models)) {
          mongoose.model(item, populateModel.schema);
        }
      })
    );
  }
  let items;
  if (populateFileds.length > 0) {
    items = await CurrentModel.find().populate(populateFileds);
  } else {
    items = await CurrentModel.find();
  }

  // Apply filtering using the filterItems function
  const filteredItems = filterItems(items, searchQuery);

  res.status(StatusCodes.OK).json({ items: filteredItems, schemaName });
};

const artik = async (req, res) => {
  const { schemaName } = req.query;
  await mongoose.connection.db.dropCollection(schemaName);
  res.json({ message: "ok" });
};

module.exports = {
  createDynamicModel,
  getDynamicModelItems,
  createDynamicModelItem,
  deleteDynamicModelItem,
  updateDynamicModelItem,
  getDynamicModelByItem,
  createDynamicModelItemWithImage,
  updateDynamicModelItemWithImage,
  handleSearch,
  artik,
};
