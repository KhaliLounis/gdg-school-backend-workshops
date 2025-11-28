const express = require("express");
const app = express();

// Logging middleware
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Profile endpoint
app.get("/api/profile", (req, res) => {
  res.json({
    name: "Sarah Martinez",
    track: "Full-Stack Development",
  });
});

// Role endpoint
app.get("/api/profile/role", (req, res) => {
  res.json({
    role: "Student",
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Profile API running on http://localhost:${port}`);
});
