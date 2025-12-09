// ===========================================
// Authentication Controller
// TODO: Complete the implementation
// ===========================================

const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register new user
exports.register = async (req, res) => {
  try {
    // TODO: Implement registration logic

    // 1. Extract email, password, role from req.body

    // 2. Validate input
    //    - Check if email and password exist
    //    - Check password length (min 6 characters)

    // 3. Check if user already exists
    //    - Use User.findOne({ email })
    //    - Return 400 if exists

    // 4. Create new user
    //    - Use new User({ email, password, role })
    //    - Save to database
    //    - Password will be hashed automatically by pre-save hook

    // 5. Generate JWT token
    //    - Include userId, email, role in payload
    //    - Use process.env.JWT_SECRET
    //    - Set expiration (24h)

    // 6. Return response
    //    - Status 201
    //    - Include token and user info (no password!)

    res.status(500).json({ error: "Not implemented yet" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    // TODO: Implement login logic

    // 1. Extract email and password from req.body

    // 2. Validate input
    //    - Check if email and password exist

    // 3. Find user by email
    //    - Use User.findOne({ email })
    //    - Return 401 if not found

    // 4. Compare password
    //    - Use user.comparePassword(password)
    //    - Return 401 if invalid

    // 5. Generate JWT token
    //    - Include userId, email, role in payload
    //    - Use process.env.JWT_SECRET
    //    - Set expiration (24h)

    // 6. Return response
    //    - Include token and user info (no password!)

    res.status(500).json({ error: "Not implemented yet" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    // TODO: Implement get current user logic

    // 1. Get userId from req.user (set by authMiddleware)

    // 2. Find user by ID
    //    - Use User.findById()
    //    - Exclude password with .select('-password')

    // 3. Return user info

    res.status(500).json({ error: "Not implemented yet" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
