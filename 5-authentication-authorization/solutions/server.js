// ===========================================
// Complete Authentication Solution - Server
// ===========================================

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Configuration
const PORT = process.env.PORT || 3000;
// Support both MONGO_URI and MONGODB_URI for flexibility
const MONGODB_URI =
  process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb://localhost:27017/auth-solution";

// Import routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { adminOnly } = require("./middleware/roleMiddleware");
const authMiddleware = require("./middleware/authMiddleware");
const taskController = require("./controllers/taskController");

// ===========================================
// Routes
// ===========================================

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Authentication API - Complete Solution",
    version: "1.0.0",
    endpoints: {
      auth: [
        "POST /auth/register - Register new user",
        "POST /auth/login - Login user",
        "GET /auth/me - Get current user (protected)",
      ],
      tasks: [
        "GET /tasks - Get user tasks (protected)",
        "POST /tasks - Create task (protected)",
        "PATCH /tasks/:id - Update task (protected)",
        "DELETE /tasks/:id - Delete task (protected)",
      ],
      admin: ["GET /admin/users - Get all users (admin only)"],
    },
  });
});

// Use routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Admin routes
app.get("/admin/users", authMiddleware, adminOnly, taskController.getAllUsers);

// ===========================================
// Error Handling Middleware
// ===========================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
});

// ===========================================
// Database Connection & Server Start
// ===========================================

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("🔐 Authentication Solution");
    console.log("=".repeat(60));
    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log("\n📝 Quick Start:");
      console.log("   1. Register: POST /auth/register");
      console.log("   2. Login: POST /auth/login");
      console.log("   3. Use token to access protected routes");
      console.log("\n" + "=".repeat(60) + "\n");
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down gracefully...");
  await mongoose.connection.close();
  console.log("✅ MongoDB connection closed");
  process.exit(0);
});
