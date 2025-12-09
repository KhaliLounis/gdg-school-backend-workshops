// ===========================================
// JWT (JSON Web Token) Demo
// ===========================================

const jwt = require("jsonwebtoken");

// Demo JWT creation, verification, and decoding

console.log("JWT (JSON Web Token) Demo\n");
console.log("=".repeat(50));

// Secret key (in real app, use environment variable)
const JWT_SECRET = "my-super-secret-key-change-this-in-production";

// User data to encode in token
const userData = {
  userId: "12345",
  email: "john@example.com",
  role: "user",
};

console.log("\n1. User data to encode:");
console.log(JSON.stringify(userData, null, 2));

// Create JWT
console.log("\n2. Creating JWT...");
const token = jwt.sign(userData, JWT_SECRET, { expiresIn: "24h" });
console.log(`   Token: ${token}`);
console.log(`   Length: ${token.length} characters`);

// Decode JWT (without verification)
console.log("\n3. Decoding JWT (without verification):");
const decoded = jwt.decode(token);
console.log(JSON.stringify(decoded, null, 2));

// Verify JWT
console.log("\n4. Verifying JWT with correct secret:");
try {
  const verified = jwt.verify(token, JWT_SECRET);
  console.log("   Token is valid!");
  console.log("   Decoded data:", JSON.stringify(verified, null, 2));
} catch (error) {
  console.log("   Token verification failed:", error.message);
}

// Try to verify with wrong secret
console.log("\n5. Verifying JWT with WRONG secret:");
try {
  const verified = jwt.verify(token, "wrong-secret");
  console.log("   Token is valid!");
} catch (error) {
  console.log("   Token verification failed:", error.message);
}

// Create expired token
console.log("\n6. Creating expired token (1 second expiration):");
const expiredToken = jwt.sign(userData, JWT_SECRET, { expiresIn: "1s" });
console.log(`   Token created: ${expiredToken.substring(0, 50)}...`);

// Wait and try to verify
setTimeout(() => {
  console.log("\n7. Verifying expired token (after 2 seconds):");
  try {
    jwt.verify(expiredToken, JWT_SECRET);
    console.log("   Token is valid!");
  } catch (error) {
    console.log("   Token verification failed:", error.message);
  }

  console.log("\n" + "=".repeat(50));
  console.log("Key Takeaways:");
  console.log("   - JWTs are self-contained (include user data)");
  console.log("   - Always verify tokens before trusting them");
  console.log("   - Keep your JWT secret safe (use .env)");
  console.log("   - Set appropriate expiration times\n");
}, 2000);
