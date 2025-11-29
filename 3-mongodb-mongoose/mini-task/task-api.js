/**
 * Mini Task: Task API with MongoDB
 *
 * Complete the TODOs to build a working Task API!
 *
 * Run: npm run task
 * Dev: npm run task:dev (with nodemon)
 */

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// ===========================================
// TODO 1: Connect to MongoDB
// ===========================================
// Use mongoose.connect() with process.env.MONGO_URI
// Add .then() and .catch() for success/error handling

// Your code here...

// ===========================================
// TODO 2: Create a Task Schema
// ===========================================
// Define a schema with:
// - title (String, required)
// - description (String, optional)
// - done (Boolean, default: false)
// - createdAt (Date, default: Date.now)

// const taskSchema = new mongoose.Schema({
//   // Your fields here...
// });

// ===========================================
// TODO 3: Create the Model
// ===========================================
// Create a Task model from your schema

// const Task = mongoose.model("Task", taskSchema);

// ===========================================
// Home Route (already done for you!)
// ===========================================

app.get("/", (req, res) => {
  res.json({
    message: "Task API 🚀",
    endpoints: {
      createTask: "POST /api/tasks",
      getAllTasks: "GET /api/tasks",
    },
  });
});

// ===========================================
// TODO 4: Create POST /api/tasks
// ===========================================
// - Use async/await
// - Create a new task using Task.create()
// - Send back the created task with status 201
// - Handle errors with try/catch

// app.post("/api/tasks", async (req, res) => {
//   // Your code here...
// });

// ===========================================
// TODO 5: Create GET /api/tasks
// ===========================================
// - Use async/await
// - Find all tasks using Task.find()
// - Send back the array of tasks
// - Handle errors with try/catch

// app.get("/api/tasks", async (req, res) => {
//   // Your code here...
// });

// ===========================================
// Start the server
// ===========================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log("\n📝 Complete the TODOs to make this API work!");
});
