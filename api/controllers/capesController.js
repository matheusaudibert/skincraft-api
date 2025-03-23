const fs = require("fs");
const path = require("path");

/**
 * Controller for listing all available capes
 */
const capesController = {
  /**
   * Get all available capes
   */
  getAllCapes(req, res, next) {
    try {
      // Path to the capes JSON file
      const capesFilePath = path.join(__dirname, "../utils/capes.json");

      // Read the JSON file
      const capesData = JSON.parse(fs.readFileSync(capesFilePath, "utf8"));

      // Remove the image and link fields from each cape object
      const cleanedCapes = capesData.capes.map((cape) => {
        const { image, link, ...capeWithoutImageAndLink } = cape;
        return capeWithoutImageAndLink;
      });

      // Return the modified data
      res.json({
        totalCapes: capesData.totalCapes,
        capes: cleanedCapes,
      });
    } catch (error) {
      console.error("Error getting capes:", error.message);
      res.status(500).json({
        error: "error",
        message: "internal server error",
      });
    }
  },
};

module.exports = capesController;
