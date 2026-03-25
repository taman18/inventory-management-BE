const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: [1, "Name field cannot be empty"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      minLength: [1, "Email field cannot be empty"],
      unique: true
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [18, "Age must be greater than or equal to 18"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
      minLength: [1, "City field cannot be empty"],
    },
  },
  { timestamps: true, versionKey: false },
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
