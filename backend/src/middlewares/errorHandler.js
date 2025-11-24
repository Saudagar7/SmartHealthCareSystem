const errorHandler = (err, req, res, next) => {
  // Log the error for server-side inspection without leaking stack traces
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  const status = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(status).json({
    error: message,
  });
};

module.exports = errorHandler;
