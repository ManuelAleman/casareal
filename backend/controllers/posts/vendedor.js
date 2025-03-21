const conexion = require('../../database/config.js');

const buscarVendedor = async (req, res) => {
  const { id } = req.params;
  const idUser = req.userId;

  try {
    conexion.query('SELECT publicador,vendedor,autorizador FROM Publicacion WHERE idPublicacion = ?', [id], async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: 'Server error'
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          error: 'Publicacion no encontrada'
        });
      }

      if (results[0].publicador !== idUser) {
        return res.status(401).json({
          error: 'No tienes permisos para realizar esta acción'
        });
      }

      if (results[0].autorizador === null) {
        return res.status(400).json({
          error: 'Publicacion no autorizada'
        });
      }

      if (results[0].vendedor !== null) {
        return res.status(400).json({
          error: 'Ya se ha asignado un vendedor a esta publicacion'
        });
      }

      conexion.query('UPDATE Publicacion SET estatus = "Busca Vendedor" WHERE idPublicacion = ?', [id], async (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            error: 'Server error'
          });
        }

        res.status(200).json({
          message: 'Publicacion en busca de vendedor'
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

const getMyPostsAsignados = async (req, res) => {
  const idUser = req.userId;
  console.log(req.userTipo);
  if (req.userTipo !== 'vendedor') {
    return res.status(401).json({
      error: 'No tienes permisos para realizar esta acción'
    });
  }

  try {
    conexion.query("SELECT * FROM Publicacion P " +
      "INNER JOIN Propiedad PR ON P.propiedad = PR.idPropiedad " +
      "INNER JOIN Ubicacion U ON PR.ubicacion = U.idUbicacion " +
      "INNER JOIN Foto F ON PR.idPropiedad = F.propiedad AND F.lugar = 'Principal' " +
      "WHERE P.vendedor = ?", [idUser], async (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            error: 'Server error'
          });
        }

        res.status(200).json({
          data: results
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
  getMyPostsAsignados,
  buscarVendedor
}