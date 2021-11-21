const mongoose = require('mongoose');

const { Schema } = mongoose;

const salesSchema = new Schema({
    seller: {
        type: Schema.ObjectId,
        ref: 'UserModel'
    },
    products: [{
        product: {
            type: Schema.ObjectId,
            ref: 'ProductModel'
        },
        unitPrice: {
            type: Number,
        },
        quantity: {
            type: Number,
        },
        amount: {
            type: Number,
        },
    }],
    totalAmount: {
        type: Number,
    },
    payMethod: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now, 
        trim: true 
    },
    status: {
        type: Boolean,
    },
    table: {
        type: Number
    },
});

module.exports = mongoose.model('sales', salesSchema);