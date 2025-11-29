/**
 * Task Controller
 * Contains all the business logic for task operations
 *
 * Benefits:
 * - Routes stay thin
 * - Logic is reusable
 * - Easier to test
 * - Better organized
 */

const Task = require("../models/Task");

// ===========================================
// GET ALL TASKS
// ===========================================
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: tasks.length,
      tasks: tasks,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===========================================
// GET SINGLE TASK
// ===========================================
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid task ID format" });
    }
    res.status(500).json({ error: error.message });
  }
};

// ===========================================
// CREATE TASK
// ===========================================
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
    });

    res.status(201).json(task);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ error: "Validation failed", details: errors });
    }
    res.status(500).json({ error: error.message });
  }
};

// ===========================================
// UPDATE TASK
// ===========================================
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ error: "Validation failed", details: errors });
    }
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid task ID format" });
    }
    res.status(500).json({ error: error.message });
  }
};

// ===========================================
// DELETE TASK
// ===========================================
exports.deleteTask = async (req, res) => {
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
    res.status(500).json({ error: error.message });
  }
};
