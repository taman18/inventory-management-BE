const express = require("express");
const {
  createOrderController,
  getCompletedOrdersController,
  getTotalRevenueController,
  getOrdersPerUserController,
  getOrdersSortedByDateController,
} = require("../controllers/orders.controller");
const orderRouter = express.Router();
const validateObjectId = require("../middlewares/validateObject.middleware");

/**
 * @swagger
 * /orders/create-order/{userId}:
 *   post:
 *     summary: Create a new order for a specific user
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: MongoDB ObjectId of the user
 *         schema:
 *           type: string
 *           example: 69c22596d97ad5a04dd805db
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product
 *               - amount
 *             properties:
 *               product:
 *                 type: string
 *                 example: iPhone 15
 *               amount:
 *                 type: number
 *                 example: 75000
 *               status:
 *                 type: string
 *                 example: pending
 *                 enum:
 *                   - pending
 *                   - completed
 *                   - cancelled
 *     responses:
 *       201:
 *         description: Order created successfully
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
 *                   example: Order created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 69c33596d97ad5a04dd806aa
 *                     userId:
 *                       type: string
 *                       example: 69c22596d97ad5a04dd805db
 *                     product:
 *                       type: string
 *                       example: iPhone 15
 *                     amount:
 *                       type: number
 *                       example: 75000
 *                     status:
 *                       type: string
 *                       example: pending
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2026-03-25T09:45:00.000Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2026-03-25T09:45:00.000Z
 *       400:
 *         description: Validation error or invalid request
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
 *                   example: Please send all the required fields of order
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: VALIDATION_ERROR
 *                     details:
 *                       type: string
 *                       nullable: true
 *                       example: null
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
 *                   example: User not exist
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: USER_NOT_EXIST
 *                     details:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *       500:
 *         description: Internal server error
 */
orderRouter.post(
  "/create-order/:userId",
  validateObjectId("userId"),
  createOrderController,
);

/**
 * @swagger
 * /orders/completed-orders:
 *   get:
 *     summary: Fetch all completed orders
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: Completed orders fetched successfully
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
 *                   example: Completed orders fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 64abc123def456
 *                       userId:
 *                         type: string
 *                         example: 64abc123def789
 *                       amount:
 *                         type: number
 *                         example: 1500
 *                       status:
 *                         type: string
 *                         example: completed
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
orderRouter.get("/completed-orders", getCompletedOrdersController);

/**
 * @swagger
 * /orders/total-revenue:
 *   get:
 *     summary: Get total revenue from all orders
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: Total revenue fetched successfully
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
 *                   example: Total revenue fetched successfully
 *                 data:
 *                   type: number
 *                   example: 521796
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
orderRouter.get("/total-revenue", getTotalRevenueController);

/**
 * @swagger
 * /orders/orders-per-user:
 *   get:
 *     summary: Get total orders and spending per user
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: Orders per user fetched successfully
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
 *                   example: Orders per user fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: string
 *                         example: 64abc123def789
 *                       totalOrders:
 *                         type: number
 *                         example: 10
 *                       totalSpent:
 *                         type: number
 *                         example: 15000
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
orderRouter.get("/orders-per-user", getOrdersPerUserController);

/**
 * @swagger
 * /orders/orders-by-date:
 *   get:
 *     summary: Get all orders sorted by date
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: query
 *         name: order
 *         required: false
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           example: desc
 *         description: Sort direction - asc for oldest first, desc for newest first
 *     responses:
 *       200:
 *         description: Orders fetched successfully
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
 *                   example: Orders fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 64abc123def456
 *                       userId:
 *                         type: string
 *                         example: 64abc123def789
 *                       amount:
 *                         type: number
 *                         example: 1500
 *                       status:
 *                         type: string
 *                         example: completed
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
orderRouter.get("/orders-by-date", getOrdersSortedByDateController);

module.exports = orderRouter;
