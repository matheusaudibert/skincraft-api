const express = require("express");
const profileController = require("../controllers/profileController");
const capesController = require("../controllers/capesController");
const namesController = require("../controllers/namesController");
const nameController = require("../controllers/nameController");

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

module.exports = router;
