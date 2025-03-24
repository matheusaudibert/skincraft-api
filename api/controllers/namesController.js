const axios = require("axios");

/**
 * Controller for retrieving available Minecraft names
 */
const namesController = {
  /**
   * Get soon-to-be-available Minecraft names by length
   */
  async getNamesByLength(req, res, next) {
    try {
      const length = req.params.length;

      // Validate length parameter
      if (!length || isNaN(length) || length < 3 || length > 16) {
        return res.status(400).json({
          error: "Invalid length",
          message: "Length must be a number between 3 and 16",
        });
      }

      // Query the Laby.net API for names
      const response = await axios.get(
        `https://laby.net/api/v3/names?order_by=available_from&page=1&min_length=${length}&max_length=${length}`
      );

      // Extract only the needed fields from the first 10 names
      const names = response.data.slice(0, 10).map((item) => ({
        name: item.name,
        available_from: item.available_from,
        og: item.og,
      }));

      // Return simplified response without count and note
      res.json({
        length: parseInt(length),
        names: names,
      });
    } catch (error) {
      console.error("Error retrieving names:", error.message);
      res.status(500).json({
        error: "error",
        message: "internal server error",
      });
    }
  },

  /**
   * Get all soon-to-be-available Minecraft names (first 10)
   */
  async getAllAvailableNames(req, res, next) {
    try {
      // Query the Laby.net API for names
      const response = await axios.get(
        `https://laby.net/api/v3/names?order_by=available_from&order=ASC&page=1&popularity=0&min_length=3&max_length=16&is_og=none`
      );

      // Extract only the needed fields from the first 10 names
      const names = response.data.slice(0, 10).map((item) => ({
        name: item.name,
        available_from: item.available_from,
        og: item.og,
      }));

      // Return simplified response
      res.json({
        names: names,
      });
    } catch (error) {
      console.error("Error retrieving names:", error.message);
      res.status(500).json({
        error: "error",
        message: "internal server error",
      });
    }
  },
};

module.exports = namesController;
