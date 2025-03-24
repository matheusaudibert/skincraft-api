const puppeteer = require("puppeteer");

/**
 * Service for retrieving Minecraft skin information
 */
const skinsService = {
  /**
   * Get the latest Minecraft skins from NameMC
   */
  async getLatestSkins() {
    let browser = null;

    try {
      browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const page = await browser.newPage();

      // Optimizations to improve performance
      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      );

      // Block non-essential resources
      await page.setRequestInterception(true);
      page.on("request", (req) => {
        const resourceType = req.resourceType();
        if (
          ["stylesheet", "font", "image", "media", "other"].includes(
            resourceType
          ) &&
          !req.url().includes("skin/body.png")
        ) {
          req.abort();
        } else {
          req.continue();
        }
      });

      await page.goto("https://namemc.com/minecraft-skins/new", {
        waitUntil: "domcontentloaded",
        timeout: 15000,
      });

      // Extract skin data (username, skin ID, and count)
      const skinsData = await page.evaluate(() => {
        const results = [];

        for (let order = 0; order <= 5; order++) {
          const skinDiv = document.querySelector(
            `.col-4.col-md-2[style*="order: ${order}"]`
          );
          if (!skinDiv) continue;

          // Extract player name
          const playerName =
            skinDiv.querySelector(".card-header span")?.textContent.trim() ||
            null;

          // Extract the skin ID from the URL or image src
          const skinLink =
            skinDiv.querySelector("a")?.getAttribute("href") || "";
          const skinId = skinLink.split("/").pop() || "";

          // Extract the count/popularity (stars) from the bottom right corner
          const countText =
            skinDiv
              .querySelector(".position-absolute.bottom-0.end-0.text-muted")
              ?.textContent.trim() || "";
          // Parse the number from text like "736★"
          const count = parseInt(countText.replace("★", "")) || 0;

          if (skinId) {
            // Always include user, id, and count in this specific order
            results.push({
              user: playerName, // Always include user field, even if null
              id: skinId,
              count: count,
            });
          }
        }

        return results;
      });

      return skinsData;
    } catch (error) {
      console.error("Error retrieving latest skins:", error.message);
      return [];
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  },

  /**
   * Get a random Minecraft skin from NameMC
   */
  async getRandomSkin() {
    let browser = null;

    try {
      browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const page = await browser.newPage();

      // Optimizations to improve performance
      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      );

      // Block non-essential resources
      await page.setRequestInterception(true);
      page.on("request", (req) => {
        const resourceType = req.resourceType();
        if (
          ["stylesheet", "font", "image", "media", "other"].includes(
            resourceType
          ) &&
          !req.url().includes("skin/body.png")
        ) {
          req.abort();
        } else {
          req.continue();
        }
      });

      await page.goto("https://namemc.com/minecraft-skins/random", {
        waitUntil: "domcontentloaded",
        timeout: 15000,
      });

      // Extract the first 6 skins (order: 0 through 5)
      const skinsData = await page.evaluate(() => {
        const results = [];

        for (let order = 0; order <= 5; order++) {
          const skinDiv = document.querySelector(
            `.col-4.col-md-2[style*="order: ${order}"]`
          );
          if (!skinDiv) continue;

          // Try to extract the player name if available
          let playerName =
            skinDiv.querySelector(".card-header span")?.textContent.trim() ||
            null;

          // Handle special case where username is '—' (no player)
          if (playerName === "—") {
            playerName = null;
          }

          // Extract the skin ID from the URL
          const skinLink =
            skinDiv.querySelector("a")?.getAttribute("href") || "";
          const skinId = skinLink.split("/").pop() || "";

          // Check if we have a valid skin ID
          if (!skinId) continue;

          // Extract the count/popularity (stars) from the bottom right corner
          const countText =
            skinDiv
              .querySelector(".position-absolute.bottom-0.end-0.text-muted")
              ?.textContent.trim() || "";
          // Parse the number from text like "736★"
          const count = parseInt(countText.replace("★", "")) || 0;

          // Always include user, id, and count fields in this specific order
          results.push({
            user: playerName, // Always include user field, even if null
            id: skinId,
            count: count,
          });
        }

        return results;
      });

      return skinsData;
    } catch (error) {
      console.error("Error retrieving random skins:", error.message);
      return [];
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  },

  /**
   * Get trending skins by time period from NameMC
   * @param {string} period - The time period (daily, weekly, monthly)
   */
  async getTrendingSkins(period) {
    let browser = null;

    try {
      browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const page = await browser.newPage();

      // Optimizations to improve performance
      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      );

      // Block non-essential resources
      await page.setRequestInterception(true);
      page.on("request", (req) => {
        const resourceType = req.resourceType();
        if (
          ["stylesheet", "font", "image", "media", "other"].includes(
            resourceType
          ) &&
          !req.url().includes("skin/body.png")
        ) {
          req.abort();
        } else {
          req.continue();
        }
      });

      // Validate and build the URL
      if (!["daily", "weekly", "monthly"].includes(period)) {
        period = "daily"; // Default to daily if invalid
      }

      await page.goto(`https://namemc.com/minecraft-skins/trending/${period}`, {
        waitUntil: "domcontentloaded",
        timeout: 15000,
      });

      // Extract skin data (username, skin ID, and count)
      const skinsData = await page.evaluate(() => {
        const results = [];

        for (let order = 0; order <= 5; order++) {
          const skinDiv = document.querySelector(
            `.col-4.col-md-2[style*="order: ${order}"]`
          );
          if (!skinDiv) continue;

          // Extract the player name
          let playerName =
            skinDiv.querySelector(".card-header span")?.textContent.trim() ||
            null;

          // Handle special case where username is '—' (no player)
          if (playerName === "—") {
            playerName = null;
          }

          // Extract the skin ID from the URL or image src
          const skinLink =
            skinDiv.querySelector("a")?.getAttribute("href") || "";
          const skinId = skinLink.split("/").pop() || "";

          // Extract the count/popularity (stars) from the bottom right corner
          const countText =
            skinDiv
              .querySelector(".position-absolute.bottom-0.end-0.text-muted")
              ?.textContent.trim() || "";
          // Parse the number from text like "736★"
          const count = parseInt(countText.replace("★", "")) || 0;

          if (skinId) {
            // Always include user, id, and count in this specific order
            results.push({
              user: playerName, // Always include user field, even if null
              id: skinId,
              count: count,
            });
          }
        }

        return results;
      });

      return skinsData;
    } catch (error) {
      console.error(
        `Error retrieving ${period} trending skins:`,
        error.message
      );
      return [];
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  },
};

module.exports = skinsService;
