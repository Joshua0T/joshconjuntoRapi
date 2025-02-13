const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario.controller");
const { verifyToken } = require("../middleware/auth.middleware");


//rutas protegidas para acceder con autenticacion de jwt
router.get("/", verifyToken, usuarioController.obtenerUsuarios);
router.post("/", verifyToken, usuarioController.crearUsuario);
router.put("/:id", verifyToken, usuarioController.actualizarUsuario);
router.delete("/:id", verifyToken, usuarioController.eliminarUsuario);

module.exports = router;