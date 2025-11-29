// ==============================
// SIMPLE EXPRESS MIDDLEWARE DEMO
// ==============================

const express = require("express");
const app = express();

// Built-in middleware → parses JSON body
app.use(express.json());

// ------------------------------
// 1) Simple Logger Middleware
// ------------------------------
// Runs for EVERY request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // continue
});

// ------------------------------
// 2) Add Custom Data Middleware
// ------------------------------
app.use((req, res, next) => {
  const requestId = Math.random().toString(36).substring(2, 8);
  console.log("request id", requestId)
  req.requestId = requestId;
  next();
});


// ------------------------------
// ROUTES
// ------------------------------

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome!",
    requestId: req.requestId,
  });
});

// Route with JSON body
app.post("/echo", (req, res) => {
  res.json({
    received: req.body,
    requestId: req.requestId,
  });
});

// ------------------------------
// 404 Not Found Middleware
// ------------------------------
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

// ------------------------------
// ERROR HANDLER (last)
// ------------------------------
app.use((err, req, res, next) => {
  res.status(500).json({
    error: "Server error",
    message: err.message,
  });
});

// ------------------------------
// Start Server
// ------------------------------
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
