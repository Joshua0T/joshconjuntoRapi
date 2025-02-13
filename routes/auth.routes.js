const express = require('express');
const router = express.Router();
const { register, login, logout, check } = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', verifyToken, logout);
router.get('/check', verifyToken, check); // Nueva ruta para verificar autenticación

module.exports = router;
