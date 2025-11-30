// Express Middleware Demo - Run: npm run middleware

const express = require("express");
const app = express();

app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Add custom data
app.use((req, res, next) => {
  req.requestId = Math.random().toString(36).substring(2, 8);
  next();
});

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome!", requestId: req.requestId });
});

app.post("/echo", (req, res) => {
  res.json({ received: req.body, requestId: req.requestId });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(3000, () => console.log("Server on http://localhost:3000"));
