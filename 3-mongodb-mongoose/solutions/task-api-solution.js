/**
 * Task API Solution
 * Basic solution with Create & Read operations
 *
 * Run: npm run solution
 * Dev: npm run solution:dev
 */

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// ===========================================
// SOLUTION 1: Connect to MongoDB
// ===========================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// ===========================================
// SOLUTION 2: Create a Task Schema
// ===========================================

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  done: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ===========================================
// SOLUTION 3: Create the Model
// ===========================================

const Task = mongoose.model("Task", taskSchema);

// ===========================================
// Home Route
// ===========================================

app.get("/", (req, res) => {
  res.json({
    message: "Task API 🚀",
    endpoints: {
      createTask: "POST /api/tasks",
      getAllTasks: "GET /api/tasks",
      getOneTask: "GET /api/tasks/:id",
    },
  });
});

// ===========================================
// SOLUTION 4: Create POST /api/tasks
// ===========================================

app.post("/api/tasks", async (req, res) => {
  try {
    const newTask = await Task.create({
      title: req.body.title,
      description: req.body.description,
    });

    console.log("✅ Created task:", newTask.title);
    res.status(201).json(newTask);
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// ===========================================
// SOLUTION 5: Create GET /api/tasks
// ===========================================

app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();

    console.log(`📋 Found ${tasks.length} tasks`);
    res.json(tasks);
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ===========================================
// BONUS: Get a single task by ID
// ===========================================

app.get("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===========================================
// Start Server
// ===========================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log("\n📝 Endpoints:");
  console.log(`   POST http://localhost:${PORT}/api/tasks`);
  console.log(`   GET  http://localhost:${PORT}/api/tasks`);
  console.log(`   GET  http://localhost:${PORT}/api/tasks/:id`);
});
