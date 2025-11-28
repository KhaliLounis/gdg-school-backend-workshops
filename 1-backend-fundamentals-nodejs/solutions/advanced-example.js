const http = require("http");

// Store data in variables (like a mini-database)
const personalInfo = {
  name: "Sarah",
  track: "Full-Stack Development",
  location: "Algiers",
  experience: "Beginner",
};

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.url}`);

  res.writeHead(200, { "Content-Type": "text/plain" });

  // More routes for demonstration
  if (req.url === "/") {
    res.end(
      `Hi! I'm ${personalInfo.name} and I'm in the ${personalInfo.track} track.`
    );
  } else if (req.url === "/track") {
    res.end(personalInfo.track);
  } else if (req.url === "/location") {
    res.end(`I'm from ${personalInfo.location}`);
  } else if (req.url === "/experience") {
    res.end(`Experience level: ${personalInfo.experience}`);
  } else if (req.url === "/all") {
    res.end(
      `Name: ${personalInfo.name}\nTrack: ${personalInfo.track}\nLocation: ${personalInfo.location}\nExperience: ${personalInfo.experience}`
    );
  } else {
    res.end("Available routes: /, /track, /location, /experience, /all");
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Advanced server running at http://localhost:${port}`);
  console.log("Available routes:");
  console.log("- / (basic info)");
  console.log("- /track (just track)");
  console.log("- /location (location)");
  console.log("- /experience (experience level)");
  console.log("- /all (everything)");
});

// This advanced example shows:
// 1. Using variables to store data
// 2. Multiple routes
// 3. Template strings for cleaner code
// 4. Timestamped logging
// 5. Helpful route listing
