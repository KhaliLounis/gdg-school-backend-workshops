# Postman Testing Guide

## What is Postman?

Postman is a tool for testing APIs without building a frontend. Think of it as a remote control for your backend.

## Getting Started

1. **Download**: Get Postman from postman.com (free)
2. **Create Collection**: Organize your API tests
3. **Set Base URL**: `http://localhost:3000` for local development

## Testing Your Express API

### Basic GET Request

1. Method: `GET`
2. URL: `http://localhost:3000/api/profile`
3. Click Send
4. Check response in the bottom panel

### POST Request with JSON

1. Method: `POST`
2. URL: `http://localhost:3000/api/tasks`
3. Headers tab: `Content-Type: application/json`
4. Body tab: Select `raw` → `JSON`
5. Add JSON data:
   ```json
   {
     "title": "Learn Postman",
     "done": false
   }
   ```
6. Click Send

## Common HTTP Methods to Test

- **GET**: Retrieve data (no body needed)
- **POST**: Create new data (include JSON body)
- **PUT**: Update existing data (include JSON body)
- **DELETE**: Remove data (usually no body)

## Response Areas to Check

- **Status**: 200 OK, 404 Not Found, etc.
- **Headers**: Content-Type, etc.
- **Body**: The actual data returned
- **Time**: How long the request took

## Pro Tips

- Save requests in collections for reuse
- Use environment variables for URLs
- Check both success and error cases
- Verify JSON format in responses

## Testing Session 2 Endpoints

Test these with your profile API:

```
GET http://localhost:3000/api/profile
GET http://localhost:3000/api/profile/role
GET http://localhost:3000/nonexistent (should return 404)
```
