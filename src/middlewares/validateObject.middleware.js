const mongoose = require("mongoose");
const ApiError = require("../utils/apiError");

const validateObjectId = (paramName) => {
  return (req, res, next) => {
    const value = req.params[paramName];

    if (!mongoose.Types.ObjectId.isValid(value)) {
      return next(
        new ApiError(`Invalid ${paramName}`, 400, "VALIDATION_ERROR")
      );
    }

    next();
  };
};

module.exports = validateObjectId;