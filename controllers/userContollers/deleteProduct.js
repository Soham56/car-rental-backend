const Product = require('../../model/product');
const {StatusCodes} = require('http-status-codes');

const deleteProduct = async (req, res)=>{
    const {productId} = req.params;
    const product = await Product.findByIdAndDelete({_id: productId});
    res.status(StatusCodes.OK).send('Product Deleted Successfully');
}

module.exports = deleteProduct;