const express = require("express");
const router = express.Router();
const informeController = require("../controllers/informe.controller");
const { verifyToken } = require('../middleware/auth.middleware');

//rutas protegidas para acceder con autenticacion de jwt
router.get("/", verifyToken, informeController.obtenerInformes);
router.get("/:id", verifyToken, informeController.obtenerInformePorId);
router.post("/", verifyToken, informeController.crearInforme);
router.put("/:id", verifyToken, informeController.actualizarInforme);
router.delete("/:id", verifyToken, informeController.eliminarInforme);

module.exports = router;
