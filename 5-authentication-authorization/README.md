# Session 5: Authentication & Authorization

## Learning Objectives

By the end of this session, you should understand:

- The difference between authentication and authorization
- Password hashing with bcrypt
- JWT (JSON Web Token) authentication
- How to protect routes with middleware
- User registration and login implementation
- Role-based access control basics

## Key Concepts

### Authentication vs Authorization

- **Authentication**: "Who are you?" - Verifying identity (login)
- **Authorization**: "What can you do?" - Controlling access (permissions)

### JWT (JSON Web Token)

JWT Structure: `header.payload.signature`

- **Header**: Algorithm and token type
- **Payload**: User data (userId, email, role)
- **Signature**: Verifies token hasn't been tampered with

Why JWT for APIs?

- Stateless (no server-side session storage)
- Self-contained (includes user info)
- Works great for mobile and single-page apps

### Password Security with bcrypt

Never store plain passwords! Always hash them.

```javascript
const bcrypt = require("bcrypt");

// Hash password before saving
const hashedPassword = await bcrypt.hash(password, 10);

// Compare password during login
const isValid = await bcrypt.compare(inputPassword, hashedPassword);
```

The `10` is the salt rounds - higher = more secure but slower.

## Workshop Structure

1. **Authentication Concepts** (10 min)
2. **Password Hashing Demo** (10 min)
3. **JWT Basics** (15 min)
4. **User Registration & Login** (20 min)
5. **Protecting Routes with Middleware** (20 min)
6. **Role-Based Access Control** (15 min)
7. **Mini Task** (30 min)

## Implementation Overview

### 1. User Model with Password Hashing

```javascript
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

// Auto-hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
```

### 2. Registration & Login

```javascript
// Register: hash password, save user, return token
// Login: validate password, return token
const token = jwt.sign(
  { userId: user._id, email: user.email, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "24h" }
);
```

### 3. Authentication Middleware

```javascript
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
```

### 4. Role-Based Authorization

```javascript
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};

// Use in routes
router.delete("/users/:id", authMiddleware, adminOnly, deleteUser);
```

## Files in this Session

- `examples/` - Password hashing, JWT, and middleware demos
- `mini-task/` - Starter code for hands-on exercise
- `solutions/` - Complete implementation
- `cheat-sheet.md` - Quick reference guide

## Quick Setup

```bash
npm install
```

## Environment Setup

Create a `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/auth-workshop
JWT_SECRET=your-super-secret-key-min-32-characters
PORT=3000
```

## Running Examples

```bash
npm run example:password    # Password hashing demo
npm run example:jwt         # JWT demo
npm run example:middleware  # Middleware demo
npm run example:complete    # Full auth system
```

## Mini Task

Build a Task Manager API with authentication:

1. User registration and login
2. Protected task routes (users see only their tasks)
3. Admin role can view all tasks
4. Task ownership validation

Navigate to `mini-task/` folder for starter code.

## Important Notes

📌 Never store passwords in plain text - always hash with bcrypt

📌 Keep JWT secrets in environment variables, never in code

📌 Tokens should have expiration times (e.g., 24 hours)

📌 Use HTTPS in production to protect tokens in transit

## Security Best Practices

1. **Environment Variables**: Store secrets in `.env`, never in code
2. **Password Hashing**: Always use bcrypt with at least 10 salt rounds
3. **Token Expiration**: Set reasonable expiration times (24h recommended)
4. **HTTPS**: Use HTTPS in production to encrypt data in transit
5. **Input Validation**: Validate all user input before processing
6. **Error Messages**: Don't leak information in error messages ("Invalid credentials" not "User not found")
