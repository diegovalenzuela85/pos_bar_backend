const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const userController = require('../controllers/userController');

const { validateCreate } = require('../validators/user.validator');

module.exports = function(){

    // Crear producto -> post: /products
    router.post('/products', 
        productController.fileUpload, 
        productController.add
    );

    // Lista de todos los productos -> get: /products
    router.get('/products', productController.list);

    // Buscar producto por id -> get: /products/:id
    router.get('/products/:id', productController.show);

    // Buscar producto por id -> get: /products/:id
    router.get('/products/:sku', productController.show);

    // Actualizar / modificar producto por id -> put: /products/:id
    router.put('/products/:id', 
        productController.fileUpload, 
        productController.update
    );

    // Eliminar producto -> delete: /product/:id
    router.delete('/products/:id', productController.delete);
    
    // ----------------------------------------------------- //
    // Agregar usuario -> post = /users
    router.post('/users', 
    validateCreate,
    userController.add);

    // Listar todos los usuarios -> get = /users
    router.get('/users', userController.list);

    // Buscar usuario por id -> get = /users/:id
    router.get('/users/:id', userController.show);

    // Actualizar / modificar usuario por id -> put = /users/:id
    router.put('/users/:id', userController.update);

    // Eliminar usuario -> delete = /users/:id
    router.delete('/users/:id', userController.delete);

    return router;

};