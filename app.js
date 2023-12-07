require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cloudinary = require('cloudinary').v2;
const expressFileUpload = require('express-fileupload');
const cors = require('cors');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECREAT
});

const app = express();
const PORT = process.env.PORT || 3000;

const connectDb = require('./db/connectDb');

const authRoutes = require('./routers/authRoutes');
const productRoutes = require('./routers/productRoutes');
const userRoutes = require('./routers/userRoutes');
const authenticateUserMiddleware = require('./middlewares/authenticateUser');
const errorHandlerMiddleware = require('./middlewares/errorHandler');
const routeNotFoundMiddleware = require('./middlewares/notFoundRoute');

app.use(express.json());
app.use(cors());
app.use(expressFileUpload({useTempFiles: true}));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', [authenticateUserMiddleware,productRoutes]);
app.use('/api/v1/user', [authenticateUserMiddleware,userRoutes]);
app.use(routeNotFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async ()=>{
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(PORT, ()=>{
            console.log(`Server is listening on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();