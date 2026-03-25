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

module.exports = {
  createNewUserService,
  createManyUsersService,
  getAllUsersService,
  filterUsersByCityService
};
