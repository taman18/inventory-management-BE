const User = require("../models/users.model");
const {
  createNewUserService,
  createManyUsersService,
  getAllUsersService,
  filterUsersByCityService,
} = require("../services/users.service");
const ApiError = require("../utils/apiError");
const { sendResponse } = require("../utils/response");

const createNewUserController = async (req, res, next) => {
  try {
    const userData = req.body;
    if (!userData.name || !userData.email || !userData.age || !userData.city) {
      throw new ApiError(
        "Please send all the required fields of user",
        400,
        "VALIDATION_ERROR",
      );
    }
    const userExist = await User.findOne({ email: userData.email });
    if (userExist) {
      throw new ApiError("User already Exist", 400, "User_EXIST");
    }
    const user = await createNewUserService(userData);
    sendResponse(res, 201, {
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const createManyUsersController = async (req, res, next) => {
  try {
    const usersData = req.body;

    if (!Array.isArray(usersData) || usersData.length === 0) {
      throw new ApiError(
        "Please send an array of users",
        400,
        "VALIDATION_ERROR",
      );
    }

    for (const user of usersData) {
      if (!user.name || !user.email || !user.age || !user.city) {
        throw new ApiError(
          "Each user must have name, email, age and city",
          400,
          "VALIDATION_ERROR",
        );
      }
    }

    const emails = usersData.map((user) => user.email);
    const existingUsers = User.find({ email: { $in: emails } });
    if (existingUsers.length > 0) {
      const existingEmails = existingUsers.map((user) => user.email);

      throw new ApiError(
        `These emails already exist: ${existingEmails.join(", ")}`,
        400,
        "VALIDATION_ERROR",
      );
    }

    const users = await createManyUsersService(usersData);

    return res.status(201).json({
      success: true,
      message: "Users created successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsersController = async (req, res, next) => {
  try {
    const city = req.query.city || "";
    const age = req.query.age || 18;
    const users = await getAllUsersService({ city, age });
    sendResponse(res, 200, {
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const filterUsersByCityController = async (req, res, next) => {
  try {
    const city = req.query.city || "";
    if (!city) {
      return sendResponse(res, 400, { message: "City is required" });
    }
    const users = await filterUsersByCityService(city);
    sendResponse(res, 200, {
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewUserController,
  createManyUsersController,
  getAllUsersController,
  filterUsersByCityController
};
