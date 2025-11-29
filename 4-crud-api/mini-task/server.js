/**
 * TODO 4: Server Setup
 *
 * Steps:
 * 1. Connect to MongoDB
 * 2. Use express.json() middleware
 * 3. Mount routes at /api/tasks
 * 4. Start server on port 3000
 */

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const taskRoutes = require("./routes/taskRoutes");

const app = express();

// TODO: Add middleware
// app.use(express.json());

// TODO: Add a home route
// app.get("/", (req, res) => {
//   res.json({ message: "Task Manager API" });
// });

// TODO: Mount task routes at /api/tasks
// app.use("/api/tasks", taskRoutes);

// TODO: Connect to MongoDB and start server
const PORT = process.env.PORT || 3000;

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ Connected to MongoDB");
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch(err => {
//     console.error("❌ Connection failed:", err.message);
//   });

// Temporary: Just start server (remove this when you add MongoDB)
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log("\n⚠️  Complete the TODOs to make this API work!");
  console.log("   Check mini-task/README.md for instructions.");
});
