/**
 * Task Controller - Solution
 * Complete CRUD operations with proper error handling
 */

const Task = require("../models/Task");

// ===========================================
// GET ALL TASKS
// ===========================================
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// ===========================================
// GET SINGLE TASK
// ===========================================
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task: task,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid task ID format",
      });
    }
    res.status(500).json({
      success: false,
      error: "Server error",
    });
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

    res.status(201).json({
      success: true,
      task: task,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: errors,
      });
    }
    res.status(500).json({
      success: false,
      error: "Server error",
    });
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
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task: task,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: errors,
      });
    }
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid task ID format",
      });
    }
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// ===========================================
// DELETE TASK
// ===========================================
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid task ID format",
      });
    }
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// ===========================================
// BONUS: GET PENDING TASKS
// ===========================================
exports.getPendingTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ done: false }).sort({ priority: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// ===========================================
// BONUS: GET COMPLETED TASKS
// ===========================================
exports.getCompletedTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ done: true });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
