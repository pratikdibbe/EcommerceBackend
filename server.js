
import express from 'express'
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/newauthRoute.js';
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'
// import formidableMiddleware from 'express-formidable';
 
import cors from 'cors';

//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express()


//midlware
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))
// app.use(formidableMiddleware());


//routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoute);
app.use('/api/v1/product',productRoute);


//rest api
app.get('/',(req,res) => {
    res.send({
        message: 'Welcome to Ecom'
    })
})

 
//PoRT
const PORT = process.env.PORT || 8080


//
app.listen(PORT, () =>{
    console.log(`Server Running on the PORT NO  ${PORT}`);
})
