// ===========================================
// Role-Based Authorization Middleware - Complete Solution
// ===========================================

/**
 * Middleware to check if user is an admin
 */
const adminOnly = (req, res, next) => {
  // Check if user is authenticated
  if (!req.user) {
    return res.status(401).json({
      error: "Authentication required",
    });
  }

  // Check if user has admin role
  if (req.user.role !== "admin") {
    return res.status(403).json({
      error: "Access denied. Admin privileges required.",
    });
  }

  // User is admin, continue
  next();
};

/**
 * Flexible middleware to check for specific roles
 * Usage: requireRole('admin', 'moderator')
 */
const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({
        error: "Authentication required",
      });
    }

    // Check if user has one of the allowed roles
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Access denied. Requires one of the following roles: ${allowedRoles.join(
          ", "
        )}`,
      });
    }

    // User has required role, continue
    next();
  };
};

/**
 * Middleware to check if user owns the resource or is admin
 * Usage: checkOwnershipOrAdmin(resourceUserId)
 */
const checkOwnershipOrAdmin = (resourceUserId) => {
  return (req, res, next) => {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({
        error: "Authentication required",
      });
    }

    // Check if user owns the resource or is admin
    const isOwner = req.user.userId.toString() === resourceUserId.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        error:
          "Access denied. You do not have permission to access this resource.",
      });
    }

    // User is owner or admin, continue
    next();
  };
};

module.exports = {
  adminOnly,
  requireRole,
  checkOwnershipOrAdmin,
};
