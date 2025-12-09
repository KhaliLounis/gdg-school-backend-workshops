// ===========================================
// Task Routes
// TODO: Complete the implementation
// ===========================================

const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");

// TODO: Define your routes
// All routes should require authentication

// Get tasks - GET /tasks
// router.get('/', authMiddleware, taskController.getTasks);

// Create task - POST /tasks
// router.post('/', authMiddleware, taskController.createTask);

// Update task - PATCH /tasks/:id
// router.patch('/:id', authMiddleware, taskController.updateTask);

// Delete task - DELETE /tasks/:id
// router.delete('/:id', authMiddleware, taskController.deleteTask);

// Admin: Get all users - GET /admin/users
// router.get('/admin/users', authMiddleware, adminOnly, taskController.getAllUsers);

module.exports = router;
