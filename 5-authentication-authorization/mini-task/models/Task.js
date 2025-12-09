// ===========================================
// Task Model
// TODO: Complete the implementation
// ===========================================

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    // TODO: Add validation
    // - required
    // - trim
  },
  description: {
    type: String,
    // TODO: Add trim
  },
  completed: {
    type: Boolean,
    // TODO: Add default value (false)
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    // TODO: Add reference to User model
    // - required
    // - ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", taskSchema);
