const Product = require('../../model/product');
const {StatusCodes} = require('http-status-codes');

const getUserProducts = async (req,res)=>{
    const {page, sortBy, price} = req.query;
    const noOfPage = Number(page) || 1, limit = 4;

    const queryObeject = {ownedBy: {$eq: req.userID}};
    if(price){
        queryObeject.price = {$lte : Number(price)};
    }

    const products = Product.find(queryObeject);
    if(sortBy){
        products.sort(sortBy)
    }
    
    products.skip((noOfPage-1)*limit).limit(limit);

    const finalResult = await products;

    res.status(StatusCodes.OK).json({
        results: finalResult
    });
}

module.exports = getUserProducts;