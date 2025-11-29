# Mini-Project: Task Manager API

## Goal (1h - 1h30)

Build a complete Task Manager API with:
- ✅ Full CRUD endpoints
- ✅ Schema validation
- ✅ Error handling
- ✅ Clean folder structure
- ✅ Test with Postman

## Folder Structure to Create

```
mini-task/
├── models/
│   └── Task.js           # TODO 1: Create schema
├── controllers/
│   └── taskController.js # TODO 2: Add logic
├── routes/
│   └── taskRoutes.js     # TODO 3: Define routes
└── server.js             # TODO 4: Set up server
```

## Instructions

### TODO 1: Create the Task Model (`models/Task.js`)

Create a schema with:
- `title` (String, required, 3-100 chars)
- `description` (String, optional, max 500 chars)
- `done` (Boolean, default: false)
- `priority` (Number, 1-5, default: 3)
- `createdAt` (Date, auto-generated)

### TODO 2: Create the Controller (`controllers/taskController.js`)

Implement these functions:
- `getAllTasks` - Get all tasks
- `getTask` - Get one task by ID
- `createTask` - Create a new task
- `updateTask` - Update a task
- `deleteTask` - Delete a task

### TODO 3: Create the Routes (`routes/taskRoutes.js`)

Define routes that call the controller functions:
- `GET /` → getAllTasks
- `GET /:id` → getTask
- `POST /` → createTask
- `PUT /:id` → updateTask
- `DELETE /:id` → deleteTask

### TODO 4: Set up the Server (`server.js`)

- Connect to MongoDB
- Use express.json() middleware
- Mount routes at `/api/tasks`
- Start server on port 3000

## Testing with Postman

### 1. Create a Task
```
POST http://localhost:3000/api/tasks
Content-Type: application/json

{
  "title": "Complete workshop",
  "description": "Finish the CRUD API workshop",
  "priority": 5
}
```

### 2. Get All Tasks
```
GET http://localhost:3000/api/tasks
```

### 3. Get One Task
```
GET http://localhost:3000/api/tasks/:id
```

### 4. Update a Task
```
PUT http://localhost:3000/api/tasks/:id
Content-Type: application/json

{
  "done": true
}
```

### 5. Delete a Task
```
DELETE http://localhost:3000/api/tasks/:id
```

## Running

```bash
npm run task        # Run your solution
npm run task:dev    # With nodemon (auto-restart)
```

## Check the Solution

If you get stuck, check the `solutions/` folder!

```bash
npm run solution
```

## Bonus Challenges

1. Add a `GET /api/tasks/filter/pending` endpoint
2. Add a `GET /api/tasks/filter/completed` endpoint
3. Add query parameter filtering: `GET /api/tasks?priority=5`
4. Add an error handling middleware
