import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
// import expressValidator from 'express-validator';
import productRouter from './routes/product.js';
import categoryRouter from './routes/category.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import contactRouter from './routes/contact.js';
import departmentRouter from './routes/department.js';
//******* Thêm router ebay,etsy **********************
import ebayRouter from './routes/ebay.js';
import estyRouter from './routes/esty.js';
import bankRouter from './routes/bank.js';

// ********* ROute create *****************************

import createRouter from './routes/create.js';

//********************************************************
//Config
const app = express();
dotenv.config();
app.use(morgan('dev'));
const port = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(cors());

//Middleware

// app.use(expressValidator());

//Routes

app.use('/api', productRouter); // Router product
app.use('/api', categoryRouter); // Router category
app.use('/api', authRouter);        // Router Auth
app.use('/api', userRouter);    // Router User
app.use('/api', contactRouter);  // Router Contact
app.use('/api', departmentRouter);  // Router department


//************ Lắng nghe router ebay ********************
app.use('/api', ebayRouter); 
app.use('/api', estyRouter);
app.use('/api', bankRouter);



//********************************************************

app.use('/api', createRouter);

//MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log('DB Connected'));
mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
})

//listen

app.listen(port, () => {
    console.log("Server is running in post ", port);
})