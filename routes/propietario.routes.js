const express = require("express");
const router = express.Router();
const propietarioController = require("../controllers/propietario.controller");
const { verifyToken } = require("../middleware/auth.middleware");

//rutas protegidas para acceder con autenticacion de jwt
router.get("/", verifyToken, propietarioController.obtenerPropietarios);
router.get("/:id", verifyToken, propietarioController.obtenerPropietarioPorId);
router.post("/", verifyToken, propietarioController.crearPropietario);
router.put("/:id", verifyToken, propietarioController.actualizarPropietario);
router.delete("/:id", verifyToken, propietarioController.eliminarPropietario);

module.exports = router;
