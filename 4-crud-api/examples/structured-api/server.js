/**
 * Structured API Server
 * Shows the clean folder structure pattern
 *
 * Structure:
 * ├── models/Task.js          - Schema & Model
 * ├── controllers/taskController.js - Business logic
 * ├── routes/taskRoutes.js    - Route definitions
 * └── server.js               - Entry point (this file)
 *
 * Run: npm run examples:structure
 * Dev: npm run examples:structure:dev
 */

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Import routes
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middleware
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
    message: "Structured Task API 🚀",
    structure: {
      models: "models/Task.js",
      controllers: "controllers/taskController.js",
      routes: "routes/taskRoutes.js",
    },
    endpoints: {
      getAllTasks: "GET /api/tasks",
      getOneTask: "GET /api/tasks/:id",
      createTask: "POST /api/tasks",
      updateTask: "PUT /api/tasks/:id",
      deleteTask: "DELETE /api/tasks/:id",
    },
  });
});

// Mount task routes at /api/tasks
app.use("/api/tasks", taskRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ===========================================
// DATABASE & SERVER
// ===========================================

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB\n");

    app.listen(PORT, () => {
      console.log(`🚀 Structured API running on http://localhost:${PORT}`);
      console.log("\n📁 Folder Structure:");
      console.log("   models/Task.js              → Schema & Model");
      console.log("   controllers/taskController.js → Business Logic");
      console.log("   routes/taskRoutes.js        → Route Definitions");
      console.log("   server.js                   → Entry Point");
      console.log("\n📝 Endpoints:");
      console.log(`   GET    http://localhost:${PORT}/api/tasks`);
      console.log(`   GET    http://localhost:${PORT}/api/tasks/:id`);
      console.log(`   POST   http://localhost:${PORT}/api/tasks`);
      console.log(`   PUT    http://localhost:${PORT}/api/tasks/:id`);
      console.log(`   DELETE http://localhost:${PORT}/api/tasks/:id`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
