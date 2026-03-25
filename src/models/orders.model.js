const mongoose = require("mongoose");

const OrdersSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: String,
      minLength: [1, "Product field cannot be empty"],
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [1, "Amount should be greater than or equal to 1"],
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true, versionKey: false
  },
);

const Order = mongoose.model("order", OrdersSchema);

module.exports = Order;
