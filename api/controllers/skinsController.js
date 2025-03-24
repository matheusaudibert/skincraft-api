const skinsService = require("../services/skinsService");

/**
 * Controller for Minecraft skins operations
 */
const skinsController = {
  /**
   * Get latest Minecraft skins
   */
  async getLatestSkins(req, res, next) {
    try {
      const skins = await skinsService.getLatestSkins();

      if (skins.length === 0) {
        return res.status(404).json({
          error: "No skins found",
          message: "Could not retrieve latest skins at this time",
        });
      }

      res.json({
        skins: skins,
      });
    } catch (error) {
      console.error("Error in getLatestSkins controller:", error);
      res.status(500).json({
        error: "error",
        message: "internal server error",
      });
    }
  },

  /**
   * Get a random Minecraft skin
   */
  async getRandomSkin(req, res, next) {
    try {
      const skins = await skinsService.getRandomSkin();

      if (skins.length === 0) {
        return res.status(404).json({
          error: "Skins not found",
          message: "Could not retrieve random skins at this time",
        });
      }

      res.json({
        skins: skins,
      });
    } catch (error) {
      console.error("Error in getRandomSkin controller:", error);
      res.status(500).json({
        error: "error",
        message: "internal server error",
      });
    }
  },

  /**
   * Get trending Minecraft skins by time period
   */
  async getTrendingSkins(req, res, next) {
    try {
      const period = req.params.period;

      // Validate period parameter
      if (!period || !["daily", "weekly", "monthly"].includes(period)) {
        return res.status(400).json({
          error: "Invalid period",
          message: "Period must be one of: daily, weekly, monthly",
        });
      }

      const skins = await skinsService.getTrendingSkins(period);

      if (skins.length === 0) {
        return res.status(404).json({
          error: "No skins found",
          message: `Could not retrieve ${period} trending skins at this time`,
        });
      }

      res.json({
        period: period,
        skins: skins,
      });
    } catch (error) {
      console.error(`Error in getTrendingSkins controller:`, error);
      res.status(500).json({
        error: "error",
        message: "internal server error",
      });
    }
  },
};

module.exports = skinsController;
