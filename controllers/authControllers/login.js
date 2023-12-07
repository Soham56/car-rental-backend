const bcrypt = require('bcryptjs');
const User = require('../../model/user');
const {UnauthorizedError}  = require('../../errors');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const login = async (req,res)=>{
    const {userId, password} = req.body;
    if(!userId || !password) throw new UnauthorizedError('Used Does not valid');
    const user = await User.findById(userId);
    if(!user) throw new UnauthorizedError('User does not find!');
    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword) throw new UnauthorizedError('Password does not match!');

    const token = jwt.sign({name: user.name, userId: user._id}, process.env.JWT_SECREAT, {expiresIn: process.env.JWT_EXPIRESIN});

    return res.status(StatusCodes.CREATED).json({msg: "User Verified", token});
}

module.exports = login;