const conexion = require('../../database/config.js');

const getCitasVendedor = async (req, res) => {
  try {
    if (req.userTipo !== 'vendedor') {
      return res.status(401).json({
        error: 'No tienes permisos para realizar esta acción'
      });
    }

    const id = req.userId;
    conexion.query('SELECT * FROM Cita WHERE vendedor = ? ORDER BY FechaCita', [id], async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: 'Server error'
        });
      }
      return res.status(200).json(results);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Server error'
    });
  }
}

const getCitasComprador = async (req, res) => {
  try {

    const id = req.userId;
    conexion.query('SELECT * FROM Cita WHERE comprador = ? ORDER BY FechaCita', [id], async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: 'Server error'
        });
      }
      return res.status(200).json(results);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Server error'
    });
  }

}

const generarCita = async (req, res) => {
  try {

    const id = req.userId;
    conexion.query('SELECT nombre,telefono,correo FROM Usuario WHERE idUsuario = ?', [id], async (error, results) => {
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

      const { fecha, publicacion, vendedor } = req.body;
      conexion.query('INSERT INTO Cita SET ?', { fechaCita: fecha, publicacion, comprador: id, vendedor, estatus: "En espera" }, async (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            error: 'Server error'
          });
        }
        return res.status(201).json({
          message: 'Cita generada con éxito'
        });
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Server error'
    });
  }
}

const aceptarCita = async (req, res) => {
  try {
    if (req.userTipo !== 'vendedor') {
      return res.status(401).json({
        error: 'No tienes permisos para realizar esta acción'
      });
    }

    const id = req.params.id;
    conexion.query('UPDATE Cita SET estatus = "Aceptada" WHERE idCita = ?', [id], async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: 'Server error'
        });
      }
      return res.status(200).json({
        message: 'Cita aceptada con éxito'
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Server error'
    });
  }
}

const rechazarCita = async (req, res) => {
  try {
    if (req.userTipo !== 'vendedor') {
      return res.status(401).json({
        error: 'No tienes permisos para realizar esta acción'
      });
    }

    const id = req.params.id;
    conexion.query('UPDATE Cita SET estatus = "Rechazada" WHERE idCita = ?', [id], async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: 'Server error'
        });
      }
      return res.status(200).json({
        message: 'Cita rechazada con éxito'
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Server error'
    });
  }

}

const cancelarCita = async (req, res) => {
  try {
    if (req.userTipo !== 'vendedor' || req.userTipo !== 'user') {
      return res.status(401).json({
        error: 'No tienes permisos para realizar esta acción'
      });
    }

    const id = req.params.id;
    conexion.query('UPDATE Cita SET estatus = "Cancelada" WHERE idCita = ?', [id], async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: 'Server error'
        });
      }
      return res.status(200).json({
        message: 'Cita cancelada con éxito'
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Server error'
    });
  }
}

const getCitaById = async (req, res) => {
  try {
    const id = req.params.id;
    conexion.query('SELECT * FROM Cita WHERE idCita = ?', [id], async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: 'Server error'
        });
      }
      if (results.length === 0) {
        return res.status(404).json({
          error: 'Cita no encontrada'
        });
      }
      return res.status(200).json(results[0]);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Server error'
    });
  }
}

module.exports = {
  getCitasVendedor,
  getCitasComprador,
  generarCita,
  aceptarCita,
  rechazarCita,
  cancelarCita,
  getCitaById
};