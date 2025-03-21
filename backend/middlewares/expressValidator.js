const { check, validationResult } = require('express-validator');

const registerValidator = [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'El email es obligatorio').isEmail(),
  check('phone', 'El telefono es obligatorio').isMobilePhone(),
  check("password", "La contraseña necesita mas de 6 letras y menos de 20 letras").isLength({ min: 6, max: 30 }),
];

const loginValidator = [
  check('email', 'El email es obligatorio').isEmail(),
  check("password", "La contraseña necesita mas de 6 letras y menos de 20 letras").isLength({ min: 6, max: 20 }),
];

const postValidator = [
  check('titulo', "El titulo es obligatorio").not().isEmpty(),
  check('descripcion', "La descripcion es obligatoria").not().isEmpty(),
  check('numRecamaras', "El numero de recamaras es obligatorio").not().isEmpty(),
  check('numBanosCompletos', "El numero de baños es obligatorio").not().isEmpty(),
  check('numMediosBanos', "El numero de baños medio es obligatorio").not().isEmpty(),
  check('numAutos', "El numero de estacionamientos es obligatorio").not().isEmpty(),
  check('numPisos', "El numero de pisos es obligatorio").not().isEmpty(),
  check('superficieTotal', "La superficie es obligatoria").not().isEmpty(),
  check('tamPatio', "El tamaño del patio es obligatorio").not().isEmpty(),
  check('anosAntiguedad', "Los años de antiguedad son obligatorios").not().isEmpty(),
  check('precio', "El precio es obligatorio").not().isEmpty(),

  check('titulo', "El titulo debe tener mas de 5 letras y menos de 50 letras").isLength({ min: 5, max: 50 }),
  check('descripcion', "La descripcion debe tener menos de 300 letras").isLength({ max: 300 }),
  check('numRecamaras', "El numero de recamaras debe ser un numero").isNumeric(),
  check('numBanosCompletos', "El numero de baños debe ser un numero").isNumeric(),
  check('numMediosBanos', "El numero de baños medio debe ser un numero").isNumeric(),
  check('numAutos', "El numero de estacionamientos debe ser un numero").isNumeric(),
  check('numPisos', "El numero de pisos debe ser un numero").isNumeric(),
  check('superficieTotal', "La superficie debe ser un numero").isDecimal(),
  check('tamPatio', "El tamaño del patio debe ser un numero").isDecimal(),
  check('anosAntiguedad', "Los años de antiguedad deben ser un numero").isNumeric(),
  check('precio', "El precio debe ser un numero").isDecimal(),

  check('calle', "La calle es obligatoria").not().isEmpty(),
  check('colonia', "La colonia es obligatoria").not().isEmpty(),
  check('codigoPostal', "El codigo postal es obligatorio").not().isEmpty(),
  check('ciudad', "La ciudad es obligatoria").not().isEmpty(),
  check('estado', "El estado es obligatorio").not().isEmpty(),
  check('numeroExterior', "El numero exterior es obligatorio").not().isEmpty(),

  check('codigoPostal', "El codigo postal debe tener 5 digitos").isLength({ min: 5, max: 5 }),
  check('numeroExterior', "El numero exterior debe ser un numero").isNumeric(),

  check('fotos', "Las fotos son obligatorias").not().isEmpty(),
  check('fotos', "Las fotos deben ser un arreglo").isArray(),
  check('fotos', "Las fotos deben tener al menos una foto").isLength({ min: 1 }),

  check('fotos.*.fotoURL', "La url de la foto es obligatoria").not().isEmpty(),
  check('fotos.*.lugar', "El lugar de la foto es obligatorio").not().isEmpty(),
  check('fotos.*.fotoURL', "La url de la foto debe ser una url valida").isURL(),

  check('tipo', "El tipo de publicacion es obligatorio").not().isEmpty()
];

const citaValidator = [
  check('fecha', "La fecha es obligatoria").not().isEmpty(),
  check('publicacion', "La publicacion es obligatoria").not().isEmpty(),
  check('vendedor', "El vendedor es obligatorio").not().isEmpty(),

  check('publicacion', "La publicacion debe ser un numero").isNumeric(),
  check('vendedor', "El vendedor debe ser un numero").isNumeric()
];

const contratoValidator = [
  check('detalles', "Los detalles son obligatorios").not().isEmpty(),
  check('condicionPago', "La condicion de pago es obligatoria").not().isEmpty(),
  check('precioAcordado', "El precio acordado es obligatorio").not().isEmpty(),
  check('cita', "La cita es obligatoria").not().isEmpty(),

  check('detalles', "Los detalles deben tener menos de 200 letras").isLength({ max: 200 }),
  check('condicionPago', "La condicion de pago debe tener menos de 50 letras").isLength({ max: 50 }),
  check('precioAcordado', "El precio acordado debe ser un numero").isDecimal(),
  check('cita', "La cita debe ser un numero").isNumeric()

];

const checkErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.mapped()
    });
  }
  next();
}

module.exports = {
  registerValidator,
  loginValidator,
  postValidator,
  citaValidator,
  contratoValidator,
  checkErrors
}