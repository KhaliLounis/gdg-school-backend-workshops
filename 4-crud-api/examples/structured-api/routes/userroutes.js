/**
 * Task Routes
 * Thin routes - just define URLs and call controllers
 *
 * Pattern:
 * - Route defines the URL
 * - Controller handles the logic
 */

const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// All routes are prefixed with /api/tasks (set in server.js)

// GET /api/tasks - Get all tasks
router.get("/", taskController.getAllTasks);

// GET /api/tasks/:id - Get single task
router.get("/:id", taskController.getTask);

// POST /api/tasks - Create new task
router.post("/", taskController.createTask);

// PUT /api/tasks/:id - Update task
router.put("/:id", taskController.updateTask);

// DELETE /api/tasks/:id - Delete task
router.delete("/:id", taskController.deleteTask);

module.exports = router;
