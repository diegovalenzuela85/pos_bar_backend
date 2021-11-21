const UserModel = require('../models/UserModel');
const bcryptjs = require('bcryptjs');

// Crear usuario
exports.add = async (req, res, next) => {
    const user = new UserModel(req.body);
    try {
        const { document, name, lastname, email, phone, username, password } = req.body;
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
        //await user.save();
        const resUser = await UserModel.create({
            document, name, lastname, email, phone, username, password
        });
        res.json({ 
            message: 'Nuevo usuario agregado',
            data: resUser
        });
    }catch (error){
        console.log(error);
        res.send(error);
        next();
    }
};

// action -> index || list == Listar usuarios
exports.list = async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.json(users);
    }catch (error){
        console.log(error);
        res.send(error);
        next();
    }
};

// action -> leer / buscar  == Leer / buscar usuario
exports.show = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if(!user){
            res.status(404).json({
                message: 'El usuario no existe'
            });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({
            message: `Error al procesar la petición ${error}`
        });
    }
};

// action -> update || update == Actualizar usuario
exports.update = async (req, res, next) => {
    try {
        if(req.body.password){
            const salt = bcryptjs.genSaltSync();
            req.body.password = bcryptjs.hashSync(req.body.password, salt);
        }
        console.log(req.body);
        const user = await UserModel.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            {new: true}
        );
        res.json({
            message: 'Usuario actualizado correctamente',
            user
        });
    } catch (error) {
        res.status(400).json({
            message: `Error al procesar la petición ${error}`
        });
    }
};

// action -> delete || delete == Eliminar usuario
exports.delete = async (req, res, next) => {
    try {
        await UserModel.findOneAndDelete({ _id: req.params.id });
        res.json({ message: 'El usuario ha sido eliminado' });
    } catch (error) {
        res.status(400).json({
            message: `Error al procesar la petición ${error}`
        });
    }
};
