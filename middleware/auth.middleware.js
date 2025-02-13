const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');


const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(403).json({ message: 'No autorizado' });
        }

        const decoded = jwt.verify(token, 'tu_jwt_secret');
        const usuario = await Usuario.findByPk(decoded.id);

        if (!usuario) {
            res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        return res.status(401).json({ message: 'Sesión inválida' });
    }
};


module.exports = { verifyToken };