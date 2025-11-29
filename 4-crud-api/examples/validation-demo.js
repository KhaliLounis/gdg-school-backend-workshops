/**
 * Validation & Error Handling Demo
 * Shows schema validation and proper HTTP status codes
 *
 * Run: npm run examples:validation
 */

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// ===========================================
// SCHEMA WITH VALIDATION
// ===========================================

const taskSchema = new mongoose.Schema({
  // Required with custom error message
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [3, "Title must be at least 3 characters"],
    maxlength: [100, "Title cannot exceed 100 characters"],
    trim: true, // Remove whitespace
  },

  // Optional with max length
  description: {
    type: String,
    maxlength: [500, "Description cannot exceed 500 characters"],
    trim: true,
  },

  // Boolean with default
  done: {
    type: Boolean,
    default: false,
  },

  // Number with min/max
  priority: {
    type: Number,
    min: [1, "Priority must be at least 1"],
    max: [5, "Priority cannot exceed 5"],
    default: 3,
  },

  // Enum - only specific values allowed
  status: {
    type: String,
    enum: {
      values: ["pending", "in-progress", "completed"],
      message: "Status must be: pending, in-progress, or completed",
    },
    default: "pending",
  },

  // Auto timestamp
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", taskSchema);

// ===========================================
// ROUTES WITH PROPER ERROR HANDLING
// ===========================================

// CREATE - 201 on success, 400 on validation error
app.post("/api/tasks", async (req, res) => {
  try {
    const task = await Task.create(req.body);

    // 201 Created - Resource was successfully created
    res.status(201).json(task);
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e) => e.message);

      // 400 Bad Request - Client sent invalid data
      return res.status(400).json({
        error: "Validation failed",
        details: errors,
      });
    }

    // 500 Internal Server Error - Something went wrong on server
    res.status(500).json({ error: "Server error" });
  }
});

// READ ALL - 200 on success
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();

    // 200 OK - Request was successful
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// READ ONE - 200 on success, 404 if not found
app.get("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // 404 Not Found - Resource doesn't exist
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    // Handle invalid ObjectId format
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid task ID format" });
    }

    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE - 200 on success, 404 if not found, 400 on validation error
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // Important: Run validation on update!
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        error: "Validation failed",
        details: errors,
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid task ID format" });
    }

    res.status(500).json({ error: "Server error" });
  }
});

// DELETE - 200 on success, 404 if not found
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid task ID format" });
    }

    res.status(500).json({ error: "Server error" });
  }
});

// ===========================================
// CONNECT & START
// ===========================================

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB\n");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log("\n📝 Test validation with these requests:\n");

      console.log("❌ Try creating task without title:");
      console.log('   POST { } → 400 "Title is required"\n');

      console.log("❌ Try creating task with short title:");
      console.log('   POST { "title": "ab" } → 400 "Title must be at least 3 characters"\n');

      console.log("❌ Try invalid priority:");
      console.log('   POST { "title": "Test", "priority": 10 } → 400 "Priority cannot exceed 5"\n');

      console.log("❌ Try invalid status:");
      console.log('   POST { "title": "Test", "status": "invalid" } → 400 "Status must be..."\n');

      console.log("✅ Valid request:");
      console.log('   POST { "title": "Learn Validation", "priority": 5, "status": "pending" } → 201');
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
