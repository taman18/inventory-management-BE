const express = require('express');
const router = express.Router();
const { addProductController, getAllProductsController, deleteProductByIdController, updateProductController, updateProductCategoryController, getProductByIdController } = require('../controllers/products.controller');
const validateObjectId = require('../middlewares/validateObject.middleware');

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     description: Get all products
 *     tags: 
 *       - Products
 *     responses:
 *       200:
 *         description: Products fetched Successfuly.
 */
router.get('/products', getAllProductsController);

/**
 * @swagger
 * /products/add-product:
 *   post:
 *     summary: Create a new product
 *     description: Adds a new product to the system with required fields like name, quantity, and category.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - quantity
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: "iPhone 15"
 *               quantity:
 *                 type: number
 *                 example: 10
 *               category:
 *                 type: string
 *                 example: "Electronics"
 *     responses:
 *       201:
 *         description: Product created successfully
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
 *                   example: Product created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "1712345678901"
 *                     name:
 *                       type: string
 *                       example: "iPhone 15"
 *                     quantity:
 *                       type: number
 *                       example: 10
 *                     category:
 *                       type: string
 *                       example: "Electronics"
 *       400:
 *         description: Validation error - missing required fields
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
 *                   example: "Invalid input. Please provide all required product details."
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: VALIDATION_ERROR
 *                     details:
 *                       type: object
 *                       nullable: true
 *                       example: null
 *       500:
 *         description: Internal server error
 */
router.post('/products/add-product', addProductController);

/**
 * @swagger
 * /delete-product/{productId}:
 *   delete:
 *     summary: Delete a product
 *     description: Delete a product by product ID
 *     tags: 
 *       - Products
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete('/delete-product/:productId',validateObjectId, deleteProductByIdController);

/**
 * @swagger
 * /update-product/{productId}:
 *   put:
 *     summary: update a product
 *     description: update a product by product ID
 *     tags: 
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - quantity
 *               - category
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: "iPhone 15"
 *               quantity:
 *                 type: number
 *                 example: 10
 *               category:
 *                 type: string
 *                 example: "Electronics"
 *               price: 
 *                  type: number
 *                  example: 80000
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product Updated Successfully
 *       404:
 *         description: Product not found
 */
router.put('/update-product/:productId',validateObjectId, updateProductController);

/**
 * @swagger
 * /update-category/{productId}:
 *   patch:
 *     summary: update a category
 *     description: update a product category by product ID
 *     tags: 
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category
 *             properties:
 *               category:
 *                 type: string
 *                 example: "Electronics"
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category Updated Successfully
 *       404:
 *         description: Product not found
 */
router.patch('/update-category/:productId',validateObjectId, updateProductCategoryController);

/**
 * @swagger
 * /product/{productId}:
 *   get:
 *     summary: Get product by product ID
 *     description: Get product by product ID
 *     tags: 
 *       - Products
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product fetched Successfuly.
 */
router.get('/product/:productId',validateObjectId, getProductByIdController);

module.exports = router;