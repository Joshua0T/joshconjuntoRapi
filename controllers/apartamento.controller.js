const { Apartamento, Propietario } = require('../models');

// Obtener todos los apartamentos
const obtenerApartamentos = async (req, res) => {
    try {
        const apartamentos = await Apartamento.findAll({
            include: [{ model: Propietario }]
        });
        res.json(apartamentos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un apartamento por ID
const obtenerApartamentoPorId = async (req, res) => {
    try {
        const apartamento = await Apartamento.findByPk(req.params.id, {
            include: [{ model: Propietario }]
        });
        if (apartamento) {
            res.json(apartamento);
        } else {
            res.status(404).json({ message: 'Apartamento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un apartamento
const crearApartamento = async (req, res) => {
    try {
        const apartamento = await Apartamento.create(req.body);
        res.status(201).json(apartamento);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un apartamento
const actualizarApartamento = async (req, res) => {
    try {
        const apartamento = await Apartamento.findByPk(req.params.id);
        if (apartamento) {
            await apartamento.update(req.body);
            res.json(apartamento);
        } else {
            res.status(404).json({ message: 'Apartamento no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un apartamento
const eliminarApartamento = async (req, res) => {
    try {
        const apartamento = await Apartamento.findByPk(req.params.id);
        if (apartamento) {
            await apartamento.destroy();
            res.json({ message: 'Apartamento eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Apartamento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    obtenerApartamentos,
    obtenerApartamentoPorId,
    crearApartamento,
    actualizarApartamento,
    eliminarApartamento
};
