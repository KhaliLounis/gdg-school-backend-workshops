const express = require("express");
const app = express();

// Logging middleware
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.url);
  next();
});

// API-only logging middleware
app.use("/api", (req, res, next) => {
  console.log("API call detected:", req.url);
  next();
});

// JSON parsing middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Home page");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]);
});

app.get("/api/profile", (req, res) => {
  res.json({
    name: "Sarah",
    role: "Developer",
    track: "Full-Stack",
  });
});

app.listen(3000, () => {
  console.log("Middleware demo running on http://localhost:3000");
});
