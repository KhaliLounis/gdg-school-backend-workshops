# Mini Task: Profile API

## Instructions (10-15 minutes)

Build a simple profile API with these endpoints:

### Task 1: Basic Profile Endpoint

Create `GET /api/profile` that returns your name and track as JSON.

### Task 2: Role Endpoint

Create `GET /api/profile/role` that returns your role (student, trainer, etc).

### Task 3: Add Logging

Log each request in the console showing the URL.

## Getting Started

1. Complete the starter code in `profile-api.js`
2. Test with your browser or Postman
3. Run: `node profile-api.js`

## Expected Response Format

```json
// GET /api/profile
{
  "name": "Your Name",
  "track": "Your Track"
}

// GET /api/profile/role
{
  "role": "Your Role"
}
```

## Test URLs

- http://localhost:3000/api/profile
- http://localhost:3000/api/profile/role

## Bonus Challenges

- Add a `GET /api/profile/skills` endpoint
- Include status codes (200 for success)
- Add a middleware that only logs API calls
