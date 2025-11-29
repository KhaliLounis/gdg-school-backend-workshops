/**
 * MongoDB Connection Demo
 * This example shows how to connect to MongoDB using Mongoose
 *
 * Run: npm start
 */

const mongoose = require("mongoose");
require("dotenv").config();

// ===========================================
// CONNECTING TO MONGODB
// ===========================================

// Mongoose allows us to connect to a MongoDB database using a single function
// We store the connection string in an environment variable for security

console.log("🔄 Attempting to connect to MongoDB...\n");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB successfully!");
    console.log("📦 Database is ready for operations\n");

    // Show connection info
    console.log("Connection Details:");
    console.log("-------------------");
    console.log(`Host: ${mongoose.connection.host}`);
    console.log(`Database: ${mongoose.connection.name}`);
    console.log(`State: Connected\n`);

    // Close connection after demo
    console.log("👋 Closing connection...");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ Connection failed!");
    console.error("Error:", err.message);
    console.log("\n💡 Make sure you have:");
    console.log("   1. Created a .env file in this folder");
    console.log("   2. Added your MONGO_URI connection string");
    console.log("   3. Your MongoDB Atlas cluster is running");
    process.exit(1);
  });

// ===========================================
// ENVIRONMENT VARIABLES EXAMPLE
// ===========================================

// Your .env file should look like this:
// MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/workshop
// PORT=3000
