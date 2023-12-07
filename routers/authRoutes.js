const express = require('express');
const router = express.Router();

const login = require('../controllers/authControllers/login');
const register = require('../controllers/authControllers/register');

router.route('/login').post(login);
router.route('/register').post(register);

module.exports = router;