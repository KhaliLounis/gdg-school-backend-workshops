# MongoDB & Mongoose Cheat Sheet

## SQL vs NoSQL Comparison

| Aspect        | SQL (e.g., MySQL)     | NoSQL (e.g., MongoDB)  |
| ------------- | --------------------- | ---------------------- |
| Structure     | Tables with rows      | Collections with docs  |
| Schema        | Fixed, rigid          | Flexible, dynamic      |
| Data Format   | Rows and columns      | JSON-like documents    |
| Relationships | JOINs                 | Embedded or referenced |
| Scaling       | Vertical (bigger PC)  | Horizontal (more PCs)  |
| Best For      | Complex relationships | Rapid development      |

## Why Document Databases?

- Store data as **JSON-like documents** instead of tables
- Each document can have **different fields** (flexibility over rigid SQL)
- **Collections** group multiple documents together
- Perfect for fast development and iteration

## Why MongoDB?

- Stores data as JSON-like documents in collections
- **Flexible schema** - fields can vary per document
- Scales easily and integrates well with **Node.js / Express**
- Works great with cloud platforms like **MongoDB Atlas**

> 📌 In MongoDB, a **collection** is like a "table" in SQL, but documents inside can have different fields.  
> 📌 Each **document** is a JSON-like object representing a single record.

## MongoDB Data Types

| Type     | Example                                  | Description           |
| -------- | ---------------------------------------- | --------------------- |
| String   | `"Hello World"`                          | Text data             |
| Number   | `42`, `3.14`                             | Integers or decimals  |
| Boolean  | `true`, `false`                          | True/false values     |
| Date     | `new Date()`                             | Date and time         |
| ObjectId | `ObjectId("507f1f77bcf86cd799439011")`   | Unique identifier     |
| Array    | `["node", "express", "mongodb"]`         | List of values        |
| Object   | `{ city: "Algiers", country: "Algeria"}` | Nested document       |
| null     | `null`                                   | Empty or missing data |

## Document Example

```javascript
// A MongoDB document (JSON-like)
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  title: "Learn MongoDB",
  done: false,
  priority: 1,
  tags: ["database", "backend"],
  createdAt: new Date(),
  assignee: {
    name: "Ahmed",
    email: "ahmed@example.com"
  }
}
```

## Mongoose Connection

```javascript
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB ✅"))
  .catch((err) => console.error("Connection error:", err));
```

> 📌 Store the connection string in an **environment variable** for security!

## What is Mongoose?

- **ODM** (Object Data Modeling) library for MongoDB
- Helps us define **Schemas** and **Models** to structure data clearly
- Acts as a **bridge** between Express and MongoDB
- Makes database operations easier and safer

> 💡 You write JavaScript objects → Mongoose converts them into MongoDB documents

## Schema Definition

```javascript
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  done: { type: Boolean, default: false },
  priority: { type: Number, min: 1, max: 5 },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});
```

## Model Creation

```javascript
const Task = mongoose.model("Task", taskSchema);
```

> 📌 **Schema** = Structure definition (what fields, what types)  
> 📌 **Model** = The object we use to interact with the collection (create, find, update...)

## CRUD Operations (Create & Read)

Mongoose provides simple functions to interact with the database.  
Both operations are **asynchronous**, so we use `async/await` to handle them cleanly.

### Create - Using `Model.create()`

```javascript
// Create one document
const task = await Task.create({
  title: "Learn Mongoose",
  done: false,
});

// Create multiple documents
const tasks = await Task.create([{ title: "Task 1" }, { title: "Task 2" }]);
```

### Read - Using `Model.find()`

```javascript
// Find all documents
const allTasks = await Task.find();

// Find with filter
const pendingTasks = await Task.find({ done: false });

// Find one document
const task = await Task.findOne({ title: "Learn Mongoose" });

// Find by ID
const task = await Task.findById("507f1f77bcf86cd799439011");
```

## Common Schema Types

```javascript
const exampleSchema = new mongoose.Schema({
  // Required string
  name: { type: String, required: true },

  // String with default
  status: { type: String, default: "pending" },

  // Number with min/max
  age: { type: Number, min: 0, max: 120 },

  // Boolean with default
  isActive: { type: Boolean, default: true },

  // Array of strings
  tags: [String],

  // Nested object
  address: {
    city: String,
    country: String,
  },

  // Auto timestamp
  createdAt: { type: Date, default: Date.now },
});
```

## Environment Variables (.env)

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
PORT=3000
```

## Quick Reference

| What You Want               | Mongoose Method        |
| --------------------------- | ---------------------- |
| Create one document         | `Model.create({})`     |
| Create many documents       | `Model.create([...])`  |
| Find all documents          | `Model.find()`         |
| Find with filter            | `Model.find({ ... })`  |
| Find one document           | `Model.findOne({})`    |
| Find by ID                  | `Model.findById(id)`   |
| Update by ID                | `Model.findByIdAndUpdate(id, {})` |
| Delete by ID                | `Model.findByIdAndDelete(id)`     |

## Remember

> 📌 Schema = Structure definition (what fields, what types)

> 📌 Model = The tool to interact with the collection

> 📌 All database operations are **async** → use `async/await`

> 📌 Mongoose converts your JavaScript objects into MongoDB documents

## Execution Order

Middleware and routes execute **top to bottom**:

```
Request
   ↓
express.json()     → Parse body
   ↓
Logger middleware  → Log request
   ↓
Route handlers     → Process request
   ↓
404 handler        → Catch unknown routes
   ↓
Error handler      → Catch errors
   ↓
Response
```

```javascript
// 1. Middleware (runs for every request)
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// 2. Routes
app.get("/api/tasks", ...);
app.post("/api/tasks", ...);

// 3. 404 handler (AFTER routes)
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// 4. Error handler (LAST - must have 4 params)
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
```

## 404 Not Found Handler

Catches any request that didn't match a route:

```javascript
// Place AFTER all your routes!
app.use((req, res, next) => {
  res.status(404).json({
    error: "Route not found",
    message: `Cannot ${req.method} ${req.url}`,
  });
});
```

## Error Handler Middleware

Catches errors thrown in route handlers:

```javascript
// Place LAST! Must have 4 parameters (err, req, res, next)
app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ error: "Validation failed", details: errors });
  }

  // Invalid ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  // Default server error
  res.status(500).json({ error: "Something went wrong" });
});
```

## HTTP Status Codes

| Code | Meaning              | When to Use                     |
| ---- | -------------------- | ------------------------------- |
| 200  | OK                   | Successful GET, PUT, DELETE     |
| 201  | Created              | Successful POST                 |
| 400  | Bad Request          | Invalid input, validation error |
| 404  | Not Found            | Resource doesn't exist          |
| 500  | Internal Server Error| Server/database error           |
