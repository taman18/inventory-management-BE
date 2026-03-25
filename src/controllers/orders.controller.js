const User = require("../models/users.model");
const {
  createOrderService,
  getCompletedOrdersService,
  getTotalRevenueService,
  getOrdersPerUserService,
  getOrdersSortedByDateService,
} = require("../services/orders.service");
const ApiError = require("../utils/apiError");
const { sendResponse } = require("../utils/response");

const createOrderController = async (req, res, next) => {
  try {
    const orderData = req.body;
    const { userId } = req.params;
    if (!orderData.product) {
      throw new ApiError(
        "Please send the product name",
        400,
        "VALIDATION_ERROR",
      );
    }
    if (orderData.amount < 1) {
      throw new ApiError(
        "Amount cannot be less than 1",
        400,
        "VALIDATION_ERROR",
      );
    }
    const isUserExist = await User.findById(userId);
    if (!isUserExist) {
      throw new ApiError("User not exist", 404, "User_NOT_EXIST");
    }
    const order = await createOrderService({ ...orderData, userId });
    sendResponse(res, 201, {
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const getCompletedOrdersController = async (req, res, next) => {
  try {
    const orders = await getCompletedOrdersService();
    sendResponse(res, 200, {
      message: "Completed orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

const getTotalRevenueController = async (req, res, next) => {
  try {
    const revenue = await getTotalRevenueService();
    sendResponse(res, 200, {
      message: "Total revenue fetched successfully",
      data: revenue,
    });
  } catch (error) {
    next(error);
  }
};

const getOrdersPerUserController = async (req, res, next) => {
    try {
        const data = await getOrdersPerUserService();
        sendResponse(res, 200, {
            message: "Orders per user fetched successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

const getOrdersSortedByDateController = async (req, res, next) => {
    try {
        const order = req.query.order || "desc";
        const orders = await getOrdersSortedByDateService(order);
        sendResponse(res, 200, {
            message: "Orders fetched successfully",
            data: orders,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
  createOrderController,
  getCompletedOrdersController,
  getTotalRevenueController,
  getOrdersPerUserController,
  getOrdersSortedByDateController
};
