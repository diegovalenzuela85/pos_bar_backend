const mongoose = require('mongoose');

const { Schema } = mongoose; // const Schema = mongoose.Schema

const ProductSchema = new Schema({ 
    sku: {
        type: String,
        trim: true,
        unique: true,
        uppercase: true
    },      
    categoria_producto: { 
        type: String, trim: true, 
        required: [true, 'La categoria es requerida para crear un producto'] 
    },
    nombre_producto: { 
        type: String, 
        trim: true, 
        required: [true, 'El nombre del producto es requerido'] 
    },
    image: { 
        type: String,
    },
    estado_producto: { 
        type: Boolean, 
        default: true 
    },
    precio_compra_producto: { 
        type: Number
    },
    precio_venta_producto: { 
        type: Number
    },
    fecha_creacion: {type: Date,
         default: Date.now, 
         trim: true 
        }
});

module.exports = mongoose.model('products', ProductSchema); 
// Primer parametro es el nombre de la colección y como va quedar el modelo
// Segundo parametro nombre Schema