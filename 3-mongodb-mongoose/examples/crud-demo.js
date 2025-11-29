// CRUD Demo (Create & Read) - Run: npm run crud

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Schema & Model
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  done: { type: Boolean, default: false },
  priority: { type: Number, min: 1, max: 5, default: 3 },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Task API is running!" });
});

// CREATE - Add new task
app.post("/api/tasks", async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ - Get all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find(
      {}
      // { title: 1, description: 1, done: 1}
    );
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - Get single task by ID
app.get("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({
      title: task.title,
      description: task.description,
      done: task.done
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 404 Handler (after all routes)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error Handler (must have 4 params)
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: err.message });
});

// Connect & Start
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
