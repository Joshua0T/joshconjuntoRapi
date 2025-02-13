const express = require('express');
const router = express.Router();
const apartamentoController = require('../controllers/apartamento.controller');
const { verifyToken } = require('../middleware/auth.middleware');

//rutas protegidas para acceder con autenticacion de jwt
router.get('/', verifyToken, apartamentoController.obtenerApartamentos);
router.get('/:id', verifyToken, apartamentoController.obtenerApartamentoPorId);
router.post('/', verifyToken, apartamentoController.crearApartamento);
router.put('/:id', verifyToken, apartamentoController.actualizarApartamento);
router.delete('/:id', verifyToken, apartamentoController.eliminarApartamento);

module.exports = router;
