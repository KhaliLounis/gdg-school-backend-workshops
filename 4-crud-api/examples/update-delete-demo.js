/**
 * Update & Delete Demo
 * Shows findByIdAndUpdate and findByIdAndDelete operations
 *
 * Run: npm run examples:update
 */

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

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
// CREATE (for testing)
// ===========================================

app.post("/api/tasks", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ===========================================
// READ ALL
// ===========================================

app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===========================================
// UPDATE - findByIdAndUpdate
// ===========================================

app.put("/api/tasks/:id", async (req, res) => {
  try {
    // findByIdAndUpdate(id, updateData, options)
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        done: req.body.done,
        priority: req.body.priority,
      },
      {
        new: true, // ⚠️ IMPORTANT: Return the UPDATED document
        runValidators: true, // Run schema validation on update
      }
    );

    // If no task found with that ID
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    console.log("✅ Updated task:", updatedTask.title);
    res.json(updatedTask);
  } catch (error) {
    console.error("❌ Update error:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// ===========================================
// PARTIAL UPDATE (PATCH) - Update only specific fields
// ===========================================

app.patch("/api/tasks/:id", async (req, res) => {
  try {
    // Only update the fields that were sent
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body, // Only update what's in the body
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ===========================================
// DELETE - findByIdAndDelete
// ===========================================

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    // findByIdAndDelete returns the deleted document
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    // If no task found with that ID
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    console.log("🗑️ Deleted task:", deletedTask.title);
    res.json({
      message: "Task deleted successfully",
      deletedTask: deletedTask,
    });
  } catch (error) {
    console.error("❌ Delete error:", error.message);
    res.status(500).json({ error: error.message });
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
      console.log("\n📝 Test these endpoints:");
      console.log(`   POST   http://localhost:${PORT}/api/tasks     (Create)`);
      console.log(`   GET    http://localhost:${PORT}/api/tasks     (Read All)`);
      console.log(`   PUT    http://localhost:${PORT}/api/tasks/:id (Update)`);
      console.log(`   PATCH  http://localhost:${PORT}/api/tasks/:id (Partial Update)`);
      console.log(`   DELETE http://localhost:${PORT}/api/tasks/:id (Delete)`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
