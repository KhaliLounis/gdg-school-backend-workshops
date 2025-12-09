// ===========================================
// User Model
// TODO: Complete the implementation
// ===========================================

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    // TODO: Add validation
    // - required
    // - unique
    // - lowercase
    // - trim
  },
  password: {
    type: String,
    // TODO: Add validation
    // - required
    // - minlength: 6
  },
  role: {
    type: String,
    // TODO: Add enum
    // - 'user', 'admin', 'moderator'
    // - default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ===========================================
// TODO: Add pre-save hook to hash password
// ===========================================

// userSchema.pre('save', async function(next) {
//   // Only hash if password is modified
//   // Hash password with bcrypt (10 rounds)
// });

// ===========================================
// TODO: Add method to compare passwords
// ===========================================

// userSchema.methods.comparePassword = async function(candidatePassword) {
//   // Use bcrypt.compare to check password
// };

module.exports = mongoose.model("User", userSchema);
