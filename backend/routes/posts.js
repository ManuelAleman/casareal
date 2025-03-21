const express = require('express');
const { validarJWT } = require('../middlewares/authentication');
const { createPost, getAllPosts, getPostById, getPostsByUser, getMyPosts, getAllPostsActive, deletePost } = require('../controllers/posts/post');
const { checkErrors, postValidator } = require('../middlewares/expressValidator');
const { getFotosByPropiedad, subirFoto } = require('../controllers/posts/fotos');
const { autorizarPost, rechazarPost, asignarVendedor, getPostPorAutorizar, getPostPorAsignar } = require('../controllers/posts/admin');
const { getMyPostsAsignados, buscarVendedor } = require('../controllers/posts/vendedor');
const { upload } = require('../helpers/multer');

const router = express.Router();

// Usuario
router.get('/', validarJWT, getMyPosts);
router.get('/posts/all', getAllPosts);
router.get('/posts', getAllPostsActive);
router.get('/post/:id', getPostById);
router.get('/user/:id', getPostsByUser);
router.get('/fotos/:id', getFotosByPropiedad);

//Vendedor
router.get('/vendedor/posts', validarJWT, getMyPostsAsignados);

// POST
router.post('/post', validarJWT, createPost);
router.post('/foto', validarJWT, upload.single('foto'), subirFoto);
router.put('/post/:id/solicitarVendedor', validarJWT, buscarVendedor);

// ADMIN
router.get('/admin/posts', getPostPorAutorizar);
router.get('/admin/asignar', getPostPorAsignar);
router.put('/post/:id/autorizar', validarJWT, autorizarPost);
router.put('/post/:id/rechazar', validarJWT, rechazarPost);
router.put('/post/:id/asignar', validarJWT, asignarVendedor)

//DELETE
router.delete('/post/:id', validarJWT, deletePost);

module.exports = router;