// ===========================================
// Task Controller
// TODO: Complete the implementation
// ===========================================

const Task = require("../models/Task");

// Get all tasks for current user
exports.getTasks = async (req, res) => {
  try {
    // TODO: Implement get tasks logic

    // 1. Get userId from req.user (set by authMiddleware)

    // 2. Find all tasks for this user
    //    - Use Task.find({ userId: req.user.userId })

    // 3. Return tasks

    res.status(500).json({ error: "Not implemented yet" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new task
exports.createTask = async (req, res) => {
  try {
    // TODO: Implement create task logic

    // 1. Extract title and description from req.body

    // 2. Validate input
    //    - Check if title exists

    // 3. Create new task
    //    - Use new Task({ title, description, userId: req.user.userId })
    //    - Save to database

    // 4. Return created task
    //    - Status 201

    res.status(500).json({ error: "Not implemented yet" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    // TODO: Implement update task logic

    // 1. Get task ID from req.params.id

    // 2. Find task
    //    - Use Task.findById()
    //    - Return 404 if not found

    // 3. Check ownership
    //    - Compare task.userId with req.user.userId
    //    - Return 403 if not owner (unless admin)

    // 4. Update task
    //    - Update fields from req.body
    //    - Save changes

    // 5. Return updated task

    res.status(500).json({ error: "Not implemented yet" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    // TODO: Implement delete task logic

    // 1. Get task ID from req.params.id

    // 2. Find task
    //    - Use Task.findById()
    //    - Return 404 if not found

    // 3. Check ownership or admin role
    //    - Compare task.userId with req.user.userId
    //    - OR check if req.user.role === 'admin'
    //    - Return 403 if not authorized

    // 4. Delete task
    //    - Use Task.findByIdAndDelete()

    // 5. Return success message

    res.status(500).json({ error: "Not implemented yet" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    // TODO: Implement get all users logic

    // 1. Find all users
    //    - Use User.find()
    //    - Exclude passwords with .select('-password')

    // 2. Return users with count

    const User = require("../models/User");
    res.status(500).json({ error: "Not implemented yet" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
