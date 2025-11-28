const http = require("http");

const server = http.createServer((req, res) => {
  // Log what was requested
  console.log("Request received:", req.url);

  // Set response headers
  res.writeHead(200, { "Content-Type": "text/plain" });

  // TODO: Complete the tasks below

  // Task 1: Change this to return YOUR name and track
  if (req.url === "/") {
    res.end("Hello! Replace this with your name and track.");
  }
  // Task 2: Add a new route for /track here
  else {
    res.end("Page not found. Try / or /track");
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
