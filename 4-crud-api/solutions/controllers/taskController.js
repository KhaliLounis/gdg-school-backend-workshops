// Task Controller - Solution

const Task = require("../models/Task");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json({ count: tasks.length, tasks });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (error) {
    if (error.name === "CastError") return res.status(400).json({ error: "Invalid ID" });
    res.status(500).json({ error: "Server error" });
  }
};

exports.createTask = async (req, res) => {
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
};

exports.updateTask = async (req, res) => {
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
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (error) {
    if (error.name === "CastError") return res.status(400).json({ error: "Invalid ID" });
    res.status(500).json({ error: "Server error" });
  }
};

exports.getPendingTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ done: false }).sort({ priority: -1 });
    res.json({ count: tasks.length, tasks });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getCompletedTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ done: true });
    res.json({ count: tasks.length, tasks });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
