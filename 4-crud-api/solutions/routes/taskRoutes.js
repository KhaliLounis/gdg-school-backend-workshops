/**
 * Task Routes - Solution
 * Thin routes that call controller functions
 */

const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Main CRUD routes
router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getTask);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

// Bonus: Filter routes
router.get("/filter/pending", taskController.getPendingTasks);
router.get("/filter/completed", taskController.getCompletedTasks);

module.exports = router;
