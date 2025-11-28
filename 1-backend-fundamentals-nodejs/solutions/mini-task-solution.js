const http = require("http");

const server = http.createServer((req, res) => {
  // Log the incoming request
  console.log("Request received:", req.url);

  // Set response headers
  res.writeHead(200, { "Content-Type": "text/plain" });

  // Handle different routes
  if (req.url === "/") {
    // Task 1 solution: Personal information
    res.end("Hi! I'm Sarah and I'm in the Full-Stack Development track.");
  } else if (req.url === "/track") {
    // Task 2 solution: Just the track
    res.end("Full-Stack Development");
  } else {
    // Handle unknown routes
    res.end("Page not found. Try / or /track");
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
