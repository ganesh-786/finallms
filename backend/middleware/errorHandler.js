const errorHandler = (err, req, res, next) => {
  console.error("Error stack:", err.stack);

  let error = { ...err };
  error.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = "Resource not found";
    return res.status(404).json({
      success: false,
      message,
      error: message,
    });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    return res.status(400).json({
      success: false,
      message,
      error: message,
    });
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      error: message,
    });
  }

  // Default error
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Server Error",
    error:
      process.env.NODE_ENV === "production"
        ? "Something went wrong"
        : error.message,
  });
};

module.exports = errorHandler;
