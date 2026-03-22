const sendResponse = (res, statusCode = 200, options = {}) => {
  const { message = "Success", data = null, meta = null } = options;

  return res.status(statusCode).json({
    success: statusCode < 400,
    message,
    ...(data && { data }),
    ...(meta && { meta }),
  });
};

module.exports = { sendResponse };
