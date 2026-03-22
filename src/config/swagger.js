const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CRUD API',
      version: '1.0.0',
      description: 'API documentation for your backend'
    },
    servers: [
      {
        url: 'http://localhost:8000/api/v1'
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;