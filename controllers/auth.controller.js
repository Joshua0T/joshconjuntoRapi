const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");
const { Op } = require("sequelize");

const JWT_SECRET = "tu_jwt_secret";

const cookieOptions = {
  httpOnly: true, // Previene acceso desde JavaScript del cliente
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 24 * 60 * 60 * 1000,
};

//Metodo de registro de usuarios
const register = async (req, res) => {
  try {
    const { nombres, documentoIdentidad, nombreDeUsuario, password, rol } =
      req.body;

    const usuarioExistente = await Usuario.findOne({
      where: {
        [Op.or]: [{ nombreDeUsuario }, { documentoIdentidad }],
      },
    });
    //verifica si el usuario ya existe
    if (usuarioExistente) {
      return res.status(400).json({
        message: "Usuario o documento de identidad ya registrado",
      });
    }

    //encripta la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    //crea un nuevo usuario
    const usuario = await Usuario.create({
      nombres,
      documentoIdentidad,
      nombreDeUsuario,
      password: hashedPassword,
      rol,
    });

    //asigna el token al usuario creado
    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, JWT_SECRET, {
      expiresIn: "24h",
    });

    //guarda el tocken del usuario en una cookie
    res.cookie("token", token, cookieOptions);

    //devuelve el usuarioy  los datos del usuario registrado
    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: {
        id: usuario.id,
        nombres: usuario.nombres,
        nombreDeUsuario: usuario.nombreDeUsuario,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//metodo login
const login = async (req, res) => {
  try {
    //toma del body de la peticion el nombreDeUsuarii y la contraseña
    const { nombreDeUsuario, password } = req.body;

    //realiza la consulta a la bdd
    const usuario = await Usuario.findOne({
      where: { nombreDeUsuario },
    });

    //si no encuentra el usuario
    if (!usuario) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    // si la contraseña no coincide
    const isValidPassword = await bcrypt.compare(password, usuario.password);

    if (!isValidPassword) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    //asigna el token al usuario que inicio sesion
    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, JWT_SECRET, {
      expiresIn: "24h",
    });

    //guarda el tocken del usuario en una cookie
    res.cookie("token", token, cookieOptions);

    //devuelve el usuario logeado y sus datos
    res.json({
      message: "Login exitoso",
      user: {
        id: usuario.id,
        nombres: usuario.nombres,
        nombreDeUsuario: usuario.nombreDeUsuario,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//elimina el tocken, guardado en la cookie para asi cerrar la sesion
const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Sesión cerrada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const check = async (req, res) => {
  try {
    // req.usuario ya está disponible gracias al middleware verifyToken
    // Devolvemos solo la información necesaria del usuario
    const userData = {
      id: req.usuario.id,
      nombres: req.usuario.nombres,
      nombreDeUsuario: req.usuario.nombreDeUsuario,
      rol: req.usuario.rol,
      // Añade aquí cualquier otro campo que necesites en el frontend
    };

    res.json({ user: userData });
  } catch (error) {
    console.error("Error en check auth:", error);
    res.status(500).json({ message: "Error al verificar la autenticación" });
  }
};

module.exports = {
  register,
  login,
  logout,
  check
};
