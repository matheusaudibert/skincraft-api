const express = require("express");
const cors = require("cors");
const routes = require("./api/routes");
const path = require("path");

// Express server initialization
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Static files configuration - Serve the public directory
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api", routes);

// Root route - Serve the HTML documentation when accessing the root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// JSON API documentation - Keep this for programmatic access
app.get("/api", (req, res) => {
  res.json({
    name: "SkinCraft API",
    version: "1.0.0",
    description: "API for Minecraft player information",
    endpoints: [
      {
        path: "/api/user/:identifier/profile",
        description: "Get player profile by username or UUID",
      },
      {
        path: "/api/user/:identifier/capes",
        description: "Get player capes by username or UUID",
      },
      {
        path: "/api/user/:identifier/skins",
        description: "Get player skins by username or UUID",
      },
      {
        path: "/api/capes",
        description: "List all available Minecraft capes",
      },
      {
        path: "/api/names",
        description: "Get soon-to-be-available Minecraft names (first 10)",
      },
      {
        path: "/api/names/:length",
        description: "Get soon-to-be-available Minecraft names by length",
      },
      {
        path: "/api/name/:username",
        description: "Check if a specific Minecraft username is available",
      },
      {
        path: "/api/skins/latest",
        description: "Get the latest Minecraft skins",
      },
      {
        path: "/api/skins/random",
        description: "Get random Minecraft skins",
      },
      {
        path: "/api/skins/daily",
        description: "Get daily trending Minecraft skins",
      },
      {
        path: "/api/skins/weekly",
        description: "Get weekly trending Minecraft skins",
      },
      {
        path: "/api/skins/monthly",
        description: "Get monthly trending Minecraft skins",
      },
    ],
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "error",
    message: "internal server error",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
