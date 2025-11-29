/**
 * Task Model - Solution
 */

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [3, "Title must be at least 3 characters"],
    maxlength: [100, "Title cannot exceed 100 characters"],
    trim: true,
  },
  description: {
    type: String,
    maxlength: [500, "Description cannot exceed 500 characters"],
    trim: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: Number,
    min: [1, "Priority must be at least 1"],
    max: [5, "Priority cannot exceed 5"],
    default: 3,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", taskSchema);
