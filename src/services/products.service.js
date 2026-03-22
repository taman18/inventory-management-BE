const Product = require("../models/products.model");
const ApiError = require("../utils/apiError");

const createProductService = async (data) => {
  const product = await Product.create(data);
  return product;
};

const getAllProductsService = async () => {
  const products = await Product.find();
  return products;
};

const deleteProductByIdService = async (productId) => {
  const product = await Product.findOneAndDelete({ _id: productId });
  if (!product) {
    throw new ApiError("Product not found", 404, "INVALID_REQUEST");
  }
  return product;
};

const updateProductService = async (productId, data) => {
  const updatedProduct = await Product.findByIdAndUpdate(productId, data, {
    new: true,
    runValidators: true,
  });

  if (!updatedProduct) {
    throw new ApiError("Product not found", 404, "INVALID_REQUEST");
  }

  return updatedProduct;
};

const getProductByIdService = async (productId) => {
  const product = await Product.findById(productId);
  return product;
};

module.exports = {
  createProductService,
  getAllProductsService,
  deleteProductByIdService,
  updateProductService,
  getProductByIdService,
};
