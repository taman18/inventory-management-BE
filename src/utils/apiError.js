class ApiError extends Error {
  constructor(message, statusCode, code = 'ERROR', details = null) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

module.exports = ApiError;