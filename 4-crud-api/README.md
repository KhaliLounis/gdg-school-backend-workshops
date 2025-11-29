# Session 4: Full CRUD API with Clean Structure

## Learning Objectives

By the end of this session, you should understand:

- How to complete Mongoose CRUD (Update & Delete)
- Schema validation and error handling
- How to structure an API cleanly (models, routes, controllers)
- The controllers pattern for cleaner code
- How to implement a full CRUD API

## Key Concepts

### Complete CRUD Operations

| Operation | HTTP Method | Mongoose Method           |
| --------- | ----------- | ------------------------- |
| Create    | POST        | `Model.create()`          |
| Read      | GET         | `Model.find()` / `findById()` |
| Update    | PUT/PATCH   | `Model.findByIdAndUpdate()` |
| Delete    | DELETE      | `Model.findByIdAndDelete()` |

### API Folder Structure

```
project/
├── models/          # Schema & Model definitions
│   └── Task.js
├── controllers/     # Business logic
│   └── taskController.js
├── routes/          # Route definitions (thin)
│   └── taskRoutes.js
├── server.js        # Entry point
└── .env             # Environment variables
```

### Controllers Pattern

Routes stay thin → Controllers handle logic → Easier to test & maintain

## Workshop Structure

1. **Session 3 Recap** (5 min)
2. **Mongoose Update & Delete** (15 min)
3. **Validation & Error Handling** (15 min)
4. **API Folder Structure** (10 min)
5. **Controllers Pattern** (15 min)
6. **Full CRUD Walkthrough** (30 min)
7. **Optional Mini-Project** (1h-1h30 if time)
8. **Wrap-up** (5 min)

## Files in this Session

- `examples/` - Code examples for each concept
- `mini-task/` - Starter code for the mini-project
- `solutions/` - Complete solutions for reference
- `cheat-sheet.md` - Quick reference guide

## Quick Setup

```bash
npm install
```

## Environment Setup

Create a `.env` file:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/workshop
PORT=3000
```

## Running Examples

```bash
npm run examples:update       # Update & Delete demo
npm run examples:validation   # Validation demo
npm run examples:structure    # Structured API example
npm run examples:structure:dev # With nodemon
```

## Mini-Project (Optional)

Build a complete Task Manager API with:
- Full CRUD endpoints
- Schema validation
- Error handling middleware
- Postman testing

```bash
npm run task        # Run starter code
npm run task:dev    # With nodemon
npm run solution    # Run complete solution
```

## Important Notes

> 📌 Use `{ new: true }` with `findByIdAndUpdate` to return the updated document

> 📌 Always validate user input - never trust the client!

> 📌 Keep routes thin, put logic in controllers

> 📌 Use proper HTTP status codes: 200, 201, 400, 404, 500
