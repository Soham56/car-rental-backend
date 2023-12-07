const Product = require('../../model/product');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError} = require('../../errors');
const path = require('path');
const {unlink} = require('fs');
const cloudinary = require('cloudinary').v2;

const createProduct = async (req, res)=>{
    const {userID, body:{price}, files} = req;
    if(!files || !files.image) throw new BadRequestError('Please give an image of the Product');

    const productImagePath = path.resolve(files.image.tempFilePath);
    const {secure_url} = await cloudinary.uploader.upload(productImagePath, {
        folder: 'car-rental-project-products'
    });
    const product = await Product.create({image:secure_url,price,ownedBy:userID});
    
    unlink(productImagePath, (err)=>{
        if(err) throw new Error("File isn't deleted");
        console.log('File Deleted Successfully');
    });

    res.status(StatusCodes.CREATED).json(product);
}

module.exports = createProduct;