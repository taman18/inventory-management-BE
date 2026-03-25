const Order = require("../models/orders.model");

const calculateTotalRevenue = async () => {
  const revenue = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$amount" },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);
  return revenue;
};

const getMaxOrdersUsersService = async (limit) => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: "$userId",
        orderCount: { $sum: 1 },
      },
    },
    {
      $sort: { orderCount: -1 },
    },
    {
      $limit: limit,
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        _id: 0,
        userId: "$user._id",
        name: "$user.name",
        email: "$user.email",
        orderCount: 1,
      },
    },
  ]);
  return result;
};

const getTotalRevenueService = async () => {
  const revenue = await calculateTotalRevenue();
  return revenue[0].totalRevenue;
};

const getOrderGroupByStatusService = async () => {
  const orders = Order.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        status: "$_id",
        count: 1,
      },
    },
  ]);
  return orders;
};

const getAverageOrderValueService = async () => {
  const totalRevenue = await calculateTotalRevenue();
  const totalOrdersCount = await Order.aggregate([
    {
      $group: {
        _id: null,
        ordersCount: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        ordersCount: 1,
      },
    },
  ]);
  return (totalRevenue[0]?.totalRevenue / totalOrdersCount[0]?.ordersCount).toFixed(2);
};

module.exports = {
  getMaxOrdersUsersService,
  getTotalRevenueService,
  getOrderGroupByStatusService,
  getAverageOrderValueService
};
