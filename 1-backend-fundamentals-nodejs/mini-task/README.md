# Mini Task: Your First Personal Backend

## Instructions (8-10 minutes)

Your turn to build a simple backend! Complete these two tasks:

### Task 1: Personal Information Route

Change the response so it returns your name and your track/specialization.

### Task 2: Add a New Route

Add a second route - when someone visits `/track`, return just your track/specialization.

## Hints

- Check `req.url` to see what was requested
- Use `console.log(req.url)` to inspect incoming requests
- Test your server by visiting different URLs in your browser

## Getting Started

1. Open `server.js` in this folder
2. Make your changes
3. Run: `node server.js`
4. Test in browser: http://localhost:3000

## Example URLs to test

- http://localhost:3000/ (should show your name and track)
- http://localhost:3000/track (should show just your track)
- http://localhost:3000/anything-else (should show a not found message)

## Questions to Think About

- What happens when you visit a URL that doesn't exist?
- How does the server know which route was requested?
- What would you need to do to add more routes?

Remember: This is practice! Don't worry about making it perfect.
