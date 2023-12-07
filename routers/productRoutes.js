const express = require('express');
const router = express.Router();

const getAllProducts = require('../controllers/productControllers/getAllProducts');
const getSingleProduct = require('../controllers/productControllers/getSingleProduct');

router.route('/').get(getAllProducts);
router.route('/:productId').get(getSingleProduct);

module.exports = router;