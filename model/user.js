const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        maxlength: [50, 'Name should be 50 characters long']
    },
    emailId:{
        type: String,
        required: [true, 'Please provide your email Id'],
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Please provide a password']
    },
    profileImage : {
        type: String,
        default: 'profile-image.jpg'
    },
    userCredit:{
        type: Number,
        default: 0
    }
});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    next();
});

module.exports = mongoose.model('User', userSchema);