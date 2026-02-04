const sendError = (res, statusCode, message) => {
  res.status(statusCode).json({ error: message });
};

const sendValidationError = (res, message) => {
  sendError(res, 400, message);
};

const sendAuthError = (res, message = 'Unauthorized') => {
  sendError(res, 401, message);
};

const sendForbiddenError = (res, message = 'Forbidden') => {
  sendError(res, 403, message);
};

const sendNotFoundError = (res, message) => {
  sendError(res, 404, message);
};

const sendConflictError = (res, message) => {
  sendError(res, 409, message);
};

const sendServerError = (res, error) => {
  console.error('Server error:', error);
  sendError(res, 500, error.message || 'Internal server error');
};

module.exports = {
  sendError,
  sendValidationError,
  sendAuthError,
  sendForbiddenError,
  sendNotFoundError,
  sendConflictError,
  sendServerError,
};
