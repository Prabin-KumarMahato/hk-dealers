/**
 * Global error handler. Handles Mongoose validation, JWT, and custom errors.
 */
export function errorHandler(err, req, res, next) {
  let status = err.status || 500;
  let message = err.message || "Unexpected server error";

  // Mongoose validation error
  if (err.name === "ValidationError") {
    status = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  // Mongoose duplicate key (e.g. unique email)
  if (err.code === 11000) {
    status = 400;
    message = "Duplicate field value (e.g. email already in use)";
  }

  // Mongoose CastError (invalid ObjectId)
  if (err.name === "CastError") {
    status = 400;
    message = "Invalid ID format";
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    status = 401;
    message = "Invalid token";
  }
  if (err.name === "TokenExpiredError") {
    status = 401;
    message = "Token expired";
  }

  // Multer / upload errors (e.g. file too large, wrong field name)
  if (err.code === "LIMIT_FILE_SIZE") {
    status = 400;
    message = "File too large (max 5 MB)";
  }
  if (err.code === "LIMIT_UNEXPECTED_FILE") {
    status = 400;
    message = "Unexpected file field (use 'image')";
  }
  if (err.message && err.message.includes("Only JPEG")) {
    status = 400;
    message = err.message;
  }

  if (status === 500) {
    console.error("[Server Error]", err.message || err);
  }

  res.status(status).json({ message });
}
