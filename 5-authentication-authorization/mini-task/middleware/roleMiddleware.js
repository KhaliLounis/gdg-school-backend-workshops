// ===========================================
// Role-Based Authorization Middleware
// TODO: Complete the implementation
// ===========================================

// Admin-only middleware
const adminOnly = (req, res, next) => {
  // TODO: Implement admin authorization

  // 1. Check if req.user exists
  //    - If not, return 401 (not authenticated)

  // 2. Check if req.user.role is 'admin'
  //    - If not, return 403 (forbidden)

  // 3. Call next() to continue

  res.status(403).json({ error: "Not implemented yet" });
};

// Flexible role checker
const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    // TODO: Implement flexible role checking

    // 1. Check if req.user exists
    //    - If not, return 401

    // 2. Check if req.user.role is in allowedRoles
    //    - Use allowedRoles.includes()
    //    - If not, return 403

    // 3. Call next() to continue

    res.status(403).json({ error: "Not implemented yet" });
  };
};

module.exports = { adminOnly, requireRole };
