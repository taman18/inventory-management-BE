const User = require("../models/users.model");
const {
  createNewUserService,
  createManyUsersService,
  getAllUsersService,
  filterUsersByCityService,
  updateSingleUserService,
  updateMultipleUsersService,
  addEmailFieldService,
  deleteSingleUserService,
  deleteUsersByConditionService,
  sortUsersByAgeService,
  getTopUsersService,
  countTotalUsersService,
  getDistinctCitiesService,
  testQueryPerformanceService,
  groupUsersByCityService,
  countUsersByCityService,
  avgAgeByCityService,
  getUsersProjectionService,
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

const updateSingleUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await updateSingleUserService(id, req.body);
    if (!user) {
      return sendResponse(res, 404, { message: "User not found" });
    }
    sendResponse(res, 200, {
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateMultipleUsersController = async (req, res, next) => {
  try {
    const { city, incrementAge } = req.body;
    if (!city || !incrementAge) {
      return sendResponse(res, 400, {
        message: "city and incrementAge are required",
      });
    }
    const result = await updateMultipleUsersService(city, incrementAge);
    sendResponse(res, 200, {
      message: "Users updated successfully",
      data: {
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

const addEmailFieldController = async (req, res, next) => {
  try {
    const result = await addEmailFieldService();
    sendResponse(res, 200, {
      message: "Email field added successfully",
      data: {
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteSingleUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await deleteSingleUserService(id);
    if (!user) {
      return sendResponse(res, 404, { message: "User not found" });
    }
    sendResponse(res, 200, {
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUsersByConditionController = async (req, res, next) => {
  try {
    const { city, age } = req.body;
    if (!city && !age) {
      return sendResponse(res, 400, {
        message: "At least one condition (city or age) is required",
      });
    }
    const result = await deleteUsersByConditionService(city, age);
    sendResponse(res, 200, {
      message: "Users deleted successfully",
      data: {
        deletedCount: result.deletedCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

const sortUsersByAgeController = async (req, res, next) => {
  try {
    const order = req.query.order || "asc"; // ?order=asc or ?order=desc
    const users = await sortUsersByAgeService(order);
    sendResponse(res, 200, {
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const getTopUsersController = async (req, res, next) => {
  try {
    const limit = req.query.limit || 5; // default top 5
    const users = await getTopUsersService(limit);
    sendResponse(res, 200, {
      message: "Top users fetched successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const countTotalUsersController = async (req, res, next) => {
    try {
        const count = await countTotalUsersService();
        sendResponse(res, 200, {
            message: "Total users count fetched successfully",
            data: count,
        });
    } catch (error) {
        next(error);
    }
};

const getDistinctCitiesController = async (req, res, next) => {
    try {
        const cities = await getDistinctCitiesService();
        sendResponse(res, 200, {
            message: "Distinct cities fetched successfully",
            data: cities,
        });
    } catch (error) {
        next(error);
    }
};

const testQueryPerformanceController = async (req, res, next) => {
    try {
        const { email } = req.query;
        if (!email) {
            return sendResponse(res, 400, { message: "Email is required" });
        }
        const result = await testQueryPerformanceService(email);
        sendResponse(res, 200, {
            message: "Query performance fetched successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const groupUsersByCityController = async (req, res, next) => {
    try {
        const data = await groupUsersByCityService();
        sendResponse(res, 200, {
            message: "Users grouped by city successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

const countUsersByCityController = async (req, res, next) => {
    try {
        const data = await countUsersByCityService();
        sendResponse(res, 200, {
            message: "User count per city fetched successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

const avgAgeByCityController = async (req, res, next) => {
    try {
        const data = await avgAgeByCityService();
        sendResponse(res, 200, {
            message: "Average age per city fetched successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

const getUsersProjectionController = async (req, res, next) => {
    try {
        const users = await getUsersProjectionService();
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
  filterUsersByCityController,
  updateSingleUserController,
  updateMultipleUsersController,
  addEmailFieldController,
  deleteSingleUserController,
  deleteUsersByConditionController,
  sortUsersByAgeController,
  getTopUsersController,
  countTotalUsersController,
  getDistinctCitiesController,
  testQueryPerformanceController,
  groupUsersByCityController,
  countUsersByCityController,
  avgAgeByCityController,
  getUsersProjectionController
};
