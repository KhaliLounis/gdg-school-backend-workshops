// ===========================================
// Complete Authentication System Demo
// Includes: Registration, Login, Protected Routes, RBAC
// ===========================================

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

// Configuration
const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/auth-demo";
const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret-in-production";

// ===========================================
// User Model
// ===========================================

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["user", "admin", "moderator"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

// ===========================================
// Middleware: Authentication
// ===========================================

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// ===========================================
// Middleware: Role-Based Authorization
// ===========================================

const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Forbidden: Requires one of: ${allowedRoles.join(", ")}`,
      });
    }

    next();
  };
};

// ===========================================
// Routes: Authentication
// ===========================================

// Register new user
app.post("/auth/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create new user
    const user = new User({
      email,
      password,
      role: role || "user",
    });
    await user.save();

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get current user info
app.get("/auth/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===========================================
// Routes: Public
// ===========================================

app.get("/", (req, res) => {
  res.json({
    message: "Authentication API",
    endpoints: {
      public: ["GET /"],
      auth: [
        "POST /auth/register",
        "POST /auth/login",
        "GET /auth/me (protected)",
      ],
      protected: [
        "GET /profile (user)",
        "GET /admin (admin only)",
        "GET /moderator (admin, moderator)",
      ],
    },
  });
});

// ===========================================
// Routes: Protected
// ===========================================

// Any authenticated user
app.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Your profile",
    user: req.user,
  });
});

// Admin only
app.get("/admin", authMiddleware, requireRole("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({
      message: "Admin dashboard",
      totalUsers: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin or moderator
app.get(
  "/moderator",
  authMiddleware,
  requireRole("admin", "moderator"),
  (req, res) => {
    res.json({
      message: "Moderator panel",
      user: req.user,
    });
  }
);

// Delete user (admin only)
app.delete(
  "/users/:id",
  authMiddleware,
  requireRole("admin"),
  async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);

      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        message: "User deleted successfully",
        deletedUser: {
          id: deletedUser._id,
          email: deletedUser.email,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// ===========================================
// Database Connection & Server Start
// ===========================================

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log("\nTest the endpoints:");
      console.log(`  POST http://localhost:${PORT}/auth/register`);
      console.log(`  POST http://localhost:${PORT}/auth/login`);
      console.log(`  GET  http://localhost:${PORT}/profile (requires auth)`);
      console.log(`  GET  http://localhost:${PORT}/admin (admin only)\n`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.log("\nShutting down...");
  await mongoose.connection.close();
  process.exit(0);
});
