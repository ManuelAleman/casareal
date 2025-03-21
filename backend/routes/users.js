const express = require('express');

const { validarJWT } = require('../middlewares/authentication');
const { registerValidator, loginValidator, checkErrors } = require('../middlewares/expressValidator');
const { registerUser, loginUser, registerVendedor, loginVendedor, registerAdmin, loginAdmin } = require('../controllers/users/login');
const { getUserById, getUser, getAllUsers, getVendedores } = require('../controllers/users/user');

const router = express.Router();

router.get('/', validarJWT, getUser);
router.get('/user/:user_id', getUserById);
router.get('/users', getAllUsers);
router.get("/vendedores", getVendedores);

router.post('/register', registerValidator, checkErrors, registerUser);
router.post('/login', loginValidator, checkErrors, loginUser);

module.exports = router;