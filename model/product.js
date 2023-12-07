const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: {
        type: String,
        required: [true, 'Product Image must be provided']
    },
    price: {
        type: Number,
        required: [true, 'Product Price must be provided']
    },
    ownedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Products', productSchema);