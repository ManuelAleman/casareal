const express = require('express');
const { validarJWT } = require('../middlewares/authentication');
const { generarCita, rechazarCita, aceptarCita, cancelarCita, getCitasVendedor, getCitasComprador, getCitaById } = require('../controllers/citas/cita');
const { citaValidator, checkErrors, contratoValidator } = require('../middlewares/expressValidator');
const { generarContrato, getContratos } = require('../controllers/citas/contrato');

const router = express.Router();

router.get('/vendedor', validarJWT, getCitasVendedor);
router.get('/comprador', validarJWT, getCitasComprador);
router.get('/:id', getCitaById);

router.get('/contratos', getContratos);

router.post('/', validarJWT, citaValidator, checkErrors, generarCita);
router.post('/contrato', validarJWT, contratoValidator, checkErrors, generarContrato);

router.put('/aceptar/:id', validarJWT, aceptarCita);
router.put('/rechazar/:id', validarJWT, rechazarCita);
router.put('/cancelar/:id', validarJWT, cancelarCita);

module.exports = router;