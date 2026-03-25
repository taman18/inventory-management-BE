const express = require("express");
const {
  getMaxOrdersUsersController,
  getTotalRevenueController,
  getOrderGroupByStatusController,
  getAverageOrderValueController,
} = require("../controllers/analytics.controller");
const analyticsRouter = express.Router();

// Top users (max orders)

/**
 * @swagger
 * /analytics/get-max-orders-users:
 *   get:
 *     summary: Get top users with maximum orders
 *     description: Returns the list of users who have placed the highest number of orders.
 *     tags:
 *       - Analytics
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 5
 *         required: false
 *         description: Number of top users to return. Default is 2.
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
 *                   example: Data fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: string
 *                         example: 65f3c2d4a7d2e9b123456789
 *                       name:
 *                         type: string
 *                         example: Rahul
 *                       email:
 *                         type: string
 *                         example: rahul@gmail.com
 *                       orderCount:
 *                         type: integer
 *                         example: 8
 *       400:
 *         description: Invalid query parameter
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
 *                   example: Invalid limit value
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
analyticsRouter.get("/get-max-orders-users", getMaxOrdersUsersController);

// Total revenue
/**
 * @swagger
 * /analytics/get-total-revenue:
 *   get:
 *     summary: Get total revenue
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Data fetched successfully
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
 *                   example: Data fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       totalRevenue:
 *                         type: number
 *                         example: 95000
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
analyticsRouter.get("/get-total-revenue", getTotalRevenueController);

// Orders grouped by status
/**
 * @swagger
 * /analytics/get-orders-by-status:
 *   get:
 *     summary: Get orders grouped by status
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Data fetched successfully
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
 *                   example: Data fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       status:
 *                         type: string
 *                         example: pending
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
analyticsRouter.get("/get-orders-by-status", getOrderGroupByStatusController);


// Average order value
/**
 * @swagger
 * /analytics/get-average-order-value:
 *   get:
 *     summary: Get average order value
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Data fetched successfully
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
 *                   example: Data fetched successfully
 *                 data:
 *                   type: number
 *                   example: 2851.07
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
analyticsRouter.get('/get-average-order-value', getAverageOrderValueController)

module.exports = analyticsRouter;
