const fs = require("fs");
const path = require("path");

/**
 * Service for retrieving and processing cape information
 */
const capesService = {
  /**
   * Capes cache
   */
  _capesCache: null,

  /**
   * Load capes data from local file
   */
  async _loadCapesData() {
    try {
      if (this._capesCache) return this._capesCache;

      const capesFilePath = path.join(__dirname, "../utils/capes.json");
      const capesData = JSON.parse(fs.readFileSync(capesFilePath, "utf8"));

      // Transform the capes array into a map for quick lookup by hash
      const capesMap = {};
      capesData.capes.forEach((cape) => {
        capesMap[cape.hash] = cape;
      });

      this._capesCache = {
        totalCapes: capesData.totalCapes,
        capes: capesData.capes,
        capesMap,
      };

      return this._capesCache;
    } catch (error) {
      console.error("Error loading capes data:", error.message);
      throw new Error("Could not load capes data");
    }
  },

  /**
   * Get all available capes
   */
  async getAllCapes() {
    const capesData = await this._loadCapesData();
    return {
      totalCapes: capesData.totalCapes,
      capes: capesData.capes,
    };
  },

  /**
   * Get information about a specific cape by hash
   */
  async getCapeByHash(hash) {
    const capesData = await this._loadCapesData();
    return capesData.capesMap[hash] || null;
  },
};

module.exports = capesService;
