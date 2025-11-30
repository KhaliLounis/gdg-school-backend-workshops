// Validation & Error Handling Demo - Run: npm run examples:validation

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [3, "Title must be at least 3 characters"],
    maxlength: [100, "Title cannot exceed 100 characters"],
    trim: true,
  },
  description: { type: String, maxlength: 500, trim: true },
  done: { type: Boolean, default: false },
  priority: { type: Number, min: 1, max: 5, default: 3 },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model("TasksTest", taskSchema);

// CREATE - 201 success, 400 validation error
app.post("/api/tasks", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ error: "Validation failed", details: errors });
    }
    res.status(500).json({ error: "Server error" });
  }
});

// READ ALL
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// READ ONE - 404 if not found
app.get("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (error) {
    if (error.name === "CastError") return res.status(400).json({ error: "Invalid ID" });
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE - runValidators important!
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ error: "Validation failed", details: errors });
    }
    if (error.name === "CastError") return res.status(400).json({ error: "Invalid ID" });
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (error) {
    if (error.name === "CastError") return res.status(400).json({ error: "Invalid ID" });
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("MongoDB failed:", err.message));
