// Schema & Model Demo - Run: npm run schema

const mongoose = require("mongoose");
require("dotenv").config();

// Schema = structure of documents
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  done: { type: Boolean, default: false },
  priority: { type: Number, min: 1, max: 5, default: 3 },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

// Model = tool to interact with collection
const Task = mongoose.model("Task", taskSchema);

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB\n");

    // Create a sample task (not saved to DB)
    const sampleTask = new Task({
      title: "learn test",
      description: "Understand how schemas work",
      priority: 5,
      tags: ["express", "learning"],
    });
    await sampleTask.save();

    console.log("📝 Sample Task:");
    console.log(JSON.stringify(sampleTask.toObject(), null, 2));
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("\n👋 Connection closed");
  }
}

main();
