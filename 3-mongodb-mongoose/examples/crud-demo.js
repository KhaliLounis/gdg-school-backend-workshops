/**
 * CRUD Operations Demo (Create & Read)
 * This example shows how to perform Create and Read operations with Mongoose
 *
 * Also demonstrates:
 * - Execution Order (middleware flow)
 * - Not Found (404) handling
 * - Error Handler middleware
 *
 * Run: npm run crud
 * Dev: npm run dev (with nodemon)
 */

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// ===========================================
// EXECUTION ORDER - Middleware runs top to bottom!
// ===========================================
// Request → Middleware 1 → Middleware 2 → Route → Response
//
// 1. express.json() parses the body
// 2. Logger logs the request
// 3. Route handler processes the request
// 4. 404 handler catches unknown routes
// 5. Error handler catches any errors

// Logger middleware (runs for EVERY request)
app.use((req, res, next) => {
  console.log(`📥 ${new Date().toISOString()} | ${req.method} ${req.url}`);
  next(); // Pass to next middleware/route
});

// ===========================================
// SCHEMA & MODEL
// ===========================================

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  done: { type: Boolean, default: false },
  priority: { type: Number, min: 1, max: 5, default: 3 },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);

// ===========================================
// ROUTES
// ===========================================

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Task API is running! 🚀",
    endpoints: {
      getAllTasks: "GET /api/tasks",
      getOneTask: "GET /api/tasks/:id",
      createTask: "POST /api/tasks",
    },
  });
});

// ===========================================
// CREATE - Add a new task
// ===========================================
// Using Model.create()

app.post("/api/tasks", async (req, res) => {
  try {
    // Create a new task using the data from request body
    const newTask = await Task.create({
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
    });

    console.log("✅ Task created:", newTask.title);

    // Return the created task with 201 status
    res.status(201).json(newTask);
  } catch (error) {
    console.error("❌ Create error:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// ===========================================
// READ - Get all tasks
// ===========================================
// Using Model.find()

app.get("/api/tasks", async (req, res) => {
  try {
    // Find all tasks in the collection
    const tasks = await Task.find();

    console.log(`📋 Found ${tasks.length} tasks`);

    res.json(tasks);
  } catch (error) {
    console.error("❌ Read error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ===========================================
// READ - Get a single task by ID
// ===========================================
// Using Model.findById()

app.get("/api/tasks/:id", async (req, res) => {
  try {
    // Find task by its MongoDB _id
    const task = await Task.findById(req.params.id);

    // If task doesn't exist, return 404
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    console.log("🔍 Found task:", task.title);

    res.json(task);
  } catch (error) {
    console.error("❌ Read error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ===========================================
// BONUS: Get tasks with filter
// ===========================================

app.get("/api/tasks/filter/pending", async (req, res) => {
  try {
    // Find tasks where done is false
    const pendingTasks = await Task.find({ done: false });

    res.json(pendingTasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===========================================
// 404 NOT FOUND HANDLER
// ===========================================
// This catches any request that didn't match a route above
// MUST be placed AFTER all your routes!

app.use((req, res, next) => {
  console.log(`❓ 404 - Route not found: ${req.method} ${req.url}`);
  res.status(404).json({
    error: "Route not found",
    message: `Cannot ${req.method} ${req.url}`,
    hint: "Check the available endpoints at GET /",
  });
});

// ===========================================
// ERROR HANDLER MIDDLEWARE
// ===========================================
// Catches any errors thrown in route handlers
// MUST be placed LAST and have 4 parameters (err, req, res, next)

app.use((err, req, res, next) => {
  console.error("💥 Error:", err.message);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      error: "Validation failed",
      details: errors,
    });
  }

  // Mongoose CastError (invalid ObjectId)
  if (err.name === "CastError") {
    return res.status(400).json({
      error: "Invalid ID format",
    });
  }

  // Default server error
  res.status(500).json({
    error: "Something went wrong",
    message: err.message,
  });
});

// ===========================================
// CONNECT & START SERVER
// ===========================================

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB\n");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log("\n📝 Test these endpoints:");
      console.log(`   GET  http://localhost:${PORT}/api/tasks`);
      console.log(`   POST http://localhost:${PORT}/api/tasks`);
      console.log(`   GET  http://localhost:${PORT}/api/tasks/:id`);
      console.log("\n💡 Use nodemon (npm run dev) for auto-restart on changes");
      console.log("\n🔄 Execution Order:");
      console.log("   Request → Logger → Route → 404/Error Handler → Response");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
