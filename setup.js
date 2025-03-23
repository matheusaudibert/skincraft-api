const fs = require("fs");
const path = require("path");

// Directories to be created
const directories = [
  "api",
  "api/routes",
  "api/controllers",
  "api/services",
  "api/utils",
  "public",
];

// Create directories
directories.forEach((dir) => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Directory created: ${dirPath}`);
  } else {
    console.log(`Directory already exists: ${dirPath}`);
  }
});

console.log("Setup complete! Directory structure created.");
