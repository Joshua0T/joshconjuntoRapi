const { Apartamento, Propietario } = require('../models');

// Obtener todos los apartamentos
const obtenerApartamentos = async (req, res) => {
    try {
        const apartamentos = await Apartamento.findAll({ //findall para obtener los apartamentos de la base de datos
            include: [{ model: Propietario }]// info del propietario asociado al apartamento
        });
        res.json(apartamentos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un apartamento por ID
const obtenerApartamentoPorId = async (req, res) => {
    try {
        const apartamento = await Apartamento.findByPk(req.params.id, {//findBypk para buscar un apartamento por su id
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
        const apartamento = await Apartamento.create(req.body);//create req.body para insertar un nuevo apartamento con los datos enviados al body
        res.status(201).json(apartamento);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un apartamento
const actualizarApartamento = async (req, res) => {
    try {
        const apartamento = await Apartamento.findByPk(req.params.id);//findBypk para buscar el apartamento por su id
        if (apartamento) {
            await apartamento.update(req.body);// si encuentra el apartamento por su id usa el update req.body para actualizar
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
        const apartamento = await Apartamento.findByPk(req.params.id);//busca el apartamento por su id
        if (apartamento) {
            await apartamento.destroy();// si existe lo elimina
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
