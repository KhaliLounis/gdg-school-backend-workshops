// ===========================================
// Authentication Routes
// TODO: Complete the implementation
// ===========================================

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// TODO: Define your routes

// Register - POST /auth/register
// router.post('/register', authController.register);

// Login - POST /auth/login
// router.post('/login', authController.login);

// Get current user - GET /auth/me (protected)
// router.get('/me', authMiddleware, authController.getCurrentUser);

module.exports = router;
