const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("../src/config/connectDB");
const errorHandler = require("./middlewares/error.middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const cors = require('cors');
const userRouter = require("./routes/users.route");
const orderRouter = require("./routes/orders.route");
const productRouter = require("./routes/products.route");
const analyticsRouter = require("./routes/analytics.route");

const PORT = process.env.PORT ?? 8000;

// connect database
connectDB();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/v1/products", productRouter)
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/analytics", analyticsRouter);


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
