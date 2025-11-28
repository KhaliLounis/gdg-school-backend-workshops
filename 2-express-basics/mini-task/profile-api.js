const express = require("express");
const app = express();

// TODO: Add logging middleware here

// TODO: Create GET /api/profile endpoint
// Should return JSON with your name and track

// TODO: Create GET /api/profile/role endpoint
// Should return JSON with your role

const port = 3000;
app.listen(port, () => {
  console.log(`Profile API running on http://localhost:${port}`);
});
