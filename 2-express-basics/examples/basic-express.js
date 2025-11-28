const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Server is up ✅");
});

app.get("/api/health", (req, res) => {
  res.send("OK");
});

app.get("/api/hello", (req, res) => {
  res.send("Hello from GDG backend 😎");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
