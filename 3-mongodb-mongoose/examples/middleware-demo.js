/**
 * Middleware Demo
 * Detailed explanation of how middleware works in Express
 *
 * Run: npm run middleware
 *
 * WHAT IS MIDDLEWARE?
 * - A function that runs BETWEEN request and response
 * - Has access to: req, res, next
 * - Must call next() to pass control to the next middleware
 */

const express = require("express");
const app = express();

// ===========================================
// MIDDLEWARE ANATOMY
// ===========================================
//
// A middleware function has 3 parameters:
//
//   function(req, res, next) {
//     // req  = request object (data from client)
//     // res  = response object (send data back)
//     // next = function to call next middleware
//   }
//
// If you don't call next(), the request STOPS here!

// ===========================================
// MIDDLEWARE 1: express.json()
// ===========================================
// Built-in middleware that parses JSON body
// Converts: '{"name":"Ahmed"}' → { name: "Ahmed" }

app.use(express.json());

// ===========================================
// MIDDLEWARE 2: Request Logger
// ===========================================
// Runs for EVERY request
// Logs method, URL, and timestamp

app.use((req, res, next) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`\n📥 [${timestamp}] ${req.method} ${req.url}`);

  // IMPORTANT: Call next() to continue to next middleware/route
  next();
});

// ===========================================
// MIDDLEWARE 3: Request Timer
// ===========================================
// Measures how long the request takes

app.use((req, res, next) => {
  // Save start time on request object
  req.startTime = Date.now();

  // When response finishes, calculate duration
  res.on("finish", () => {
    const duration = Date.now() - req.startTime;
    console.log(`⏱️  Response sent in ${duration}ms`);
  });

  next();
});

// ===========================================
// MIDDLEWARE 4: Add Custom Property
// ===========================================
// You can add properties to req for later use

app.use((req, res, next) => {
  // Add custom data to request
  req.customData = {
    requestId: Math.random().toString(36).substr(2, 9),
    serverTime: new Date().toISOString(),
  };

  console.log(`🔑 Request ID: ${req.customData.requestId}`);

  next();
});

// ===========================================
// ROUTE-SPECIFIC MIDDLEWARE
// ===========================================
// Only runs for specific routes

// This middleware ONLY runs for /api/* routes
app.use("/api", (req, res, next) => {
  console.log("🔒 API middleware: Checking API access...");
  next();
});

// ===========================================
// INLINE MIDDLEWARE
// ===========================================
// Middleware can be added directly to a route

const checkAuth = (req, res, next) => {
  console.log("👤 Auth middleware: Checking authentication...");

  // Example: Check for API key in headers
  const apiKey = req.headers["x-api-key"];

  if (apiKey === "secret123") {
    console.log("✅ Auth: Valid API key");
    next();
  } else {
    console.log("❌ Auth: No valid API key (but continuing for demo)");
    next(); // In real app, you might: res.status(401).json({ error: "Unauthorized" })
  }
};

// ===========================================
// ROUTES
// ===========================================

// Home route - shows middleware info
app.get("/", (req, res) => {
  console.log("🎯 Route: GET / matched");

  res.json({
    message: "Middleware Demo 🚀",
    requestId: req.customData.requestId,
    serverTime: req.customData.serverTime,
    middlewareOrder: [
      "1. express.json() - parses JSON body",
      "2. Logger - logs every request",
      "3. Timer - measures response time",
      "4. Custom Data - adds requestId",
      "5. Route Handler - sends response",
    ],
  });
});

// API route - has extra API middleware
app.get("/api/data", (req, res) => {
  console.log("🎯 Route: GET /api/data matched");

  res.json({
    message: "API Data",
    requestId: req.customData.requestId,
    note: "This route went through API middleware too!",
  });
});

// Protected route - uses inline auth middleware
app.get("/api/protected", checkAuth, (req, res) => {
  console.log("🎯 Route: GET /api/protected matched");

  res.json({
    message: "Protected Data",
    requestId: req.customData.requestId,
    tip: "Add header 'x-api-key: secret123' to authenticate",
  });
});

// POST route - shows body parsing
app.post("/api/echo", (req, res) => {
  console.log("🎯 Route: POST /api/echo matched");
  console.log("📦 Body received:", req.body);

  res.json({
    message: "Echo!",
    youSent: req.body,
    requestId: req.customData.requestId,
  });
});

// ===========================================
// 404 NOT FOUND MIDDLEWARE
// ===========================================
// Catches any request that didn't match a route
// MUST be AFTER all routes!

app.use((req, res, next) => {
  console.log(`❓ 404: No route matched ${req.method} ${req.url}`);

  res.status(404).json({
    error: "Not Found",
    message: `Cannot ${req.method} ${req.url}`,
    requestId: req.customData.requestId,
  });
});

// ===========================================
// ERROR HANDLER MIDDLEWARE
// ===========================================
// Catches any errors thrown in routes
// MUST have 4 parameters: (err, req, res, next)
// MUST be LAST!

app.use((err, req, res, next) => {
  console.log(`💥 Error: ${err.message}`);

  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
    requestId: req.customData?.requestId,
  });
});

// ===========================================
// START SERVER
// ===========================================

const PORT = 3000;

app.listen(PORT, () => {
  console.log("=".repeat(60));
  console.log("          🔧 MIDDLEWARE DEMO SERVER");
  console.log("=".repeat(60));
  console.log(`\n🚀 Server running on http://localhost:${PORT}\n`);

  console.log("📝 Middleware Execution Order:");
  console.log("   1. express.json()  → Parse JSON body");
  console.log("   2. Logger          → Log request");
  console.log("   3. Timer           → Measure time");
  console.log("   4. Custom Data     → Add requestId");
  console.log("   5. [Route-specific middleware if any]");
  console.log("   6. Route Handler   → Process request");
  console.log("   7. 404 Handler     → If no route matched");
  console.log("   8. Error Handler   → If error occurred\n");

  console.log("🧪 Test these endpoints:\n");
  console.log(`   GET  http://localhost:${PORT}/`);
  console.log(`   GET  http://localhost:${PORT}/api/data`);
  console.log(`   GET  http://localhost:${PORT}/api/protected`);
  console.log(`   POST http://localhost:${PORT}/api/echo`);
  console.log(`   GET  http://localhost:${PORT}/unknown (404)\n`);

  console.log("=".repeat(60));
  console.log("Watch the console to see middleware execution!");
  console.log("=".repeat(60) + "\n");
});
