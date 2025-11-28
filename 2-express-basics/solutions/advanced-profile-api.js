const express = require("express");
const app = express();

// General logging middleware
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.url);
  next();
});

// API-specific logging middleware
app.use("/api", (req, res, next) => {
  console.log("API endpoint accessed");
  next();
});

// Profile endpoints
app.get("/api/profile", (req, res) => {
  res.status(200).json({
    name: "Sarah Martinez",
    track: "Full-Stack Development",
    location: "Algiers",
  });
});

app.get("/api/profile/role", (req, res) => {
  res.status(200).json({
    role: "Student",
    level: "Intermediate",
  });
});

app.get("/api/profile/skills", (req, res) => {
  res.status(200).json({
    skills: ["JavaScript", "Node.js", "React", "MongoDB"],
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    availableEndpoints: [
      "GET /api/profile",
      "GET /api/profile/role",
      "GET /api/profile/skills",
    ],
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Enhanced Profile API running on http://localhost:${port}`);
});
