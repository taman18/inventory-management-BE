const {
  getMaxOrdersUsersService,
  getTotalRevenueService,
  getOrderGroupByStatusService,
  getAverageOrderValueService,
} = require("../services/analytics.service");
const { sendResponse } = require("../utils/response");

const getMaxOrdersUsersController = async (req, res, next) => {
  try {
    const limit = Number(req.query?.limit) || 2;
    const users = await getMaxOrdersUsersService(limit);
    sendResponse(res, 200, {
      message: "Data fetched successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const getTotalRevenueController = async (req, res, next) => {
  try {
    const revenueData = await getTotalRevenueService();
    sendResponse(res, 200, {
      message: "Data fetched successfully",
      data: revenueData,
    });
  } catch (error) {
    next(error);
  }
};

const getOrderGroupByStatusController = async (req, res, next) => {
  try {
    const ordersData = await getOrderGroupByStatusService();
    sendResponse(res, 200, {
      message: "Data fetched successfully",
      data: ordersData,
    });
  } catch (error) {
    next(error);
  }
};

const getAverageOrderValueController = async (req, res, next) => {
  try {
    const avgRevenue = await getAverageOrderValueService();
    sendResponse(res, 200, {
      message: "Data fetched successfully",
      data: avgRevenue,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getMaxOrdersUsersController,
  getTotalRevenueController,
  getOrderGroupByStatusController,
  getAverageOrderValueController,
};
