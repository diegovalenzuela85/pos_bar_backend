const { check } = require('express-validator');
const { validateResult } = require('..//helpers/validateHelper');

const validateCreate = [
    check('document', 'Debe ingresar el documento').exists().notEmpty(),
    check('document', 'Solo se aceptan valores numericos para el documento').isNumeric(),
    check('name', 'Debe ingresar el nombre del usuario').exists().notEmpty(),
    check('name', 'Solo se aceptan letras').isString(),
    check('lastname', 'Debe ingresar el apellido del usuario').exists().notEmpty(),
    check('lastname', 'Solo se aceptan letras').isString(),
    check('email', 'Debe ingresar correo electronico').exists().not().isEmpty(),
    check('email', 'El email no tien formato valido').isEmail(),
    check('phone', 'Solo se aceptan valores numericos').exists().isNumeric(),
    check('username', 'Debe ingresar el username').exists().notEmpty(),
    check('password', 'Debe ingresar el password').exists().notEmpty(),
    check('password', 'La contraseña debe tener minimo 8 caracteres').isLength( { min: 8 } ),
    (req, res, next) => {
        validateResult(req, res, next) 
    }
];
//TODO: document, name, lastname, email, phone, username, password
module.exports = { validateCreate };