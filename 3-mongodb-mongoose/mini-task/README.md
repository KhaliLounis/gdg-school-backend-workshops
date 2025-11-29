# Mini Task: Task API with MongoDB

## Instructions (15-20 minutes)

Build a simple Task API connected to MongoDB with Create and Read operations.

## Task 1: Connect to MongoDB

Set up the Mongoose connection using your `.env` file.

## Task 2: Create a Task Schema

Define a schema with these fields:

- `title` - String, required
- `description` - String, optional
- `done` - Boolean, default: false
- `createdAt` - Date, default: current date

## Task 3: Create the Model

Create a `Task` model from the schema.

## Task 4: Implement CREATE Endpoint

Create `POST /api/tasks` that:

- Takes `title` and `description` from request body
- Creates a new task in MongoDB
- Returns the created task with status 201

## Task 5: Implement READ Endpoint

Create `GET /api/tasks` that:

- Retrieves all tasks from MongoDB
- Returns the array of tasks

## Getting Started

1. Make sure you have a `.env` file with your `MONGO_URI`
2. Complete the starter code in `task-api.js`
3. Run: `npm run task` or `npm run task:dev` (with nodemon)
4. Test with Postman

## Expected Response Format

```json
// POST /api/tasks (with body: { "title": "My Task", "description": "Details" })
{
  "_id": "...",
  "title": "My Task",
  "description": "Details",
  "done": false,
  "createdAt": "2024-01-15T10:30:00.000Z"
}

// GET /api/tasks
[
  {
    "_id": "...",
    "title": "My Task",
    "description": "Details",
    "done": false,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

## Test with Postman

### Create a Task

```
Method: POST
URL: http://localhost:3000/api/tasks
Headers: Content-Type: application/json
Body (raw JSON):
{
  "title": "Learn MongoDB",
  "description": "Complete the workshop"
}
```

### Get All Tasks

```
Method: GET
URL: http://localhost:3000/api/tasks
```

## Bonus Challenges

- Add a `GET /api/tasks/:id` endpoint to get a single task
- Add validation error handling
- Add a `GET /api/tasks/pending` endpoint to get only incomplete tasks
