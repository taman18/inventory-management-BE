const express = require("express");
const {
  createNewUserController,
  createManyUsersController,
  getAllUsersController,
  filterUsersByCityController,
} = require("../controllers/users.controller");
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

module.exports = userRouter;
