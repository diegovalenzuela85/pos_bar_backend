const mongoose = require('mongoose');

const { Schema } = mongoose;

const usersSchema = new Schema({
    document: {
        type: Number,
        trim: true,
        unique: [ true, 'El documento ya existe en el sistema' ],
        required: [ true, 'El documento es requerido' ]
    },
    name: {
        type: String,
        trim: true,
        required: [ true, 'El nombre es requerido' ]
    },
    lastname: {
        type: String,
        trim: true,
        required: [ true, 'El apellido es requerido' ]
    },
    email: {
        type: String,
        trim: true,
        unique: [ true, 'El email ingresado ya se encuentra en el sistema' ],
        lowercase: true,
        required: [ true, 'El email es requerido' ]
    },
    phone: {
        type: Number,
        trim: true,
        required: [ true, 'El telefono es requerido' ]
    },
    username: {
        type: String,
        trim: true,
        unique: [ true, 'El username ya se encuentra en el sistema' ],
        required: [ true, 'El username es requerido' ]
    },
    password: {
        type: String,
        trim: true,
        required: [ true, 'El password es requerido' ]
    },
    user_status: { 
        type: Boolean, 
        default: true 
    },
    fecha_creacion: {
        type: Date,
        default: Date.now, 
        trim: true 
    }
});

module.exports = mongoose.model('users', usersSchema);