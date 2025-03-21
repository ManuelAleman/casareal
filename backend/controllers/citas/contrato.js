const conexion = require('../../database/config.js');

const getContratos = async (req, res) => {
  try {
    conexion.query('SELECT * FROM Contrato', async (error, results) => {
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

const generarContrato = async (req, res) => {
  try {
    if (req.userTipo !== 'vendedor') {
      return res.status(401).json({
        error: 'No tienes permisos para realizar esta acción'
      });
    }

    const {
      detalles,
      condicionPago,
      precioAcordado,
      cita
    } = req.body;

    conexion.query('SELECT vendedor FROM Cita WHERE idCita = ?', [cita], async (error, results) => {
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

      if (results[0].vendedor !== req.userId) {
        return res.status(401).json({
          error: 'No tienes permisos para realizar esta acción'
        });
      }

      conexion.query('INSERT INTO Contrato SET ?', { detalles, condicionPago, precioAcordado, cita, fechaContrato: new Date() }, async (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            error: 'Server error'
          });
        }
        return res.status(200).json({
          message: 'Contrato generado'
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

module.exports = {
  getContratos,
  generarContrato
}