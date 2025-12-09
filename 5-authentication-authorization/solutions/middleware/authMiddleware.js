// ===========================================
// Authentication Middleware - Complete Solution
// ===========================================

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({
        error: "Access denied. No token provided.",
      });
    }

    // Extract token (format: "Bearer <token>")
    const token = authHeader.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        error: "Access denied. Invalid token format.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request object
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };

    // Continue to next middleware or route handler
    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }

    // Generic error
    res.status(401).json({ error: "Authentication failed" });
  }
};

module.exports = authMiddleware;
