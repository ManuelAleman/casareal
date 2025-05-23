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

    // 1. Obtener cita con publicacion y vendedor
    const citaQuery = `
      SELECT C.vendedor, P.idPublicacion
      FROM Cita C
      INNER JOIN Publicacion P ON C.publicacion = P.idPublicacion
      WHERE C.idCita = ?
    `;

    conexion.query(citaQuery, [cita], (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'Cita no encontrada' });
      }

      const { vendedor, idPublicacion } = results[0];

      if (vendedor !== req.userId) {
        return res.status(401).json({ error: 'No tienes permisos para realizar esta acción' });
      }

      // 2. Insertar contrato
      const contratoData = {
        detalles,
        condicionPago,
        precioAcordado,
        cita,
        fechaContrato: new Date()
      };

      conexion.query('INSERT INTO Contrato SET ?', contratoData, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: 'Error al generar el contrato' });
        }

        // 3. Actualizar estado de la publicación
        conexion.query('UPDATE Publicacion SET estatus = ? WHERE idPublicacion = ?', ['Contrato Generado', idPublicacion], (error) => {
          if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Contrato creado, pero error al actualizar la publicación' });
          }

          return res.status(200).json({ message: 'Contrato generado y publicación actualizada' });
        });
      });
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Server error' });
  }
}


module.exports = {
  getContratos,
  generarContrato
}