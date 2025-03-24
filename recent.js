const puppeteer = require("puppeteer");

async function fetchRecentSkins() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Otimizações para melhorar a performance
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );

  // Bloqueia recursos não essenciais
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

  try {
    await page.goto("https://namemc.com/minecraft-skins/new", {
      waitUntil: "domcontentloaded",
      timeout: 15000,
    });

    // Extrai apenas o nome e o link da skin
    const skinsData = await page.evaluate(() => {
      const results = [];

      for (let order = 0; order <= 5; order++) {
        const skinDiv = document.querySelector(
          `.col-4.col-md-2[style*="order: ${order}"]`
        );
        if (!skinDiv) continue;

        const playerName =
          skinDiv.querySelector(".card-header span")?.textContent.trim() ||
          "Desconhecido";
        const skinUrl =
          skinDiv.querySelector("img.drop-shadow")?.getAttribute("src") || null;

        if (playerName && skinUrl) {
          results.push({ playerName, skinUrl });
        }
      }

      return results;
    });

    await browser.close();
    return skinsData;
  } catch (error) {
    console.error("Erro:", error);
    return [];
  } finally {
    await browser.close();
  }
}

// Versão simplificada para uso
(async () => {
  const skins = await fetchRecentSkins();
  skins.forEach((skin) => {
    console.log(`Player: ${skin.playerName}`);
    console.log(`Skin: ${skin.skinUrl}`);
    console.log("---");
  });
})();

module.exports = { fetchRecentSkins };
