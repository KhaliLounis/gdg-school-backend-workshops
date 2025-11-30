// Mini Task: Server Setup - Run: npm run task

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const taskRoutes = require("./routes/taskRoutes");
const app = express();

// TODO: Add middleware
// app.use(express.json());

// TODO: Add home route
// app.get("/", (req, res) => res.json({ message: "Task Manager API" }));

// TODO: Mount routes
// app.use("/api/tasks", taskRoutes);

// TODO: Connect to MongoDB and start server
const PORT = process.env.PORT || 3000;

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("Connected to MongoDB");
//     app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
//   })
//   .catch(err => console.error("Connection failed:", err.message));

// Temporary: start without DB
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
