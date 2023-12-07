const Product = require('../../model/product');
const {StatusCodes} = require('http-status-codes');

const getSingleProduct = async (req, res)=>{
    const {productId} = req.params;
    const product = await Product.findOne({_id: productId});
    res.status(StatusCodes.OK).json(product);
}

module.exports = getSingleProduct;