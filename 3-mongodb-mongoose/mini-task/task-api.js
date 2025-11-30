// Mini Task: Task API with MongoDB - Run: npm run task

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// TODO 1: Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("Connected"))
//   .catch((err) => console.error(err.message));

// TODO 2: Create a Task Schema
// const taskSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: String,
//   done: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
// });

// TODO 3: Create the Model
// const Task = mongoose.model("Task", taskSchema);

app.get("/", (req, res) => {
  res.json({ message: "Task API" });
});

// TODO 4: Create POST /api/tasks
// app.post("/api/tasks", async (req, res) => {
//   try {
//     const task = await Task.create(req.body);
//     res.status(201).json(task);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// TODO 5: Create GET /api/tasks
// app.get("/api/tasks", async (req, res) => {
//   try {
//     const tasks = await Task.find();
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
