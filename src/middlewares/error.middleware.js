const errorHandler = (err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: {
      code: err.code || 'SERVER_ERROR',
      details: err.details || null
    }
  });
};

module.exports = errorHandler;