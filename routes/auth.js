/*
    path: api/login

*/
const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


// Post para crear un nuevo usuario
router.post('/new', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El correo es obligatorio').isEmail(),
    check('password','la contraseña es obligatorio').not().isEmpty(),
    validarCampos    
], crearUsuario );

// Post para el login
router.post('/', [
    check('email','El correo es obligatorio').isEmail(),
    check('password','la contraseña es obligatorio').not().isEmpty(),       
], login );

// validarJWT
router.get('/renew', validarJWT, renewToken);

module.exports = router;