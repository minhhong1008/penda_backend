// Test deploy
var CronJob = require("cron").CronJob;
/* import { Avatar, Typography, message } from "antd"; */
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
// import expressValidator from 'express-validator';
import authRouter from "./routes/auth.js";
import contactRouter from "./routes/contact.js";
import departmentRouter from "./routes/department.js";

//******* Thêm router **********************
import blogRouter from "./routes/blog.js";
import ebayRouter from "./routes/ebay.js";
import etsyRouter from "./routes/etsy.js";
import shopeeRouter from "./routes/shopee.js";
import amazonRouter from "./routes/amazon.js";
import payoneerRouter from "./routes/payoneer.js";
import paypalRouter from "./routes/paypal.js";
import pingpongRouter from "./routes/pingpong.js";
import bankRouter from "./routes/bank.js";
import infoRouter from "./routes/info.js";
import projectRouter from "./routes/project.js";
import mailRouter from "./routes/mail.js";
import simRouter from "./routes/sim.js";
import deviceRouter from "./routes/device.js";
import proxyRouter from "./routes/proxy.js";
import facebookRouter from "./routes/facebook.js";
import tiktokRouter from "./routes/tiktok.js";
import fileRouter from "./routes/file.js";
import usersRouter from "./routes/users.js";

import ebayorderRouter from "./routes/ebayorder.js";
import etsyorderRouter from "./routes/etsyorder.js";
import ebayitemRouter from "./routes/ebayitem.js";
import etsyitemRouter from "./routes/etsyitem.js";
import customerRouter from "./routes/customer.js";
import salaryRouter from "./routes/salary.js";
import crawlRouter from "./routes/crawl.js";
import workRouter from "./routes/work.js";
//import reportRouter from './routes/report.js';
import autoapiRouter from "./routes/autoapi.js";
// ********* ROute create *****************************

import createRouter from "./routes/create.js";
import tooldataRouter from "./routes/tooldata.js";
//********************************************************
import billRouter from "./routes/bill.js";

// time sheet router

import timeSheetRouter from "./routes/timeSheet";
import moment from "moment";
import { time_sheet_cron } from "./cron/user_timesheet_cron.js";
import { crawl_SKU_cron, update_SKU_cron } from "./controllers/crawl.js";

//Config
const app = express();
dotenv.config();
app.use(morgan("dev"));
const port = process.env.PORT || 8000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

//Middleware

// app.use(expressValidator());

//Routes

app.use("/api", authRouter); // Router Auth
app.use("/api", contactRouter); // Router Contact
app.use("/api", departmentRouter); // Router department

//************ Lắng nghe router ********************
app.use("/api", ebayRouter);
app.use("/api", etsyRouter);
app.use("/api", shopeeRouter);
app.use("/api", amazonRouter);
app.use("/api", payoneerRouter);
app.use("/api", paypalRouter);
app.use("/api", pingpongRouter);
app.use("/api", bankRouter);
app.use("/api", infoRouter);
app.use("/api", projectRouter);
app.use("/api", mailRouter);
app.use("/api", simRouter);
app.use("/api", deviceRouter);
app.use("/api", proxyRouter);
app.use("/api", facebookRouter);
app.use("/api", tiktokRouter);
app.use("/api", ebayorderRouter);
app.use("/api", etsyorderRouter);
app.use("/api", ebayitemRouter);
app.use("/api", etsyitemRouter);
app.use("/api", customerRouter);
app.use("/api", usersRouter);
app.use("/api", fileRouter);
app.use("/api", billRouter);

app.use("/api", autoapiRouter);
//*************tooldata************************

app.use("/api", createRouter);
app.use("/api", tooldataRouter);
app.use("/api", timeSheetRouter);
app.use("/api", crawlRouter);
app.use("/api", workRouter);

app.use("/api", blogRouter);

app.use("/api", salaryRouter);
//app.use('/api', reportRouter);

//MongoDB
mongoose
  .connect(
    process.env.MONGO_DB_URL,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB Connected"));
mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

/* // Function thông báo lấy từ ant.desgin
const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

/* const [messageApi, contextHolder] = message.useMessage();

const success = (message) => {
  messageApi.open({
    type: "success",
    content: message,
  });
};

const error = (message) => {
  messageApi.open({
    type: "error",
    content: message,
  });
};

const warning = (message) => {
  messageApi.open({
    type: "warning",
    content: message,
  });
}; */

//listen

// 00 30 23 * * 0-6 => chạy lúc 23h30 hàng ngày
// '*/5 * * * * *' =? 5s 1 lần
/* var job = new CronJob(
  "* * * * * *",
  function () {
    console.log(moment().format("HH:mm:ss DD/MM/YYYY"));
    
  },
  null,
  false,
  "America/Los_Angeles"
);

job.start(); */

// time_sheet_cron.start();
// crawl_SKU_cron.start();
//update_SKU_cron.start();

app.listen(port, () => {
  console.log("Server is running in post ", port);
});
