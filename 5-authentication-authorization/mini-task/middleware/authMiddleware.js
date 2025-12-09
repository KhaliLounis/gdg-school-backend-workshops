// ===========================================
// Authentication Middleware
// TODO: Complete the implementation
// ===========================================

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // TODO: Implement authentication logic

  // 1. Get token from Authorization header
  //    - Format: "Bearer <token>"
  //    - Extract token part only

  // 2. Check if token exists
  //    - If not, return 401 with error message

  // 3. Verify token using jwt.verify()
  //    - Use process.env.JWT_SECRET
  //    - Handle errors (invalid token)

  // 4. Attach decoded user info to req.user

  // 5. Call next() to continue to route handler

  res.status(401).json({ error: "Not implemented yet" });
};

module.exports = authMiddleware;
