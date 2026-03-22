const mongoose = require('mongoose');
const ApiError = require('../utils/apiError');

const validateObjectId = async (req, res, next) => {
    const {productId} = req.params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
    return next(new ApiError("Invalid Product ID", 400, "VALIDATION_ERROR"));
    }
    next();

}

module.exports = validateObjectId;