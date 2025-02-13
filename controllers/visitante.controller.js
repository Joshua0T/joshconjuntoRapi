const { Visitante, Apartamento } = require('../models');

// Obtener todos los visitantes
const obtenerVisitantes = async (req, res) => {
    try {
        const visitantes = await Visitante.findAll({
            include: [{ model: Apartamento }]
        });
        res.json(visitantes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un visitante por ID
const obtenerVisitantePorId = async (req, res) => {
    try {
        const visitante = await Visitante.findByPk(req.params.id, {
            include: [{ model: Apartamento }]
        });
        if (visitante) {
            res.json(visitante);
        } else {
            res.status(404).json({ message: 'Visitante no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un visitante
const crearVisitante = async (req, res) => {
    try {
        const visitante = await Visitante.create(req.body);
        res.status(201).json(visitante);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un visitante
const actualizarVisitante = async (req, res) => {
    try {
        const visitante = await Visitante.findByPk(req.params.id);
        if (visitante) {
            await visitante.update(req.body);
            res.json(visitante);
        } else {
            res.status(404).json({ message: 'Visitante no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un visitante
const eliminarVisitante = async (req, res) => {
    try {
        const visitante = await Visitante.findByPk(req.params.id);
        if (visitante) {
            await visitante.destroy();
            res.json({ message: 'Visitante eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Visitante no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    obtenerVisitantes,
    obtenerVisitantePorId,
    crearVisitante,
    actualizarVisitante,
    eliminarVisitante
};
