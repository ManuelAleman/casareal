const conexion = require('../../database/config.js');

const getPostPorAutorizar = async (req, res) => {

  try {
    conexion.query(`SELECT P.idPublicacion, F.fotoURL, Us.nombre
FROM Publicacion P
INNER JOIN Propiedad PR ON P.propiedad = PR.idPropiedad
INNER JOIN Usuario Us ON Us.idUsuario = P.publicador
INNER JOIN Foto F ON PR.idPropiedad = F.propiedad AND F.lugar = 'Principal'
WHERE P.estatus = 'En Autorizacion'`, async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: 'Server error'
        });
      }

      res.status(200).json({
        publicaciones: results
      });
    });

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: 'Server error'
    });
  }
}

const getPostPorAsignar = async (req, res) => {
  try {
    conexion.query('SELECT P.idPublicacion, F.fotoURL, Us.nombre FROM Publicacion P INNER JOIN Propiedad PR ON P.propiedad = PR.idPropiedad INNER JOIN Usuario Us ON Us.idUsuario = P.publicador INNER JOIN Foto F ON PR.idPropiedad = F.propiedad AND F.lugar = "Principal" WHERE P.estatus = "Busca Vendedor"', async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: 'Server error'
        });
      }

      res.status(200).json({
        publicaciones: results
      });
    });

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: 'Server error'
    });
  }
}

const autorizarPost = async (req, res) => {
  const { id } = req.params;
  const idUser = req.userId;

  if (req.userTipo !== 'admin') {
    return res.status(401).json({
      error: 'No tienes permisos para realizar esta acción'
    });
  }

  try {
    conexion.query('SELECT autorizador FROM Publicacion WHERE idPublicacion = ?', [id], async (error, results) => {
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

      if (results[0].autorizador !== null) {
        return res.status(400).json({
          error: 'Publicacion ya autorizada'
        });
      }

      conexion.query('UPDATE Publicacion SET estatus = "Activa", autorizador = ? WHERE idPublicacion = ?', [idUser, id], async (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            error: 'Server error'
          });
        }

        res.status(200).json({
          message: 'Publicacion autorizada'
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

const rechazarPost = async (req, res) => {
  const { id } = req.params;
  const idUser = req.userId;

  if (req.userTipo !== 'admin') {
    return res.status(401).json({
      error: 'No tienes permisos para realizar esta acción'
    });
  }

  try {
    conexion.query('SELECT autorizador FROM Publicacion WHERE idPublicacion = ?', [id], async (error, results) => {
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

      if (results[0].autorizador !== null) {
        return res.status(400).json({
          error: 'Publicacion ya autorizada'
        });
      }

      conexion.query('UPDATE Publicacion SET estatus = "Rechazada", autorizador = ? WHERE idPublicacion = ?', [idUser, id], async (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            error: 'Server error'
          });
        }

        res.status(200).json({
          message: 'Publicacion rechazada'
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

const asignarVendedor = async (req, res) => {
  const { id } = req.params;
  const { vendedor } = req.body;
  const idUser = req.userId;

  console.log(vendedor);

  if (req.userTipo !== 'admin') {
    return res.status(401).json({
      error: 'No tienes permisos para realizar esta acción'
    });
  }

  try {
    conexion.query('SELECT autorizador FROM Publicacion WHERE idPublicacion = ?', [id], async (error, results) => {
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

      if (results[0].autorizador === null) {
        return res.status(400).json({
          error: 'Publicacion no autorizada'
        });
      }

      conexion.query('SELECT idUsuario FROM Usuario WHERE idUsuario = ?', [vendedor], async (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            error: 'Server error'
          });
        }

        if (results.length === 0) {
          return res.status(404).json({
            error: 'Vendedor no encontrado'
          });
        }
        conexion.query("UPDATE Publicacion SET vendedor = ?, estatus = 'Activa' WHERE idPublicacion = ?", [vendedor, id], async (error, results) => {
          if (error) {
            console.log(error);
            return res.status(500).json({
              error: 'Server error'
            });
          }

          res.status(200).json({
            message: 'Vendedor asignado'
          });
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

module.exports = {
  autorizarPost,
  rechazarPost,
  asignarVendedor,
  getPostPorAutorizar,
  getPostPorAsignar
};