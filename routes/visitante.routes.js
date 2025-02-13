const express = require("express");
const router = express.Router();
const visitanteController = require("../controllers/visitante.controller");
const { verifyToken } = require("../middleware/auth.middleware");

//rutas protegidas para acceder con autenticacion de jwt
router.get("/", verifyToken, visitanteController.obtenerVisitantes);
router.get("/:id", verifyToken, visitanteController.obtenerVisitantePorId);
router.post("/", verifyToken, visitanteController.crearVisitante);
router.put("/:id", verifyToken, visitanteController.actualizarVisitante);
router.delete("/:id", verifyToken, visitanteController.eliminarVisitante);

module.exports = router;
