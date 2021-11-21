const multer = require('multer');
const multerConfig = require('../utils/multerConfig');

const ProductModel = require('../models/ProductModel');

const upload = multer(multerConfig).single('image');

exports.fileUpload = (req, res, next) => {
    upload(req, res, function(error){
        if(error){
            res.json({ message: error });
        }
        return next();
    });
};

// Action: Create Product
exports.add = async (req, res) => {
    const product = new ProductModel(req.body);
    try {
        if(req.file && req.file.filename){
            product.image = req.file.filename;
        }
        await product.save();
        res.json({ message: 'Nuevo producto agregado!' });
    } catch (error) {
        if(error.code === 11000){
            res.status(400).json({
                message: `Ya existe un producto con el codigo: ${req.body.sku}`
            });
        } else {
            res.status(400).json({
                message: `Error al procesar la petición ${error}`
            });
        }
    }
};

// Action: Index - List Products
exports.list = async (req, res) => {
    try {
        const products = await ProductModel.find({});
        res.json(products);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }    
};

exports.show = async (req, res, next) => {
    try {
        console.log(req.params);
        const product = await ProductModel.findById(req.params.id);
        if (!resProduct){
            res.status(404).json({
                message: 'El producto no existe'
            });
        }
        res.json(resProduct);
    } catch (error) {
        res.status(400).json({
            message: `Error al procesar la petición ${error}`
        });
    }
};

// Action: Index - buscar producto por id
exports.show = async (req, res, next) => {
    try {
        console.log(req.params);

        const resProduct = await ProductModel.find({sku:req.params.sku});

        //const product = await ProductModel.findById(req.params.id);
        if (!resProduct){
            res.status(404).json({
                message: 'El producto no existe'
            });
        }
        res.json(resProduct);
    } catch (error) {
        res.status(400).json({
            message: `Error al procesar la petición ${error}`
        });
    }
};

// Action: Update product
exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        let newProduct = req.body;
        if(req.file && req.file.filename){
            newProduct.image = req.file.filename;
        } else {
            const product = await ProductModel.findById(id);
            newProduct.image = product.image;
        }
        const productUpdate = await ProductModel.findOneAndUpdate(
            { _id: id },
            newProduct,
            { new: true }
        );
        res.json({
            message: 'Producto actualizado correctamente!',
            producto: productUpdate
        });
    } catch (error) {
        res.status(400).json({
            message: `Error al procesar la petición ${error}`
        });
    }
};

// Action: Delete product
exports.delete = async (req, res, next) => {
    try {
        await ProductModel.findByIdAndDelete({ _id: req.params.id });
        res.json({ message: 'El producto ha sido eliminado' });
    } catch (error) {
        res.status(400).json({
            message: `Error al procesar la petición ${error}`
        });
    }
};