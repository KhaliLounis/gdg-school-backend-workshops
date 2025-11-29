/**
 * Schema & Model Demo
 * This example shows how to define Schemas and create Models with Mongoose
 *
 * Run: npm run schema
 */

const mongoose = require("mongoose");
require("dotenv").config();

// ===========================================
// SCHEMA DEFINITION
// ===========================================

// A Schema defines the structure of documents in a collection
// It specifies fields, data types, and requirements

const taskSchema = new mongoose.Schema({
  // Required field - must be provided
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },

  // Optional field with no validation
  description: String,

  // Boolean with default value
  done: {
    type: Boolean,
    default: false,
  },

  // Number with min/max validation
  priority: {
    type: Number,
    min: 1,
    max: 5,
    default: 3,
  },

  // Array of strings
  tags: [String],

  // Auto-generated timestamp
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ===========================================
// MODEL CREATION
// ===========================================

// A Model is the object we use to interact with the collection
// Model.create(), Model.find(), Model.findById(), etc.

const Task = mongoose.model("Task", taskSchema);

// ===========================================
// DEMONSTRATION
// ===========================================

async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB\n");

    // Show schema structure
    console.log("📋 Task Schema Fields:");
    console.log("------------------------");
    console.log("• title (String, required)");
    console.log("• description (String, optional)");
    console.log("• done (Boolean, default: false)");
    console.log("• priority (Number, 1-5, default: 3)");
    console.log("• tags (Array of Strings)");
    console.log("• createdAt (Date, auto-generated)\n");

    // Create a sample task to show the schema in action
    console.log("📝 Creating a sample task...\n");

    const sampleTask = new Task({
      title: "Learn Mongoose Schemas",
      description: "Understand how schemas work",
      priority: 5,
      tags: ["mongoose", "learning"],
    });

    // Show the document before saving (notice _id is auto-generated)
    console.log("Document Preview (before saving):");
    console.log(JSON.stringify(sampleTask.toObject(), null, 2));

    // Note: We're not saving to database in this demo
    // To save: await sampleTask.save();

    console.log("\n💡 Key Points:");
    console.log("   • Schema = Structure definition");
    console.log("   • Model = Tool to interact with collection");
    console.log("   • Mongoose auto-generates _id field");
    console.log("   • Default values are applied automatically");
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("\n👋 Connection closed");
  }
}

main();
