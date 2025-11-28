// Basic HTTP Server Demo
// This demonstrates the concepts covered in the workshop

const http = require("http");

// Create a simple server
const server = http.createServer((req, res) => {
  // Log the incoming request
  console.log("Request received:", req.url);

  // Set response headers
  res.writeHead(200, { "Content-Type": "text/plain" });

  // Basic routing example
  if (req.url === "/") {
    res.end("Hello! This is your first backend server.");
  } else if (req.url === "/about") {
    res.end("This server was built with Node.js HTTP module.");
  } else {
    res.end("Page not found. Try / or /about");
  }
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
