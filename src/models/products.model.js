const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: [1, "Name cannot be empty"],
    },
    price: {
      type: Number,
      min: [0, "Price cannot be negative"],
      required: [true, "Price is required"],
      default: 0,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: 0,
      default: 0,
    },
    category: {
      type: String,
      trim: true,
      required: true,
      minLength: [1, "Category cannot be empty"],
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
