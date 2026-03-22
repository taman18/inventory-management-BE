const { getAllProductsService, createProductService, deleteProductByIdService, updateProductService, updateProductCategoryService, getProductByIdService } = require("../services/products.service");
const ApiError = require("../utils/apiError");
const { sendResponse } = require("../utils/response");

const addProductController = async (req, res, next) => {
    try {
        const productData = req.body;
        if (!productData?.name || !productData?.quantity || !productData?.category) {
            throw new ApiError(
                "Invalid input. Please provide all required product details.",
                400,
                "VALIDATION_ERROR"
            );
        }
        const product = await createProductService(productData);
        sendResponse(res, 201, { message: 'OK', data: product });
    }
    catch (error) {
        next(error);
    }
}

const getAllProductsController = async (req, res, next) => {
    try {
        const allProducts = await getAllProductsService();
        sendResponse(res, 200, { message: 'OK', data: allProducts });
    }
    catch (error) {
        next(error);
    }
}

const deleteProductByIdController = async (req, res, next) => {
    try {
        const { productId } = req.params;
        if (!productId) {
            throw new ApiError("Product ID is mandatory. Please send with request", 400, 'INVALID_REQUEST');
        }
        const productDetail = await deleteProductByIdService(productId);
        sendResponse(res, 200, { message: 'Product deleted successfully', data: productDetail })
    }
    catch (error) {
        next(error);
    }
}

const updateProductController = async (req, res, next) => {
    try {
        const productData = req.body;
        const { productId } = req.params;
        if (!productData?.name || !productData?.quantity || !productData?.category || !productData?.price) {
            throw new ApiError("Product data is mandatory. Please send with request", 400, 'VALIDATION_ERROR')
        }
        if (!productId) {
            throw new ApiError("Product ID is mandatory. Please send with request", 400, 'INVALID_REQUEST');
        }
        const updatedProduct = await updateProductService(productData, productId);
        sendResponse(res, 200, { message: 'Product Updated Successfully', data: updatedProduct })
    }
    catch (error) {
        next(error);
    }
}

const updateProductCategoryController = async (req, res, next) => {
    try {
        const categoryName = req.body;
        const {productId} = req.params;
        if (!categoryName) {
            throw new ApiError("Category Name is mandatory. Please send with request", 400, 'VALIDATION_ERROR')
        }
        if (!productId) {
            throw new ApiError("Product ID is mandatory. Please send with request", 400, 'INVALID_REQUEST');
        }
        const updatedProduct = await updateProductCategoryService(categoryName, productId);
        sendResponse(res, 200, { message: 'Category Updated Successfully', data: updatedProduct })
    }
    catch (error) {
        next(error);
    }
}

const getProductByIdController = async (req, res, next) => {
    try {
        const {productId} = req.params;
        if (!productId) {
            throw new ApiError("Product ID is mandatory. Please send with request", 400, 'INVALID_REQUEST');
        }
        const product = await getProductByIdService(productId);
            sendResponse(res, 200, { message: 'Product fetched Successfuly', data: product })
    }
    catch (error) {
        next(error);
    }
}

module.exports = { addProductController, getAllProductsController, deleteProductByIdController, updateProductController, updateProductCategoryController, getProductByIdController }