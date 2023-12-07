const User = require('../../model/user');
const mongoose = require('mongoose');
const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');

const registerUser = async (req,res)=>{
    const user = await User.create(req.body);
    const token = jwt.sign({name: user.name, userId: user._id}, process.env.JWT_SECREAT, {expiresIn: process.env.JWT_EXPIRESIN});
    res.status(StatusCodes.CREATED).json({
        userId : user._id,token
    })
}

module.exports = registerUser;