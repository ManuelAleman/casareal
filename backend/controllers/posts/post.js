const conexion = require('../../database/config.js');

const createPost = async (req, res) => {
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

      const { calle, numeroExterior, numeroInterior, estado, ciudad, colonia, codigoPostal, referencia } = req.body;
      conexion.query('INSERT INTO Ubicacion SET ?', { calle, numeroExterior, numeroInterior, estado, ciudad, colonia, codigoPostal, referencia }, async (error2, results2) => {
        if (error2) {
          console.log(error2);
          return res.status(500).json({
            error: 'Server error'
          });
        }
        const idUbicacion = results2.insertId;
        const { titulo, descripcion, numRecamaras, numBanosCompletos, numMediosBanos, numAutos, numPisos, superficieTotal, tamPatio, anosAntiguedad, precio } = req.body;
        conexion.query('INSERT INTO Propiedad SET ?', { titulo, descripcion, numRecamaras, numBanosCompletos, numMediosBanos, numAutos, numPisos, superficieTotal, tamPatio, anosAntiguedad, precio, ubicacion: idUbicacion }, async (error3, results3) => {
          if (error3) {
            console.log(error3);
            return res.status(500).json({
              error: 'Server error'
            });
          }
          const idPropiedad = results3.insertId;
          const { fotos } = req.body;
          console.log(req.body);
          fotos.forEach(async (foto) => {
            const { fotoURL, lugar } = foto;
            conexion.query('INSERT INTO Foto SET ?', { fotoURL, lugar, propiedad: idPropiedad }, async (error4, results4) => {
              if (error4) {
                console.log(error4);
                return res.status(500).json({
                  error: 'Server error'
                });
              }



            });
          });

          const { tipo } = req.body;
          vendedor = null;
          if (req.userTipo === 'vendedor') {
            vendedor = id;
          }
          conexion.query('INSERT INTO Publicacion SET ?', { publicador: id, propiedad: idPropiedad, estatus: 'En Autorizacion', vendedor, fechaPublicacion: new Date(), tipo }, async (error5, results5) => {
            if (error5) {
              console.log(error5);
              return res.status(500).json({
                error: 'Server error'
              });
            }

            res.status(201).json({
              message: 'Publicacion creada exitosamente'
            });
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

const getMyPosts = async (req, res) => {
  try {
    const id = req.userId;
    conexion.query('SELECT * FROM Publicacion P INNER JOIN Propiedad PR ON P.propiedad = PR.idPropiedad INNER JOIN Ubicacion U ON PR.ubicacion = U.idUbicacion INNER JOIN Foto F ON PR.idPropiedad = F.propiedad AND F.lugar = "Principal" WHERE P.publicador = ?', [id], async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: 'Server error'
        });
      }


      res.status(200).json({
        posts: results
      });
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: 'Server error'
    });
  }

}

const getAllPosts = async (req, res) => {
  try {
    conexion.query("SELECT * FROM Publicacion P INNER JOIN Propiedad PR ON P.propiedad = PR.idPropiedad INNER JOIN Ubicacion U ON PR.ubicacion = U.idUbicacion INNER JOIN Foto F ON PR.idPropiedad = F.propiedad AND F.lugar = 'Principal';", async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: 'Server error'
        });
      }

      res.status(200).json({
        posts: results
      });
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: 'Server error'
    });
  }
}

const getAllPostsActive = async (req, res) => {
  try {
    conexion.query(`SELECT * 
FROM Publicacion P
INNER JOIN Propiedad PR ON P.propiedad = PR.idPropiedad
INNER JOIN Ubicacion U ON PR.ubicacion = U.idUbicacion
INNER JOIN Foto F ON PR.idPropiedad = F.propiedad AND F.lugar = 'Principal'
WHERE P.autorizador IS NOT NULL
AND (P.vendedor IS NOT NULL OR (P.vendedor IS NULL AND P.fechaPublicacion >= CURDATE() - INTERVAL 14 DAY))
AND P.estatus = 'Activa';`, async (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            error: 'Server error'
          });
        }

        res.status(200).json({
          posts: results
        });
      });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: 'Server error'
    });
  }

}

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    conexion.query("SELECT * FROM Publicacion P INNER JOIN Propiedad PR ON P.propiedad = PR.idPropiedad INNER JOIN Ubicacion U ON PR.ubicacion = U.idUbicacion INNER JOIN Foto F ON PR.idPropiedad = F.propiedad AND F.lugar = 'Principal' WHERE P.idPublicacion = ?;", [id], async (error, results) => {
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

      res.status(200).json({
        post: results[0]
      });
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: 'Server error'
    });
  }
}

const getPostsByUser = async (req, res) => {
  try {
    const { id } = req.params;
    conexion.query("SELECT * FROM Publicacion P INNER JOIN Propiedad PR ON P.propiedad = PR.idPropiedad INNER JOIN Ubicacion U ON PR.ubicacion = U.idUbicacion INNER JOIN Foto F ON PR.idPropiedad = F.propiedad AND F.lugar = 'Principal' WHERE P.publicador = ?;", [id], async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: 'Server error'
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          error: 'Publicaciones no encontradas'
        });
      }

      res.status(200).json({
        posts: results
      });
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: 'Server error'
    });
  }
}


const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (req.userTipo !== 'user' || req.userTipo !== 'admin') {
      return res.status(401).json({
        error: 'No tienes permisos para realizar esta acción'
      });
    }

    conexion.query("SELECT publicador FROM Publicacion WHERE idPublicacion = ?", [id], async (error, results) => {
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

      if (results[0].publicador !== userId || req.userTipo !== 'admin') {
        return res.status(401).json({
          error: 'No tienes permisos para realizar esta acción'
        });
      }

      conexion.query("DELETE FROM Publicacion WHERE idPublicacion = ?", [id], async (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            error: 'Server error'
          });
        }

        res.status(200).json({
          message: 'Publicacion eliminada'
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
  createPost,
  getAllPosts,
  getPostById,
  getPostsByUser,
  getMyPosts,
  getAllPostsActive,
  deletePost
}