# Backend Concepts Cheat Sheet

## Key Terms

**Backend**: The part of the app nobody sees but everyone depends on.

**Frontend Logic**: What the user sees and does (UI interactions, display)

**Backend Logic**: What the system knows and allows (data, rules, security)

## Environment Differences

| Browser       | Server            |
| ------------- | ----------------- |
| DOM access    | Filesystem access |
| Window object | Network access    |
| User events   | Database access   |

## Node.js Essentials

**What is Node.js?** JavaScript running on the server with extra powers (files, network, databases)

**Runtime Environment**: The place where your JS code runs + tools to talk to the OS

## HTTP Basics

1. Browser sends **request** to server
2. Server processes the request (data lookup, validation, etc.)
3. Server sends **response** back to browser

**API**: When the rules of that conversation are clear

## Modules

```javascript
// Using built-in modules
const http = require("http");
const fs = require("fs");

// Exporting from your file
module.exports = { functionName };

// Importing your modules
const { functionName } = require("./filename");
```

## Common Built-in Modules

- `http` - Create servers
- `fs` - Work with files
- `path` - Handle file paths
- `url` - Parse URLs

## Basic Server Template

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });

  if (req.url === "/") {
    res.end("Home page");
  } else {
    res.end("Not found");
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

## Sync vs Async

**Synchronous**: Wait until done, nothing else can happen
**Asynchronous**: Start something, continue other work, get notified when done

_Like a waiter: bad waiter waits in kitchen, good waiter serves other tables while waiting_
