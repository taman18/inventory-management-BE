const Order = require("../models/orders.model");

const createOrderService = async (orderData) => {
  const order = await Order.create(orderData);
  return order;
};

const getCompletedOrdersService = async () => {
  const orders = await Order.find({ status: "completed" })
    .sort({ createdAt: -1 })
    .lean();
  return orders;
};

const getTotalRevenueService = async () => {
  const result = await Order.aggregate([
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
  return result[0]?.totalRevenue ?? 0;
};

const getOrdersPerUserService = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: "$userId",
        totalOrders: { $sum: 1 },
        totalSpent: { $sum: "$amount" },
      },
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
        userId: "$user._id",
        name: "$user.name",
        email: "$user.email",
        totalOrders: 1,
        totalSpent: 1,
      },
    },
  ]);
  return result;
};

const getOrdersSortedByDateService = async (order = "desc") => {
    const sortOrder = order === "asc" ? 1 : -1;
    const orders = await Order.find()
        .sort({ createdAt: sortOrder })
        .lean();
    return orders;
};


module.exports = {
  createOrderService,
  getCompletedOrdersService,
  getTotalRevenueService,
  getOrdersPerUserService,
  getOrdersSortedByDateService
};
