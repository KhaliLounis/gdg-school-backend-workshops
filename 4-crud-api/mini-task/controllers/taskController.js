/**
 * TODO 2: Task Controller
 *
 * Implement CRUD operations:
 * - getAllTasks
 * - getTask
 * - createTask
 * - updateTask
 * - deleteTask
 *
 * Remember:
 * - Use async/await
 * - Use try/catch for error handling
 * - Return proper status codes
 */

const Task = require("../models/Task");

// GET all tasks
exports.getAllTasks = async (req, res) => {
  // TODO: Implement
  // - Use Task.find()
  // - Return tasks with status 200
};

// GET single task
exports.getTask = async (req, res) => {
  // TODO: Implement
  // - Use Task.findById(req.params.id)
  // - Return 404 if not found
  // - Return task with status 200
};

// CREATE task
exports.createTask = async (req, res) => {
  // TODO: Implement
  // - Use Task.create(req.body)
  // - Return created task with status 201
  // - Handle validation errors with status 400
};

// UPDATE task
exports.updateTask = async (req, res) => {
  // TODO: Implement
  // - Use Task.findByIdAndUpdate(id, data, { new: true, runValidators: true })
  // - Return 404 if not found
  // - Return updated task with status 200
};

// DELETE task
exports.deleteTask = async (req, res) => {
  // TODO: Implement
  // - Use Task.findByIdAndDelete(req.params.id)
  // - Return 404 if not found
  // - Return success message with status 200
};
