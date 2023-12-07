const mongoose = require('mongoose');

const connectDb = (mongodbUri)=>{
    return mongoose.connect(mongodbUri);
}

module.exports = connectDb;