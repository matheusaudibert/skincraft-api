const express = require("express");
const profileController = require("../controllers/profileController");
const capesController = require("../controllers/capesController");

const router = express.Router();

// Rota para obter perfil completo de jogador
router.get("/user/:identifier/profile", profileController.getProfile);

// Rota para obter apenas as capas de um jogador
router.get("/user/:identifier/capes", profileController.getUserCapes);

// Nova rota para obter apenas as skins de um jogador
router.get("/user/:identifier/skins", profileController.getUserSkins);

// Rota para listar todas as capas
router.get("/capes", capesController.getAllCapes);

module.exports = router;
