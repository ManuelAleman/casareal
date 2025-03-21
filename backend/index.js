const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();

// CORS
app.use(cors());

// Directorio Publico
app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json());

//Rutas
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/citas", require("./routes/citas"));

// Abrir servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT || 4000}`);
})