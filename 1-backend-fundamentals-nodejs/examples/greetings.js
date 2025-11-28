function sayHello(name) {
  return `Hello, ${name}! Welcome to the backend workshop.`;
}

function sayGoodbye(name) {
  return `Goodbye, ${name}! Hope you enjoyed learning about backends.`;
}

function getMotivation() {
  return "You're doing great! Backend development is fun.";
}

// Export all functions
module.exports = {
  sayHello,
  sayGoodbye,
  getMotivation,
};
