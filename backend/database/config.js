require('dotenv').config();
const mysql = require('mysql2');

const conexion = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'CasaReal'
});

module.exports = conexion;
