const User = require("../models/users.model");

const createNewUserService = async (userData) => {
  const user = await User.create(userData);
  return user;
};

const createManyUsersService = async (usersData) => {
  const users = await User.insertMany(usersData);
  return users;
};

const getAllUsersService = async ({ city, age }) => {
  const filter = {};
  if (city) filter.city = city;
  filter.age = { $gt: age };

  const users = await User.find(filter).sort({ createdAt: -1 }).lean();
  return users;
};

const filterUsersByCityService = async (city) => {
  const users = await User.aggregate([
    {
      $match: {
        city: city,
      },
    },
    {
      $project: {
        _id: 0,
        name: 1,
        email: 1,
        age: 1,
        city: 1,
      },
    },
  ]);
  return users;
};

const groupUsersByCityService = async () => {
  const result = await User.aggregate([
    {
      $group: {
        _id: "$city",
        users: { $push: { name: "$name", email: "$email", age: "$age" } },
      },
    },
    {
      $project: {
        _id: 0,
        city: "$_id",
        users: 1,
      },
    },
  ]);
  return result;
};

const updateSingleUserService = async (userId, updateData) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true },
  );
  return user;
};

const updateMultipleUsersService = async (city, incrementAge) => {
  const result = await User.updateMany(
    { city: city },
    { $inc: { age: Number(incrementAge) } },
  );
  return result;
};

const addEmailFieldService = async () => {
  const result = await User.updateMany(
    { email: { $exists: false } }, // only users without email
    { $set: { email: "notprovided@mail.com" } },
  );
  return result;
};

const deleteSingleUserService = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  return user;
};

const deleteUsersByConditionService = async (city, age) => {
  const filter = {};
  if (city) filter.city = city;
  if (age) filter.age = { $lt: Number(age) };
  const result = await User.deleteMany(filter);
  return result;
};

const sortUsersByAgeService = async (order) => {
  const sortOrder = order === "asc" ? 1 : -1;
  const users = await User.find().sort({ age: sortOrder }).lean();
  return users;
};

const getTopUsersService = async (limit) => {
  const users = await User.find()
    .sort({ createdAt: -1 }) // newest first
    .limit(Number(limit))
    .lean();
  return users;
};

const countTotalUsersService = async () => {
  const count = await User.countDocuments();
  return count;
};

const getDistinctCitiesService = async () => {
  const cities = await User.distinct("city");
  return cities;
};

const testQueryPerformanceService = async (email) => {
  const result = await User.collection
    .find({ email })
    .explain("executionStats");

  return {
    executionTimeMs: result.executionStats.executionTimeMillis,
    totalDocsExamined: result.executionStats.totalDocsExamined,
    totalDocsReturned: result.executionStats.nReturned,
    scanType: result.executionStats.executionStages.stage,
  };
};

const countUsersByCityService = async () => {
  const result = await User.aggregate([
    {
      $group: {
        _id: "$city",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        city: "$_id",
        count: 1,
      },
    },
    {
      $sort: { count: -1 },
    },
  ]);
  return result;
};

const avgAgeByCityService = async () => {
  const result = await User.aggregate([
    {
      $group: {
        _id: "$city",
        avgAge: { $avg: "$age" },
      },
    },
    {
      $project: {
        _id: 0,
        city: "$_id",
        avgAge: { $round: ["$avgAge", 2] },
      },
    },
    {
      $sort: { city: 1 },
    },
  ]);
  return result;
};

const getUsersProjectionService = async () => {
  const users = await User.find(
    {},
    { name: 1, city: 1, _id: 0 },
  ).lean();
  return users;
};

module.exports = {
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
  getUsersProjectionService
};
