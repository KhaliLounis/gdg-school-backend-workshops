// ===========================================
// Password Hashing Demo with bcrypt
// ===========================================

const bcrypt = require("bcrypt");

// Demonstrate password hashing and comparison

async function demonstratePasswordHashing() {
  console.log("Password Hashing Demo\n");
  console.log("=".repeat(50));

  const password = "mySecurePassword123";
  const saltRounds = 10;

  console.log(`\n1. Original password: "${password}"`);
  console.log(`   Salt rounds: ${saltRounds}`);

  // Hash the password
  console.log("\n2. Hashing password...");
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log(`   Hashed: ${hashedPassword}`);

  // Try to compare correct password
  console.log("\n3. Testing with correct password...");
  const isMatchCorrect = await bcrypt.compare(password, hashedPassword);
  console.log(`   Result: ${isMatchCorrect ? "Match!" : "No match"}`);

  // Try to compare wrong password
  console.log("\n4. Testing with wrong password...");
  const wrongPassword = "wrongPassword456";
  const isMatchWrong = await bcrypt.compare(wrongPassword, hashedPassword);
  console.log(`   Result: ${isMatchWrong ? "Match!" : "No match"}`);

  // Show that same password produces different hashes
  console.log("\n5. Hashing same password again (different salt)...");
  const hashedPassword2 = await bcrypt.hash(password, saltRounds);
  console.log(`   Hash 1: ${hashedPassword}`);
  console.log(`   Hash 2: ${hashedPassword2}`);
  console.log(
    `   Same hashes? ${
      hashedPassword === hashedPassword2 ? "Yes" : "No (this is good!)"
    }`
  );

  // But both hashes work for comparison
  console.log("\n6. Both hashes should validate the original password:");
  const match1 = await bcrypt.compare(password, hashedPassword);
  const match2 = await bcrypt.compare(password, hashedPassword2);
  console.log(`   Hash 1 validates: ${match1 ? "Yes" : "No"}`);
  console.log(`   Hash 2 validates: ${match2 ? "Yes" : "No"}`);

  console.log("\n" + "=".repeat(50));
  console.log("Key Takeaway: Never store plain passwords!");
  console.log("   Always hash with bcrypt before saving to database.\n");
}

// Run the demo
demonstratePasswordHashing().catch(console.error);
