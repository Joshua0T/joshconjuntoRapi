"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    // Hashear la contraseña antes de insertarla
    const hashedPassword = await bcrypt.hash("admin123", 10);

    return queryInterface.bulkInsert("Usuarios", [
      {
        nombres: "Administrador",
        documentoIdentidad:"12345678",
        nombreDeUsuario: "admin",
        password: hashedPassword,
        rol: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Usuarios", { nombreDeUsuario: "admin" });
  },
};
