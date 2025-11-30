// Mini Task: Task Controller

const Task = require("../models/Task");

// GET all tasks
exports.getAllTasks = async (req, res) => {
  // TODO: Task.find() -> return tasks
};

// GET single task
exports.getTask = async (req, res) => {
  // TODO: Task.findById(req.params.id) -> 404 if not found
};

// CREATE task
exports.createTask = async (req, res) => {
  // TODO: Task.create(req.body) -> status 201
};

// UPDATE task
exports.updateTask = async (req, res) => {
  // TODO: Task.findByIdAndUpdate(id, data, { new: true, runValidators: true })
};

// DELETE task
exports.deleteTask = async (req, res) => {
  // TODO: Task.findByIdAndDelete(req.params.id)
};
