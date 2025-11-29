/**
 * Task Manager API - Complete Solution
 *
 * Features:
 * - Full CRUD operations
 * - Schema validation
 * - Error handling
 * - Clean folder structure
 * - Filter endpoints (bonus)
 *
 * Run: npm run solution
 * Dev: npm run solution:dev
 */

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Import routes and middleware
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ===========================================
// MIDDLEWARE
// ===========================================

app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} | ${req.method} ${req.url}`);
  next();
});

// ===========================================
// ROUTES
// ===========================================

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Task Manager API 🚀",
    version: "1.0.0",
    endpoints: {
      getAllTasks: "GET /api/tasks",
      getOneTask: "GET /api/tasks/:id",
      createTask: "POST /api/tasks",
      updateTask: "PUT /api/tasks/:id",
      deleteTask: "DELETE /api/tasks/:id",
      getPending: "GET /api/tasks/filter/pending",
      getCompleted: "GET /api/tasks/filter/completed",
    },
  });
});

// Mount task routes
app.use("/api/tasks", taskRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

// Error handler (must be last)
app.use(errorHandler);

// ===========================================
// DATABASE & SERVER
// ===========================================

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB\n");

    app.listen(PORT, () => {
      console.log(`🚀 Task Manager API running on http://localhost:${PORT}`);
      console.log("\n📁 Structure:");
      console.log("   models/Task.js");
      console.log("   controllers/taskController.js");
      console.log("   routes/taskRoutes.js");
      console.log("   middleware/errorHandler.js");
      console.log("   server.js");
      console.log("\n📝 Endpoints:");
      console.log(`   GET    /api/tasks           - Get all tasks`);
      console.log(`   GET    /api/tasks/:id       - Get one task`);
      console.log(`   POST   /api/tasks           - Create task`);
      console.log(`   PUT    /api/tasks/:id       - Update task`);
      console.log(`   DELETE /api/tasks/:id       - Delete task`);
      console.log(`   GET    /api/tasks/filter/pending   - Pending only`);
      console.log(`   GET    /api/tasks/filter/completed - Completed only`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
