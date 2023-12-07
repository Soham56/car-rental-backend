const User = require('../../model/user');
const {StatusCodes} = require('http-status-codes');

const userDetails = async (req, res)=>{

    const {userId} = req.params;
    const {name, emailId} = await User.findById(userId);

    const userData = {name, emailId,username:userId};

    res.status(StatusCodes.OK).json(userData);
}


module.exports = userDetails;