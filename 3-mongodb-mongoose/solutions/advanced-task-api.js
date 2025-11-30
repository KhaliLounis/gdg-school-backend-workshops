// Advanced Task API Solution - Run: npm run advanced

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3, maxlength: 100, trim: true },
  description: { type: String, maxlength: 500, trim: true },
  done: { type: Boolean, default: false },
  priority: { type: Number, min: 1, max: 5, default: 3 },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);

app.get("/", (req, res) => {
  res.json({ message: "Advanced Task API" });
});

app.post("/api/tasks", async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ error: "Validation failed", details: errors });
    }
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/tasks", async (req, res) => {
  try {
    const filter = {};
    if (req.query.done !== undefined) filter.done = req.query.done === "true";
    if (req.query.priority) filter.priority = parseInt(req.query.priority);
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json({ count: tasks.length, tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (error) {
    if (error.name === "CastError") return res.status(400).json({ error: "Invalid ID" });
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/tasks/filter/pending", async (req, res) => {
  try {
    const tasks = await Task.find({ done: false }).sort({ priority: -1 });
    res.json({ count: tasks.length, tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/tasks/filter/completed", async (req, res) => {
  try {
    const tasks = await Task.find({ done: true });
    res.json({ count: tasks.length, tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
