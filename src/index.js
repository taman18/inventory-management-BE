const express = require('express');
const app = express();
require('dotenv').config()
const router = require('./routes/products.route')
const connectDB = require('../src/config/connectDB');
const errorHandler = require('./middlewares/error.middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const PORT = process.env.PORT ?? 8000;

// connect database
connectDB();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1', router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});