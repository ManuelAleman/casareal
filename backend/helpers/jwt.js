const jwt = require('jsonwebtoken');

const generarJWT = (uid, email, tipo) => {

  return new Promise((resolve, reject) => {

    const payload = { uid, email, tipo };

    jwt.sign(payload, process.env.SECRET_JWT, {
      expiresIn: '1d'
    }, (err, token) => {

      if (err) {
        console.log(err);
        reject('No se pudo generar el token');
      }

      resolve(token);

    })

  })
}

module.exports = {
  generarJWT
}