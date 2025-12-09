# Mini Task: Build a Secure Authentication System

## Objective

Create a complete authentication system with user registration, login, protected routes, and role-based access control.

## Requirements

### 1. User Registration

- Create `POST /auth/register` endpoint
- Validate email and password (min 6 characters)
- Hash password with bcrypt
- Return JWT token

### 2. User Login

- Create `POST /auth/login` endpoint
- Validate credentials
- Return JWT token

### 3. Authentication Middleware

- Verify JWT tokens from Authorization header
- Attach user info to `req.user`
- Return 401 for invalid/missing tokens

### 4. Protected Routes

- `GET /auth/me` - Get current user info
- `GET /tasks` - Get user's tasks
- `POST /tasks` - Create new task
- All require authentication

### 5. Role-Based Access Control

- Add `role` field to User model (default: 'user')
- Create admin middleware
- `GET /admin/tasks` - View all tasks (admin only)
- Only task owner (or admin) can delete tasks

### 6. Task Model

- `title` (required)
- `description`
- `completed` (boolean, default: false)
- `userId` (reference to User)
- Users can only see/modify their own tasks

## Project Structure

```
mini-task/
├── server.js
├── models/
│   ├── User.js
│   └── Task.js
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
├── controllers/
│   ├── authController.js
│   └── taskController.js
└── routes/
    ├── authRoutes.js
    └── taskRoutes.js
```

## Getting Started

1. Create `.env` file with MongoDB URI and JWT secret
2. Fill in the TODO sections in each file
3. Test with a REST client (Postman, Thunder Client, etc.)

## Implementation Tips

- Use `bcrypt.hash()` in User model's pre-save hook
- JWT payload should include: userId, email, role
- Set token expiration (e.g., 24h)
- Validate user input before processing
- Use generic error messages ("Invalid credentials" not "User not found")

## Success Criteria

✓ User can register with email and password  
✓ User can login and receive JWT token  
✓ Protected routes require valid token  
✓ Users can create and view their own tasks  
✓ Admin can view all tasks  
✓ Only owner can delete their tasks (or admin)
