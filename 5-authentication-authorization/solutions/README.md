# Authentication & Authorization - Solution

Complete working implementation for the authentication mini-task.

## File Structure

```
solutions/
├── server.js              # Main server with all routes
├── models/
│   ├── User.js            # User model with password hashing
│   └── Task.js            # Task model with user reference
├── middleware/
│   ├── authMiddleware.js  # JWT verification
│   └── roleMiddleware.js  # Role-based access control
├── controllers/
│   ├── authController.js  # Registration & login
│   └── taskController.js  # Task CRUD operations
└── routes/
    ├── authRoutes.js      # Auth endpoints
    └── taskRoutes.js      # Task endpoints
```

## Running the Solution

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create `.env` file:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/auth-solution
JWT_SECRET=your-super-secret-key-min-32-characters
JWT_EXPIRES_IN=24h
```

### 3. Start Server

```bash
node server.js
```

## Implementation Highlights

### User Model Features

- Automatic password hashing with bcrypt
- Password comparison method
- Role field (user, admin)
- Email uniqueness validation

### Authentication Flow

1. **Register**: Creates user, hashes password, returns JWT
2. **Login**: Validates credentials, returns JWT
3. **Protected Routes**: Verify JWT before allowing access

### Task Ownership

- Tasks linked to user via `userId` field
- Users can only view/edit/delete their own tasks
- Admins can view all tasks

### Role-Based Access

- `authMiddleware`: Verifies JWT token
- `adminOnly`: Restricts routes to admin role
- Applied to specific routes as needed

## Key Features Implemented

✓ User registration with password hashing  
✓ User login with JWT generation  
✓ Protected routes requiring authentication  
✓ Task ownership validation  
✓ Admin role with elevated permissions  
✓ Error handling and validation  
✓ Secure password comparison

## API Endpoints

### Authentication

- `POST /auth/register` - Create new user
- `POST /auth/login` - Login and get token
- `GET /auth/me` - Get current user info (protected)

### Tasks

- `GET /tasks` - Get user's tasks (protected)
- `POST /tasks` - Create task (protected)
- `PUT /tasks/:id` - Update task (protected, owner only)
- `DELETE /tasks/:id` - Delete task (protected, owner only)

### Admin

- `GET /admin/tasks` - View all tasks (admin only)
