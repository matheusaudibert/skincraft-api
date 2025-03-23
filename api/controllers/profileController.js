const profileService = require("../services/profileService");

/**
 * Controller for player profile operations
 */
const profileController = {
  /**
   * Get player profile by username or UUID
   */
  async getProfile(req, res, next) {
    try {
      const { identifier } = req.params;

      if (!identifier) {
        return res.status(400).json({
          error: "Invalid identifier",
          message: "Please provide a valid username or UUID",
        });
      }

      try {
        const profile = await profileService.getProfileByIdentifier(identifier);
        res.json(profile);
      } catch (serviceError) {
        // Check if it's a "user not found" error
        if (serviceError.message === "User not found") {
          return res.status(404).json({
            error: "User not found",
          });
        }

        // For any other error, return internal server error
        return res.status(500).json({
          error: "Internal server error",
        });
      }
    } catch (error) {
      // Fallback for any other unhandled error
      console.error("Unhandled error:", error);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  },

  /**
   * Get player capes by username or UUID
   */
  async getUserCapes(req, res, next) {
    try {
      const { identifier } = req.params;

      if (!identifier) {
        return res.status(400).json({
          error: "Invalid identifier",
          message: "Please provide a valid username or UUID",
        });
      }

      try {
        const capes = await profileService.getUserCapes(identifier);
        res.json({ CAPES: capes });
      } catch (serviceError) {
        // Check if it's a "user not found" error
        if (serviceError.message === "User not found") {
          return res.status(404).json({
            error: "User not found",
          });
        }

        // For any other error, return internal server error
        return res.status(500).json({
          error: "Internal server error",
        });
      }
    } catch (error) {
      // Fallback for any other unhandled error
      console.error("Unhandled error:", error);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  },

  /**
   * Get player skins by username or UUID
   */
  async getUserSkins(req, res, next) {
    try {
      const { identifier } = req.params;

      if (!identifier) {
        return res.status(400).json({
          error: "Invalid identifier",
          message: "Please provide a valid username or UUID",
        });
      }

      try {
        const skins = await profileService.getUserSkins(identifier);
        res.json({ SKINS: skins });
      } catch (serviceError) {
        // Check if it's a "user not found" error
        if (serviceError.message === "User not found") {
          return res.status(404).json({
            error: "User not found",
          });
        }

        // For any other error, return internal server error
        return res.status(500).json({
          error: "Internal server error",
        });
      }
    } catch (error) {
      // Fallback for any other unhandled error
      console.error("Unhandled error:", error);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  },
};

module.exports = profileController;
