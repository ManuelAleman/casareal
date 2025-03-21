const conexion = require('../../database/config.js');

const getFotosByPropiedad = async (req, res) => {
  try {
    const id = req.params.id;
    conexion.query('SELECT fotoURL,lugar FROM Foto WHERE propiedad = ?', [id], async (error, results) => {
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

const subirFoto = async (req, res) => {
  try {

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: 'Server error'
    });

  }
};

module.exports = {
  getFotosByPropiedad,
  subirFoto
}