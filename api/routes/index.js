const express = require("express");
const profileController = require("../controllers/profileController");
const capesController = require("../controllers/capesController");
const namesController = require("../controllers/namesController");
const nameController = require("../controllers/nameController");
const skinsController = require("../controllers/skinsController");

const router = express.Router();

// User profile routes
router.get("/user/:identifier/profile", profileController.getProfile);
router.get("/user/:identifier/capes", profileController.getUserCapes);
router.get("/user/:identifier/skins", profileController.getUserSkins);

// Capes routes
router.get("/capes", capesController.getAllCapes);

// Names routes
router.get("/names/:length", namesController.getNamesByLength);
router.get("/names", namesController.getAllAvailableNames);
router.get("/name/:username", nameController.checkNameAvailability);

// Skins routes
router.get("/skins/latest", skinsController.getLatestSkins);
router.get("/skins/random", skinsController.getRandomSkin);
router.get("/skins/daily", (req, res, next) => {
  req.params.period = "daily";
  skinsController.getTrendingSkins(req, res, next);
});
router.get("/skins/weekly", (req, res, next) => {
  req.params.period = "weekly";
  skinsController.getTrendingSkins(req, res, next);
});
router.get("/skins/monthly", (req, res, next) => {
  req.params.period = "monthly";
  skinsController.getTrendingSkins(req, res, next);
});

module.exports = router;
