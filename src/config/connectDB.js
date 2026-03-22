const mongoose = require("mongoose");

const mongoDB_URI = process.env.MONGODB_URI ?? "";
const DBName = process.env.DB_NAME ?? "";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${mongoDB_URI}/${DBName}`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
