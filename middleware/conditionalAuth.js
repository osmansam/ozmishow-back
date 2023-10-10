const { authenticateUser } = require("./authentication");
const DynamicModel = require("../models/DynamicModel");
const conditionalAuthentication = (functionName) => {
  return async (req, res, next) => {
    const { schemaName } = req.query;
    const dynamicModel = await DynamicModel.findOne({ name: schemaName });

    if (dynamicModel && dynamicModel.routes[functionName].isAuthanticated) {
      return authenticateUser(req, res, next);
    }

    next();
  };
};

module.exports = { conditionalAuthentication };
