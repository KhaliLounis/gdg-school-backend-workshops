const express = require("express");
const app = express();

app.use(express.json());

let tasks = [
  { id: 1, title: "Learn Node", done: false },
  { id: 2, title: "Build API", done: true },
  { id: 3, title: "Deploy app", done: false },
];

// READ - Get all tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// READ - Get single task
app.get("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json(task);
});

// CREATE - Add new task
app.post("/api/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    done: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// UPDATE - Update task
app.put("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.title = req.body.title || task.title;
  task.done = req.body.done !== undefined ? req.body.done : task.done;

  res.json(task);
});

// DELETE - Remove task
app.delete("/api/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(index, 1);
  res.json({ message: "Task deleted" });
});

app.listen(3000, () => {
  console.log("REST API running on http://localhost:3000");
});
