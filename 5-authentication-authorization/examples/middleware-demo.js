// ===========================================
// Authentication Middleware Demo
// ===========================================

const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const JWT_SECRET = "my-super-secret-key";

// ===========================================
// Middleware: Authentication
// ===========================================

const authMiddleware = (req, res, next) => {
  console.log("Auth middleware checking token...");

  // Get token from Authorization header
  const authHeader = req.header("Authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Token verified:", decoded);

    // Attach user info to request
    req.user = decoded;

    // Continue to next middleware/route
    next();
  } catch (error) {
    console.log("Invalid token:", error.message);
    res.status(401).json({ error: "Invalid token" });
  }
};

// ===========================================
// Middleware: Role-based Authorization
// ===========================================

const adminOnly = (req, res, next) => {
  console.log("Checking admin privileges...");

  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  if (req.user.role !== "admin") {
    console.log("User is not admin");
    return res.status(403).json({ error: "Forbidden: Admin access required" });
  }

  console.log("User is admin");
  next();
};

// Flexible role checker
const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    console.log(`Checking for roles: ${allowedRoles.join(", ")}`);

    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      console.log(`User role '${req.user.role}' not allowed`);
      return res.status(403).json({
        error: `Forbidden: Requires one of: ${allowedRoles.join(", ")}`,
      });
    }

    console.log(`User has required role: ${req.user.role}`);
    next();
  };
};

// ===========================================
// Routes
// ===========================================

// Public route - no authentication
app.get("/public", (req, res) => {
  res.json({
    message: "This is a public endpoint",
    info: "Anyone can access this without authentication",
  });
});

// Login route - generates token
app.post("/login", (req, res) => {
  const { email, role } = req.body;

  // In real app, validate credentials against database
  console.log(`\nLogin attempt: ${email}`);

  const token = jwt.sign(
    { userId: "123", email, role: role || "user" },
    JWT_SECRET,
    { expiresIn: "24h" }
  );

  console.log("Login successful, token generated");

  res.json({
    message: "Login successful",
    token,
    user: { email, role: role || "user" },
  });
});

// Protected route - authentication required
app.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "This is a protected endpoint",
    user: req.user,
    info: "Only authenticated users can access this",
  });
});

// Admin-only route
app.get("/admin", authMiddleware, adminOnly, (req, res) => {
  res.json({
    message: "Welcome to admin panel",
    user: req.user,
    info: "Only admins can access this",
  });
});

// Multiple roles allowed
app.get(
  "/moderator",
  authMiddleware,
  requireRole("admin", "moderator"),
  (req, res) => {
    res.json({
      message: "Moderator panel",
      user: req.user,
      info: "Admins and moderators can access this",
    });
  }
);

// ===========================================
// Start Server
// ===========================================

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Authentication Middleware Demo");
  console.log("=".repeat(50));
  console.log(`\nServer running on http://localhost:${PORT}`);
  console.log("\nTest the endpoints:");
  console.log("\n1. Public endpoint (no auth):");
  console.log(`   curl http://localhost:${PORT}/public`);
  console.log("\n2. Login as regular user:");
  console.log(
    `   curl -X POST http://localhost:${PORT}/login -H "Content-Type: application/json" -d '{"email":"user@example.com","role":"user"}'`
  );
  console.log("\n3. Login as admin:");
  console.log(
    `   curl -X POST http://localhost:${PORT}/login -H "Content-Type: application/json" -d '{"email":"admin@example.com","role":"admin"}'`
  );
  console.log("\n4. Access protected endpoint:");
  console.log(
    `   curl http://localhost:${PORT}/protected -H "Authorization: Bearer YOUR_TOKEN"`
  );
  console.log("\n5. Access admin endpoint (requires admin role):");
  console.log(
    `   curl http://localhost:${PORT}/admin -H "Authorization: Bearer YOUR_TOKEN"`
  );
  console.log("\n" + "=".repeat(50) + "\n");
});
