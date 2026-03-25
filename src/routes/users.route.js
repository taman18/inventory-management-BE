const express = require("express");
const {
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
  getUsersProjectionController,
} = require("../controllers/users.controller");
const validateObjectId = require("../middlewares/validateObject.middleware");
const userRouter = express.Router();

/**
 * @swagger
 * /users/create-new-user:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - age
 *               - city
 *             properties:
 *               name:
 *                 type: string
 *                 example: Taman
 *               email:
 *                 type: string
 *                 example: taman@mail.com
 *               age:
 *                 type: number
 *                 example: 25
 *               city:
 *                 type: string
 *                 example: Mohali
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 69c22596d97ad5a04dd805db
 *                     name:
 *                       type: string
 *                       example: Taman
 *                     email:
 *                       type: string
 *                       example: taman@mail.com
 *                     age:
 *                       type: number
 *                       example: 25
 *                     city:
 *                       type: string
 *                       example: Mohali
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2026-03-25T08:30:00.000Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2026-03-25T08:30:00.000Z
 *       400:
 *         description: Validation error or user already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please send all the required fields of user
 *                 statusCode:
 *                   type: number
 *                   example: 400
 *                 errorCode:
 *                   type: string
 *                   example: VALIDATION_ERROR
 *       500:
 *         description: Internal server error
 */
userRouter.post("/create-new-user", createNewUserController);

/**
 * @swagger
 * /users/create-many-users:
 *   post:
 *     summary: Create multiple users
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - name
 *                 - email
 *                 - age
 *                 - city
 *               properties:
 *                 name:
 *                   type: string
 *                   example: Taman
 *                 email:
 *                   type: string
 *                   example: taman@mail.com
 *                 age:
 *                   type: number
 *                   example: 26
 *                 city:
 *                   type: string
 *                   example: Mohali
 *     responses:
 *       201:
 *         description: Users created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
userRouter.post("/create-many-users", createManyUsersController);

/**
 * @swagger
 * /users/get-all-users:
 *   get:
 *     summary: Fetch all users
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: city
 *         required: false
 *         schema:
 *           type: string
 *           example: Mohali
 *         description: Filter users by city
 *       - in: query
 *         name: age
 *         required: false
 *         schema:
 *           type: number
 *           example: 18
 *         description: Fetch users with age greater than this value
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Users fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 69c22596d97ad5a04dd805db
 *                       name:
 *                         type: string
 *                         example: Taman
 *                       email:
 *                         type: string
 *                         example: taman@mail.com
 *                       age:
 *                         type: number
 *                         example: 26
 *                       city:
 *                         type: string
 *                         example: Mohali
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-03-25T10:00:00.000Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-03-25T10:00:00.000Z
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
userRouter.get("/get-all-users", getAllUsersController);

/**
 * @swagger
 * /users/filter-by-city:
 *   get:
 *     summary: Filter users by city
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *           example: Mohali
 *         description: City to filter users by
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Users fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: Taman
 *                       email:
 *                         type: string
 *                         example: taman@mail.com
 *                       age:
 *                         type: number
 *                         example: 26
 *                       city:
 *                         type: string
 *                         example: Mohali
 *       400:
 *         description: City is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: City is required
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
userRouter.get("/filter-by-city", filterUsersByCityController);

/**
 * @swagger
 * /users/update/{id}:
 *   patch:
 *     summary: Update a single user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 64abc123def456
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Taman
 *               email:
 *                 type: string
 *                 example: taman@mail.com
 *               age:
 *                 type: number
 *                 example: 27
 *               city:
 *                 type: string
 *                 example: Mohali
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 64abc123def456
 *                     name:
 *                       type: string
 *                       example: Taman
 *                     email:
 *                       type: string
 *                       example: taman@mail.com
 *                     age:
 *                       type: number
 *                       example: 27
 *                     city:
 *                       type: string
 *                       example: Mohali
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
userRouter.patch("/update/:id", validateObjectId('id'), updateSingleUserController);

/**
 * @swagger
 * /users/increment-age:
 *   patch:
 *     summary: Increment age of all users in a city
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - city
 *               - incrementAge
 *             properties:
 *               city:
 *                 type: string
 *                 example: Mohali
 *               incrementAge:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: Users updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Users updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     matchedCount:
 *                       type: number
 *                       example: 5
 *                     modifiedCount:
 *                       type: number
 *                       example: 5
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: city and incrementAge are required
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
userRouter.patch("/increment-age", updateMultipleUsersController);

/**
 * @swagger
 * /users/add-email:
 *   patch:
 *     summary: Add default email to users missing it
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Email field added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Email field added successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     matchedCount:
 *                       type: number
 *                       example: 10
 *                     modifiedCount:
 *                       type: number
 *                       example: 10
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
userRouter.patch("/add-email", addEmailFieldController);

/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Delete a single user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 64abc123def456
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 64abc123def456
 *                     name:
 *                       type: string
 *                       example: Taman
 *                     email:
 *                       type: string
 *                       example: taman@mail.com
 *                     age:
 *                       type: number
 *                       example: 26
 *                     city:
 *                       type: string
 *                       example: Mohali
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
userRouter.delete("/delete/:id", validateObjectId('id'), deleteSingleUserController);

/**
 * @swagger
 * /users/delete-by-condition:
 *   delete:
 *     summary: Delete users based on condition
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               city:
 *                 type: string
 *                 example: Mohali
 *                 description: Delete users from this city
 *               age:
 *                 type: number
 *                 example: 18
 *                 description: Delete users younger than this age
 *     responses:
 *       200:
 *         description: Users deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Users deleted successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     deletedCount:
 *                       type: number
 *                       example: 5
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: At least one condition (city or age) is required
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
userRouter.delete("/delete-by-condition", deleteUsersByConditionController);


/**
 * @swagger
 * /users/sort-by-age:
 *   get:
 *     summary: Sort users by age
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: order
 *         required: false
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           example: asc
 *         description: Sort direction - asc for youngest first, desc for oldest first
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Users fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 64abc123def456
 *                       name:
 *                         type: string
 *                         example: Taman
 *                       email:
 *                         type: string
 *                         example: taman@mail.com
 *                       age:
 *                         type: number
 *                         example: 26
 *                       city:
 *                         type: string
 *                         example: Mohali
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
userRouter.get("/sort-by-age", sortUsersByAgeController);


/**
 * @swagger
 * /users/top-users:
 *   get:
 *     summary: Get top N users
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: number
 *           example: 5
 *         description: Number of users to return (default 5)
 *     responses:
 *       200:
 *         description: Top users fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Top users fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 64abc123def456
 *                       name:
 *                         type: string
 *                         example: Taman
 *                       email:
 *                         type: string
 *                         example: taman@mail.com
 *                       age:
 *                         type: number
 *                         example: 26
 *                       city:
 *                         type: string
 *                         example: Mohali
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
userRouter.get("/top-users", getTopUsersController);

/**
 * @swagger
 * /users/count:
 *   get:
 *     summary: Get total users count
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Total users count fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Total users count fetched successfully
 *                 data:
 *                   type: number
 *                   example: 150
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
userRouter.get("/count", countTotalUsersController);

/**
 * @swagger
 * /users/distinct-cities:
 *   get:
 *     summary: Get all distinct cities
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Distinct cities fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Distinct cities fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Mohali", "Delhi", "Mumbai", "Bangalore"]
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
userRouter.get("/distinct-cities", getDistinctCitiesController);

/**
 * @swagger
 * /users/query-performance:
 *   get:
 *     summary: Test query performance on email field
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           example: taman@mail.com
 *         description: Email to search and test performance on
 *     responses:
 *       200:
 *         description: Query performance fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Query performance fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     executionTimeMs:
 *                       type: number
 *                       example: 2
 *                     totalDocsExamined:
 *                       type: number
 *                       example: 1
 *                     totalDocsReturned:
 *                       type: number
 *                       example: 1
 *                     scanType:
 *                       type: string
 *                       example: IXSCAN
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Email is required
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
userRouter.get("/query-performance", testQueryPerformanceController);

/**
 * @swagger
 * /users/group-by-city:
 *   get:
 *     summary: Group users by city
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Users grouped by city successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Users grouped by city successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       city:
 *                         type: string
 *                         example: Mohali
 *                       users:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                               example: Taman
 *                             email:
 *                               type: string
 *                               example: taman@mail.com
 *                             age:
 *                               type: number
 *                               example: 26
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
userRouter.get("/group-by-city", groupUsersByCityController);

/**
 * @swagger
 * /users/count-by-city:
 *   get:
 *     summary: Count users per city
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: User count per city fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User count per city fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       city:
 *                         type: string
 *                         example: Mohali
 *                       count:
 *                         type: number
 *                         example: 45
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
userRouter.get("/count-by-city", countUsersByCityController);

/**
 * @swagger
 * /users/avg-age-by-city:
 *   get:
 *     summary: Calculate average age per city
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Average age per city fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Average age per city fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       city:
 *                         type: string
 *                         example: Mohali
 *                       avgAge:
 *                         type: number
 *                         example: 26.75
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
userRouter.get("/avg-age-by-city", avgAgeByCityController);


/**
 * @swagger
 * /users/projection:
 *   get:
 *     summary: Fetch only name and city fields excluding _id
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Users fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: Taman
 *                       city:
 *                         type: string
 *                         example: Mohali
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
userRouter.get("/projection", getUsersProjectionController);


module.exports = userRouter;
