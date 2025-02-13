const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const usuarioRoutes = require("./routes/usuario.routes");
const propietarioRoutes = require("./routes/propietario.routes");
const apartamentoRoutes = require("./routes/apartamento.routes");
const visitanteRoutes = require("./routes/visitante.routes");
const pagoRoutes = require("./routes/pago.routes");
const informeRoutes = require("./routes/informe.routes");
const db = require("./models");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);


//Midlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/propietarios", propietarioRoutes);
app.use("/api/apartamentos", apartamentoRoutes);
app.use("/api/visitantes", visitanteRoutes);
app.use("/api/pagos", pagoRoutes);
app.use("/api/informes", informeRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Algo salió mal!",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});


//servidor
const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
});

module.exports = app;
