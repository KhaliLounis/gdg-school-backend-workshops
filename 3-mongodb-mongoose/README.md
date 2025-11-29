# Session 3: MongoDB & Mongoose

## Learning Objectives

By the end of this session, you should understand:

- The difference between SQL and NoSQL databases
- Why document databases (like MongoDB) are useful
- MongoDB data types and document structure
- What Mongoose is and why we use it
- How to connect to MongoDB using Mongoose
- How to define Schemas and Models
- Basic CRUD operations (Create & Read)

## Key Concepts

### SQL vs NoSQL

- **SQL**: Tables, rows, fixed schema (MySQL, PostgreSQL)
- **NoSQL**: Collections, documents, flexible schema (MongoDB)

### MongoDB Structure

```
Database → Collections → Documents
(like)     (like tables)  (like rows, but flexible)
```

### Mongoose Role

Express App → **Mongoose** → MongoDB

Mongoose is the bridge that makes database operations easier and safer.

## Workshop Structure

1. **Session 2 Recap Quiz** (5 min)
2. **Databases Intro: SQL vs NoSQL** (10 min)
3. **MongoDB Data Types** (5 min)
4. **Why Document Databases?** (10 min)
5. **Why MongoDB?** (10 min)
6. **Mongoose Introduction** (10 min)
7. **Connecting to Database** (15 min + demo)
8. **Schema & Model** (15 min)
9. **CRUD Part 1: Create & Read** (20 min + mini task)
10. **Wrap-up** (5 min)

## Files in this Session

- `examples/` - Code examples for each concept
- `mini-task/` - Starter code for the hands-on exercise
- `solutions/` - Complete solutions for reference
- `cheat-sheet.md` - Quick reference guide
- `package.json` - Project setup with nodemon

## Quick Setup

```bash
npm install
```

## Environment Setup

Create a `.env` file in this folder:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/workshop
PORT=3000
```

## Running Examples

```bash
npm start              # Basic connection example
npm run schema         # Schema & Model demo
npm run crud           # CRUD operations demo
npm run dev            # Development with nodemon
```

## Mini Task

Navigate to the `mini-task/` folder and follow the instructions in the README.

```bash
npm run task           # Run mini task starter
npm run task:dev       # Run with nodemon (auto-restart)
```

## Prerequisites

- Node.js installed
- MongoDB Atlas account (free tier)
- Postman for testing

## Important Notes

> 📌 **nodemon** auto-restarts the server when you save changes - no need to manually restart!

> 📌 In MongoDB, a **collection** is like a "table" in SQL, but documents inside can have different fields.

> 📌 Each **document** is a JSON-like object representing a single record.
