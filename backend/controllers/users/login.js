const conexion = require('../../database/config.js');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../../helpers/jwt')

const loginUser = async (req, res) => {
  console.log('Login user');
  try {
    const { email, password } = req.body;
    conexion.query('SELECT * FROM Usuario WHERE correo = ?', [email], async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: 'Server error'
        });
      }
      if (results.length === 0) {
        return res.status(404).json({
          error: 'Email o contraseña incorrecto'
        });
      }
      const validPassword = await bcrypt.compare(password, results[0].contrasena);
      if (!validPassword) {
        return res.status(404).json({
          error: 'Email o contraseña incorrecto'
        });
      }
      const token = await generarJWT(results[0].idUsuario, email, results[0].tipo);
      res.json({
        id: results[0].idUsuario,
        email,
        token
      });
    });

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: 'Server error'
    });
  }
}

const registerUser = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    conexion.query('SELECT * FROM Usuario WHERE correo = ?', [email], async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: 'Server error'
        });
      }
      if (results.length > 0) {
        return res.status(400).json({
          error: 'El email ya ha sido utilizado'
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      conexion.query('INSERT INTO Usuario SET ?', { nombre: name, telefono: phone, correo: email, contrasena: hashedPassword, tipo: 'user' }, async (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            error: 'Server error'
          });
        }
        const token = await generarJWT(results.insertId, email, 'user');
        res.status(201).json({
          id: results.insertId,
          email,
          token
        });
      });
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: 'Server error'
    });
  }
}

const registerAdmin = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    conexion.query('SELECT * FROM Administrador WHERE correo = ?', [email], async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: 'Server error'
        });
      }
      if (results.length > 0) {
        return res.status(400).json({
          error: 'El email ya ha sido utilizado'
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      conexion.query('INSERT INTO Administrador SET ?', { nombre: name, telefono: phone, correo: email, contrasena: hashedPassword }, async (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            error: 'Server error'
          });
        }
        const token = await generarJWT(results.insertId, email, 'admin');
        res.status(201).json({
          id: results.insertId,
          email,
          token
        });
      });
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: 'Server error'
    });
  }
}

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    conexion.query('SELECT * FROM Administrador WHERE correo = ?', [email], async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: 'Server error'
        });
      }
      if (results.length === 0) {
        return res.status(404).json({
          error: 'Email o contraseña incorrecto'
        });
      }
      const validPassword = await bcrypt.compare(password, results[0].contrasena);
      if (!validPassword) {
        return res.status(404).json({
          error: 'Email o contraseña incorrecto'
        });
      }
      const token = await generarJWT(results[0].idAdministrador, email, 'admin');
      res.json({
        id: results[0].idAdministrador,
        email,
        token
      });
    });

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: 'Server error'
    });
  }
}

const registerVendedor = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    conexion.query('SELECT * FROM Vendedor WHERE correo = ?', [email], async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: 'Server error'
        });
      }
      if (results.length > 0) {
        return res.status(400).json({
          error: 'El email ya ha sido utilizado'
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      conexion.query('INSERT INTO Vendedor SET ?', { nombre: name, telefono: phone, correo: email, contrasena: hashedPassword }, async (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            error: 'Server error'
          });
        }
        const token = await generarJWT(results.insertId, email, 'vendedor');
        res.status(201).json({
          id: results.insertId,
          email,
          token
        });
      });
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: 'Server error'
    });
  }
}

const loginVendedor = async (req, res) => {
  try {
    const { email, password } = req.body;
    conexion.query('SELECT * FROM Vendedor WHERE correo = ?', [email], async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: 'Server error'
        });
      }
      if (results.length === 0) {
        return res.status(404).json({
          error: 'Email o contraseña incorrecto'
        });
      }
      const validPassword = await bcrypt.compare(password, results[0].contrasena);
      if (!validPassword) {
        return res.status(404).json({
          error: 'Email o contraseña incorrecto'
        });
      }
      const token = await generarJWT(results[0].idVendedor, email, 'vendedor');
      res.json({
        id: results[0].idVendedor,
        email,
        token
      });
    });

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: 'Server error'
    });
  }
}

module.exports = {
  loginUser,
  registerUser,
  registerAdmin,
  loginAdmin,
  registerVendedor,
  loginVendedor
}