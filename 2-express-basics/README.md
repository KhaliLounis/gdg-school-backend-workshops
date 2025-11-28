# Session 2: Express Basics & REST APIs

## Learning Objectives

By the end of this session, you should understand:

- What REST APIs and CRUD operations are
- HTTP request/response anatomy (methods, URLs, headers, body)
- JSON as the web's data format
- Why Express makes Node.js development easier
- How to create endpoints and handle routes
- Basic middleware concepts
- How to test APIs with Postman

## Key Concepts

### REST & CRUD

- **REST**: A style for designing APIs over HTTP
- **CRUD**: Create, Read, Update, Delete operations

### Express Benefits

From manual `if (req.url === ...)` to clean routing and built-in helpers.

### Middleware Pipeline

Request → [middlewares...] → route handler → response

## Workshop Structure

1. **Session 1 Recap** (5 min)
2. **REST API & CRUD** (10 min)
3. **HTTP Request/Response Deep Dive** (20 min)
4. **JSON Data Format** (5 min)
5. **Why Express?** (10 min)
6. **Express Basics** (25 min + mini task)
7. **Postman Introduction** (15 min)
8. **Middleware Concepts** (25 min + task)
9. **Wrap-up** (5 min)

## Quick Setup

```bash
npm install
```

## Running Examples

```bash
npm start          # Basic Express server
npm run api        # REST API examples
npm run middleware # Middleware demo
```
