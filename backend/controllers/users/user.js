const conexion = require('../../database/config.js');

const getUser = async (req, res) => {
  try {
    const id = req.userId;
    conexion.query('SELECT idUsuario,nombre,telefono,correo,tipo FROM Usuario WHERE idUsuario = ?', [id], async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: 'Server error'
        });
      }
      if (results.length === 0) {
        return res.status(404).json({
          error: 'Usuario no encontrado'
        });
      }
      res.json(results[0]);
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: 'Server error'
    });
  }
}

const getAllUsers = async (req, res) => {
  try {
    conexion.query('SELECT idUsuario,nombre,telefono,correo,tipo FROM Usuario', async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: 'Server error'
        });
      }
      res.json(results);
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: 'Server error'
    });
  }
}

const getUserById = async (req, res) => {
  try {
    const userId = req.params.user_id;
    conexion.query('SELECT nombre,telefono,correo,tipo FROM Usuario WHERE idUsuario = ?', [userId], async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: 'Server error'
        });
      }
      if (results.length === 0) {
        return res.status(404).json({
          error: 'Usuario no encontrado'
        });
      }
      res.json(results[0]);
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: 'Server error'
    });
  }
}

const getVendedores = async (req, res) => {
  try {
    conexion.query('SELECT idUsuario,nombre,telefono,correo FROM Usuario WHERE tipo = "vendedor"', async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: 'Server error'
        });
      }
      res.json(results);
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: 'Server error'
    });
  }

}

module.exports = {
  getUser,
  getUserById,
  getAllUsers,
  getVendedores
}