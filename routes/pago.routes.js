const express = require("express");
const router = express.Router();
const pagoController = require("../controllers/pago.controller");
const { verifyToken } = require("../middleware/auth.middleware");


//rutas protegidas para acceder con autenticacion de jwt
router.get("/", verifyToken, pagoController.obtenerPagos);
router.get("/:id", verifyToken, pagoController.obtenerPagoPorId);
router.post("/", verifyToken, pagoController.crearPago);
router.put("/:id", verifyToken, pagoController.actualizarPago);
router.delete("/:id", verifyToken, pagoController.eliminarPago);

module.exports = router;
