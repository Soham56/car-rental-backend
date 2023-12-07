const jwt = require('jsonwebtoken');
const {ForbiddenRouteError} = require('../errors');

const authenticateUser = async (req,res,next)=>{
    const authorizationHeader = req.headers.authorization;
    if(!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) throw new ForbiddenRouteError('User Not Verified');
    const token = authorizationHeader.split(' ')[1];
    const {userId} = jwt.verify(token, process.env.JWT_SECREAT);
    req.userID = userId;
    next();
}

module.exports = authenticateUser;