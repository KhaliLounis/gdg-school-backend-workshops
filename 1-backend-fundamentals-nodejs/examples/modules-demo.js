console.log("=== Node.js Modules Demo ===\n");

// 1. Using built-in modules
console.log("1. Built-in modules (come with Node.js):");

const fs = require("fs");
const path = require("path");
const http = require("http");

console.log("✓ fs - for working with files");
console.log("✓ path - for working with file paths");
console.log("✓ http - for creating servers");

// 2. Using our own modules
console.log("\n2. Custom modules (our own files):");

// Import from our math utility
const { add, multiply } = require("./math-utils");

console.log("Math examples:");
console.log(`add(5, 3) = ${add(5, 3)}`);
console.log(`multiply(4, 7) = ${multiply(4, 7)}`);

// Import from our greetings module
const greetings = require("./greetings");

console.log("\nGreeting examples:");
console.log(greetings.sayHello("Workshop Attendee"));
console.log(greetings.sayGoodbye("Everyone"));
console.log(greetings.getMotivation());
