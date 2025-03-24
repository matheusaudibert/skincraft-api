const axios = require("axios");

/**
 * Controller for checking Minecraft username availability
 */
const nameController = {
  /**
   * Check if a specific username is available or will be available
   */
  async checkNameAvailability(req, res, next) {
    try {
      const username = req.params.username;

      if (!username) {
        return res.status(400).json({
          error: "Invalid username",
          message: "Please provide a valid username",
        });
      }

      // Validate username length (3-16 characters)
      if (username.length < 3 || username.length > 16) {
        return res.status(400).json({
          error: "Invalid username",
          message: "Username must be between 3 and 16 characters",
        });
      }

      // Validate username characters (only letters, numbers, and underscores)
      const validUsernameRegex = /^[a-zA-Z0-9_]+$/;
      if (!validUsernameRegex.test(username)) {
        return res.status(400).json({
          error: "Invalid username",
          message:
            "Username can only contain letters, numbers, and underscores",
        });
      }

      // Query the Laby.net API to search for the profile
      const response = await axios.get(
        `https://laby.net/api/v3/search/profiles/${username}`
      );

      // Check if there are any users with this name
      if (response.data.users.length === 0) {
        // If no users found, the name is available
        return res.json({
          name: username,
          available: true,
          available_from: null, // Name is already available
        });
      }

      // Check ALL users in the response, not just the first one
      // Check if any account currently has this exact username (case-insensitive)
      const nameInUse = response.data.users.some(
        (user) => user.name.toLowerCase() === username.toLowerCase()
      );

      if (nameInUse) {
        // Name is currently in use by someone
        return res.json({
          name: username,
          available: false,
          available_from: null, // Name is not available
        });
      }

      // If we get here, the name was used in the past but isn't currently in use
      // Take the first user who had this name in the past
      const user = response.data.users[0];
      const nameHistory = user.history;

      // Find the entry for the requested name (case-insensitive)
      const nameEntry = nameHistory.find(
        (entry) => entry.name.toLowerCase() === username.toLowerCase()
      );

      if (!nameEntry) {
        // This shouldn't happen with the current API response structure
        return res.json({
          name: username,
          available: true,
          available_from: null,
        });
      }

      // Find the entry that came after this name
      const nameIndex = nameHistory.findIndex(
        (entry) => entry.name.toLowerCase() === username.toLowerCase()
      );

      if (nameIndex <= 0) {
        // This shouldn't happen if we found the name earlier
        return res.json({
          name: username,
          available: false,
          available_from: null,
        });
      }

      // Get the entry that came after (index - 1 because history is in reverse chronological order)
      const nextEntry = nameHistory[nameIndex - 1];

      // Calculate when the name will be available (37 days after the change)
      const changedDate = new Date(nextEntry.changed_at);
      const availableDate = new Date(changedDate);
      availableDate.setDate(availableDate.getDate() + 37);

      // Adjust time by subtracting 2 hours (timezone correction)
      availableDate.setHours(availableDate.getHours() - 2);

      // Check if the name is already available (37 days have passed)
      const now = new Date();
      const isAvailable = now > availableDate;

      return res.json({
        name: username,
        available: isAvailable,
        available_from: isAvailable ? null : availableDate.toISOString(),
      });
    } catch (error) {
      // If the API returns a 404, the name is available
      if (error.response && error.response.status === 404) {
        return res.json({
          name: req.params.username,
          available: true,
          available_from: null, // Name is already available
        });
      }

      console.error("Error checking name availability:", error.message);
      res.status(500).json({
        error: "error",
        message: "internal server error",
      });
    }
  },
};

module.exports = nameController;
