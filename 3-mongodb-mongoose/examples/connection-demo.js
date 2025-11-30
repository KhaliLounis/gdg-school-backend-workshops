// MongoDB Connection Demo - Run: npm start

const mongoose = require("mongoose");
require("dotenv").config();

console.log("Connecting to MongoDB...");

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    console.log(`Host: ${mongoose.connection.host}`);
    console.log(`Database: ${mongoose.connection.name}`);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Connection failed:", err.message);
    process.exit(1);
  });
