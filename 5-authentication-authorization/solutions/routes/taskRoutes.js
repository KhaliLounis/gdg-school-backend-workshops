// ===========================================
// Task Routes - Complete Solution
// ===========================================

const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

// All task routes require authentication
router.use(authMiddleware);

// Task CRUD operations
router.get("/", taskController.getTasks);
router.post("/", taskController.createTask);
router.patch("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
