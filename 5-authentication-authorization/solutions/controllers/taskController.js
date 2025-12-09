// ===========================================
// Task Controller - Complete Solution
// ===========================================

const Task = require("../models/Task");
const User = require("../models/User");

/**
 * Get all tasks for current user
 * GET /tasks
 */
exports.getTasks = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find all tasks for this user
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });

    res.json({
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error("Get tasks error:", error);
    res.status(500).json({
      error: "Failed to retrieve tasks",
    });
  }
};

/**
 * Create new task
 * POST /tasks
 */
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.userId;

    // Validate input
    if (!title) {
      return res.status(400).json({
        error: "Task title is required",
      });
    }

    // Create new task
    const task = new Task({
      title,
      description,
      userId,
    });

    await task.save();

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({
      error: "Failed to create task",
    });
  }
};

/**
 * Update task
 * PATCH /tasks/:id
 */
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.userId;
    const updates = req.body;

    // Find task
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    // Check ownership (only owner can update)
    if (task.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        error: "You do not have permission to update this task",
      });
    }

    // Update allowed fields
    const allowedUpdates = ["title", "description", "completed"];
    Object.keys(updates).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        task[key] = updates[key];
      }
    });

    await task.save();

    res.json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({
      error: "Failed to update task",
    });
  }
};

/**
 * Delete task
 * DELETE /tasks/:id
 */
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.userId;
    const userRole = req.user.role;

    // Find task
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    // Check ownership or admin role
    const isOwner = task.userId.toString() === userId.toString();
    const isAdmin = userRole === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        error: "You do not have permission to delete this task",
      });
    }

    // Delete task
    await Task.findByIdAndDelete(taskId);

    res.json({
      message: "Task deleted successfully",
      deletedTask: {
        id: task._id,
        title: task.title,
      },
    });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({
      error: "Failed to delete task",
    });
  }
};

/**
 * Get all users (Admin only)
 * GET /admin/users
 */
exports.getAllUsers = async (req, res) => {
  try {
    // Find all users (exclude passwords)
    const users = await User.find().select("-password");

    // Get task count for each user
    const usersWithTaskCount = await Promise.all(
      users.map(async (user) => {
        const taskCount = await Task.countDocuments({ userId: user._id });
        return {
          id: user._id,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          taskCount,
        };
      })
    );

    res.json({
      count: users.length,
      users: usersWithTaskCount,
    });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({
      error: "Failed to retrieve users",
    });
  }
};
