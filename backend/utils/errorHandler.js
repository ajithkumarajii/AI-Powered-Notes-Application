/**
 * Centralized error response handler
 */
const sendError = (res, statusCode, message) => {
  res.status(statusCode).json({ error: message });
};

/**
 * Validation error handler
 */
const sendValidationError = (res, message) => {
  sendError(res, 400, message);
};

/**
 * Authorization error handler
 */
const sendAuthError = (res, message = 'Unauthorized') => {
  sendError(res, 401, message);
};

/**
 * Forbidden error handler
 */
const sendForbiddenError = (res, message = 'Forbidden') => {
  sendError(res, 403, message);
};

/**
 * Not found error handler
 */
const sendNotFoundError = (res, message) => {
  sendError(res, 404, message);
};

/**
 * Conflict error handler (409)
 */
const sendConflictError = (res, message) => {
  sendError(res, 409, message);
};

/**
 * Server error handler
 */
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
