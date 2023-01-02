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

//******* Thêm router **********************
import ebayRouter from './routes/ebay.js';
import etsyRouter from './routes/etsy.js';
import shopeeRouter from './routes/shopee.js';
import amazonRouter from './routes/amazon.js';
import payoneerRouter from './routes/payoneer.js';
import paypalRouter from './routes/paypal.js';
import pingpongRouter from './routes/pingpong.js';
import bankRouter from './routes/bank.js';
import infoRouter from './routes/info.js';
import personRouter from './routes/person.js';
import mailRouter from './routes/mail.js';
import simRouter from './routes/sim.js';
import deviceRouter from './routes/device.js';
import proxyRouter from './routes/proxy.js';
import facebookRouter from './routes/facebook.js';
import tiktokRouter from './routes/tiktok.js';
import fileRouter from './routes/file.js';
import usersRouter from './routes/users.js';

import ebayorderRouter from './routes/ebayorder.js';
import etsyorderRouter from './routes/etsyorder.js';
import ebayitemRouter from './routes/ebayitem.js';
import etsyitemRouter from './routes/etsyitem.js';
import customerRouter from './routes/customer.js';
//import reportRouter from './routes/report.js';
// ********* ROute create *****************************

import createRouter from './routes/create.js';
import tooldataRouter from './routes/tooldata.js';
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


//************ Lắng nghe router ********************
app.use('/api', ebayRouter); 
app.use('/api', etsyRouter);
app.use('/api', shopeeRouter);
app.use('/api', amazonRouter);
app.use('/api', payoneerRouter);
app.use('/api', paypalRouter);
app.use('/api', pingpongRouter);
app.use('/api', bankRouter);
app.use('/api', infoRouter);
app.use('/api', personRouter);
app.use('/api', mailRouter);
app.use('/api', simRouter);
app.use('/api', deviceRouter);
app.use('/api', proxyRouter);
app.use('/api', facebookRouter);
app.use('/api', tiktokRouter);
app.use('/api', ebayorderRouter); 
app.use('/api', etsyorderRouter);
app.use('/api', ebayitemRouter); 
app.use('/api', etsyitemRouter);
app.use('/api', customerRouter);
app.use('/api', usersRouter);
app.use('/api', fileRouter);




//*************tooldata************************

app.use('/api', createRouter);
app.use('/api', tooldataRouter);

//app.use('/api', reportRouter);



//MongoDB
mongoose.connect(process.env.MONGO_USER + encodeURIComponent(process.env.MONGO_PASSWORD) + "@" + process.env.MONGO_HOST, {
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