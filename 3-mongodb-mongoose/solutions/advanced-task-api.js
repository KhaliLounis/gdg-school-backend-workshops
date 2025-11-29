/**
 * Advanced Task API Solution
 * Complete solution with all bonus features
 *
 * Features:
 * - Full CRUD (Create, Read)
 * - Error handling
 * - Validation
 * - Filtering
 * - Logging middleware
 */

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// ===========================================
// LOGGING MIDDLEWARE
// ===========================================

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} | ${req.method} ${req.url}`);
  next();
});

// ===========================================
// DATABASE CONNECTION
// ===========================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// ===========================================
// SCHEMA & MODEL
// ===========================================

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [3, "Title must be at least 3 characters"],
    maxlength: [100, "Title cannot exceed 100 characters"],
    trim: true,
  },
  description: {
    type: String,
    maxlength: [500, "Description cannot exceed 500 characters"],
    trim: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: Number,
    min: [1, "Priority must be at least 1"],
    max: [5, "Priority cannot exceed 5"],
    default: 3,
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", taskSchema);

// ===========================================
// ROUTES
// ===========================================

// Home - API Info
app.get("/", (req, res) => {
  res.json({
    message: "Advanced Task API 🚀",
    version: "1.0.0",
    endpoints: {
      createTask: "POST /api/tasks",
      getAllTasks: "GET /api/tasks",
      getOneTask: "GET /api/tasks/:id",
      getPendingTasks: "GET /api/tasks/filter/pending",
      getCompletedTasks: "GET /api/tasks/filter/completed",
    },
  });
});

// CREATE - Add new task
app.post("/api/tasks", async (req, res) => {
  try {
    const newTask = await Task.create({
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      tags: req.body.tags,
    });

    console.log("✅ Created:", newTask.title);
    res.status(201).json(newTask);
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ error: "Validation failed", details: errors });
    }
    res.status(500).json({ error: error.message });
  }
});

// READ - Get all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    // Support optional query params
    const filter = {};
    if (req.query.done !== undefined) {
      filter.done = req.query.done === "true";
    }
    if (req.query.priority) {
      filter.priority = parseInt(req.query.priority);
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.json({
      count: tasks.length,
      tasks: tasks,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - Get single task
app.get("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    // Handle invalid ObjectId format
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid task ID format" });
    }
    res.status(500).json({ error: error.message });
  }
});

// READ - Get pending tasks only
app.get("/api/tasks/filter/pending", async (req, res) => {
  try {
    const pendingTasks = await Task.find({ done: false }).sort({ priority: -1 });

    res.json({
      count: pendingTasks.length,
      tasks: pendingTasks,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - Get completed tasks only
app.get("/api/tasks/filter/completed", async (req, res) => {
  try {
    const completedTasks = await Task.find({ done: true });

    res.json({
      count: completedTasks.length,
      tasks: completedTasks,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===========================================
// 404 HANDLER
// ===========================================

app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    hint: "Visit / to see available endpoints",
  });
});

// ===========================================
// START SERVER
// ===========================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Advanced Task API running on http://localhost:${PORT}`);
  console.log("\n📝 Endpoints available:");
  console.log(`   POST http://localhost:${PORT}/api/tasks`);
  console.log(`   GET  http://localhost:${PORT}/api/tasks`);
  console.log(`   GET  http://localhost:${PORT}/api/tasks/:id`);
  console.log(`   GET  http://localhost:${PORT}/api/tasks/filter/pending`);
  console.log(`   GET  http://localhost:${PORT}/api/tasks/filter/completed`);
  console.log("\n💡 Query params: ?done=true&priority=5");
});
