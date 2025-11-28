# Express & REST API Cheat Sheet

## REST & CRUD Operations

| Operation | HTTP Method | Example URL    | Purpose           |
| --------- | ----------- | -------------- | ----------------- |
| Create    | POST        | /api/tasks     | Add new task      |
| Read      | GET         | /api/tasks     | Get all tasks     |
| Read One  | GET         | /api/tasks/123 | Get specific task |
| Update    | PUT/PATCH   | /api/tasks/123 | Update task       |
| Delete    | DELETE      | /api/tasks/123 | Remove task       |

## HTTP Request Anatomy

**Method + URL + Headers + Body**

```
GET /api/tasks?done=true HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{ "title": "New task" }
```

## URL Structure

- **Path**: `/api/tasks` (which resource)
- **Route params**: `/api/tasks/:id` → `/api/tasks/123`
- **Query params**: `/api/tasks?done=true&page=2`

## Status Codes (Essential)

- **200s**: Success (200 OK, 201 Created)
- **400s**: Client error (404 Not Found, 400 Bad Request)
- **500s**: Server error (500 Internal Server Error)

## Express Basics

```javascript
const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/path", (req, res) => {
  res.json({ data: "value" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

## Common Patterns

**Route Parameters**

```javascript
app.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
});
```

**Query Parameters**

```javascript
app.get("/api/users", (req, res) => {
  const page = req.query.page;
});
```

**JSON Response**

```javascript
res.json({ message: "Success" });
res.status(201).json({ id: 1, name: "John" });
```

## Middleware

```javascript
// All requests
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Specific path
app.use("/api", middleware);
```

## Postman Testing

1. Set method (GET, POST, etc.)
2. Enter URL (http://localhost:3000/api/endpoint)
3. Add headers if needed
4. Add body for POST/PUT (JSON format)
5. Send and inspect response
