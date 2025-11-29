/**
 * TODO 3: Task Routes
 *
 * Define routes that call controller functions:
 * - GET /        → getAllTasks
 * - GET /:id     → getTask
 * - POST /       → createTask
 * - PUT /:id     → updateTask
 * - DELETE /:id  → deleteTask
 */

const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// TODO: Define your routes here
// router.get("/", taskController.getAllTasks);
// ...

module.exports = router;
