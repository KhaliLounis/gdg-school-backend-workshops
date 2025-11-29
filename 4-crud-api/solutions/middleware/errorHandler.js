/**
 * Error Handler Middleware - Bonus
 * Centralized error handling for the API
 */

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      details: errors,
    });
  }

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      error: "Invalid ID format",
    });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      error: "Duplicate field value",
    });
  }

  // Default server error
  res.status(500).json({
    success: false,
    error: "Server error",
  });
};

module.exports = errorHandler;
