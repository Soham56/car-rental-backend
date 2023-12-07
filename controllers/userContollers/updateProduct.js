const Product = require('../../model/product');
const {StatusCodes} = require('http-status-codes');
const cloudinary = require('cloudinary').v2;

const updateProduct = async (req, res)=>{
    const {userID, body:{productId, price}} = req;
    const updateQuery = {};

    if(price){
        updateQuery.price = price;
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, {
        updateQuery
    });

    res.status(StatusCodes.OK).json({product: updatedProduct});
}

module.exports = updateProduct;