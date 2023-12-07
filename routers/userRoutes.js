const express= require('express');
const router = express.Router();

const createProduct = require('../controllers/userContollers/createProduct');
const deleteProduct = require('../controllers/userContollers/deleteProduct');
const updateProduct = require('../controllers/userContollers/updateProduct');
const getUserProducts = require('../controllers/userContollers/getUserProducts');
const getUserDetails = require('../controllers/userContollers/userDetails');

router.route('/product').get(getUserProducts).post(createProduct);
router.route('/product/:productId').delete(deleteProduct).patch(updateProduct);
router.route('/:userId').get(getUserDetails);

module.exports = router;