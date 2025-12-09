# Authentication & Authorization Cheat Sheet

Quick reference for implementing secure authentication in Express.

## Core Concepts

```
Authentication = "Who are you?" (Identity verification)
Authorization  = "What can you do?" (Permission check)
```

## Required Packages

```bash
npm install bcrypt jsonwebtoken dotenv mongoose express
```

## Password Hashing

### Hash Password

```javascript
const bcrypt = require("bcrypt");

const hashedPassword = await bcrypt.hash(password, 10);
```

### Compare Password

```javascript
const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
```

### Mongoose Schema with Auto-Hashing

```javascript
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
```

## JWT Operations

### Generate Token

```javascript
const jwt = require("jsonwebtoken");

const token = jwt.sign(
  { userId: user._id, email: user.email, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "24h" }
);
```

### Verify Token

```javascript
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // decoded = { userId: '...', email: '...', role: '...' }
} catch (error) {
  // Invalid or expired token
}
```

## User Model

```javascript
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
```

## Authentication Endpoints

### Register

```javascript
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

### Login

```javascript
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

## Middleware

### Authentication Middleware

```javascript
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
```

### Role Authorization Middleware

```javascript
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};

const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};
```

## Using Middleware in Routes

```javascript
const authMiddleware = require("./middleware/authMiddleware");
const { adminOnly, requireRole } = require("./middleware/roleMiddleware");

// Public route
router.post("/auth/register", register);
router.post("/auth/login", login);

// Protected routes - authentication required
router.get("/profile", authMiddleware, getProfile);
router.get("/tasks", authMiddleware, getTasks);

// Admin only routes
router.delete("/users/:id", authMiddleware, adminOnly, deleteUser);

// Multiple roles allowed
router.put(
  "/tasks/:id",
  authMiddleware,
  requireRole("admin", "moderator"),
  updateTask
);
```

## Environment Variables

`.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/auth-db
JWT_SECRET=your-super-secret-key-min-32-characters
PORT=3000
```

## Common Status Codes

- `200` - Success
- `201` - Created (successful registration)
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `500` - Server Error

## Security Best Practices

1. Store JWT secret in environment variables
2. Use HTTPS in production
3. Set token expiration (e.g., 24h)
4. Hash passwords with bcrypt (min 10 salt rounds)
5. Validate all user input
6. Use generic error messages ("Invalid credentials" not "User not found")
7. Never log sensitive data (passwords, tokens)
