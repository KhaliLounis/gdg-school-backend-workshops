# CRUD API Cheat Sheet

## Mongoose Update Operations

### findByIdAndUpdate

```javascript
// Update a document by ID
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,           // ID to find
      {
        title: req.body.title,
        done: req.body.done,
      },
      { new: true }            // Return updated document!
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

> ⚠️ **Important**: Use `{ new: true }` to return the updated document, otherwise you get the OLD version!

### Update Options

| Option          | Purpose                              |
| --------------- | ------------------------------------ |
| `new: true`     | Return updated document              |
| `runValidators: true` | Run schema validation on update |

```javascript
await Task.findByIdAndUpdate(
  id,
  updateData,
  { new: true, runValidators: true }
);
```

## Mongoose Delete Operations

### findByIdAndDelete

```javascript
// Delete a document by ID
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Validation & Error Handling

### Schema Validation

```javascript
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [3, "Title must be at least 3 characters"],
    maxlength: [100, "Title cannot exceed 100 characters"],
    trim: true,
  },
  priority: {
    type: Number,
    min: [1, "Priority must be at least 1"],
    max: [5, "Priority cannot exceed 5"],
    default: 3,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
});
```

### HTTP Status Codes

| Code | Meaning              | When to Use                        |
| ---- | -------------------- | ---------------------------------- |
| 200  | OK                   | Successful GET, PUT, DELETE        |
| 201  | Created              | Successful POST (resource created) |
| 400  | Bad Request          | Invalid input, validation failed   |
| 404  | Not Found            | Resource doesn't exist             |
| 500  | Internal Server Error| Server/database error              |

### Error Handling Examples

```javascript
// 400 - Bad Request (validation error)
if (!req.body.title) {
  return res.status(400).json({ error: "Title is required" });
}

// 404 - Not Found
const task = await Task.findById(id);
if (!task) {
  return res.status(404).json({ error: "Task not found" });
}

// 500 - Server Error
try {
  // database operation
} catch (error) {
  res.status(500).json({ error: "Server error" });
}
```

## API Folder Structure

```
project/
├── models/              # Data layer
│   └── Task.js          # Schema + Model
│
├── controllers/         # Business logic
│   └── taskController.js
│
├── routes/              # Route definitions
│   └── taskRoutes.js
│
├── middleware/          # Custom middleware (optional)
│   └── errorHandler.js
│
├── server.js            # Entry point
├── app.js               # Express app setup (optional)
└── .env                 # Environment variables
```

## Controllers Pattern

### Why Controllers?

- **Separation of concerns** - Routes define URLs, controllers handle logic
- **Reusability** - Same logic can be used in different routes
- **Testability** - Easier to unit test isolated functions
- **Maintainability** - Cleaner, more organized code

### Route File (Thin)

```javascript
// routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getTask);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
```

### Controller File (Logic)

```javascript
// controllers/taskController.js
const Task = require("../models/Task");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ... more controller functions
```

### Using Routes in Server

```javascript
// server.js
const express = require("express");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(express.json());

// Mount routes
app.use("/api/tasks", taskRoutes);

app.listen(3000);
```

## Full CRUD Summary

| Action  | Method | URL             | Controller Function | Response |
| ------- | ------ | --------------- | ------------------- | -------- |
| Create  | POST   | /api/tasks      | `createTask`        | 201 + task |
| Read All| GET    | /api/tasks      | `getAllTasks`       | 200 + tasks |
| Read One| GET    | /api/tasks/:id  | `getTask`           | 200 + task |
| Update  | PUT    | /api/tasks/:id  | `updateTask`        | 200 + task |
| Delete  | DELETE | /api/tasks/:id  | `deleteTask`        | 200 + message |

## Error Middleware (Bonus)

```javascript
// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ error: "Validation failed", details: errors });
  }

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  // Default server error
  res.status(500).json({ error: "Something went wrong" });
};

module.exports = errorHandler;
```

## Quick Reference

```javascript
// CREATE
const task = await Task.create({ title: "New Task" });

// READ ALL
const tasks = await Task.find();

// READ ONE
const task = await Task.findById(id);

// UPDATE
const task = await Task.findByIdAndUpdate(id, data, { new: true });

// DELETE
const task = await Task.findByIdAndDelete(id);
```
