const express = require("express");
const app = express();
require("dotenv").config();
const router = require("./routes/products.route");
const connectDB = require("../src/config/connectDB");
const errorHandler = require("./middlewares/error.middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const cors = require('cors');

const PORT = process.env.PORT ?? 8000;

// connect database
connectDB();

const corsOptions = {
    origin: 'https://inventory-management-9k2t.onrender.com',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization']
};

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/v1", router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
