// Import model
import Mail from "../models/mail";
import Ebay from "../models/ebay";
import Device from "../models/device";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";
import moment, { now } from "moment";

// Update dữ liệu từ mail_info ( đang gặp vấn đề quyền nhân viên uodate thì nhiều field bị rỗng)
export const update = (req, res) => {
  const data = req.headers["x-access-token"] || req.headers["authorization"];
  let users_name = "";
  const token = data.split(" ");
  if (!token) {
    users_name = "";
  }
  const decoded = jwt.verify(token[1], "duy");
  Users.findOne({ _id: decoded._id }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Đã Lỗi",
      });
    }
    if (!user) {
      users_name = "";
    }
    users_name = user.users_name;
    //update
    req.body.forEach((item) => {
      var mail_id = item.mail_id;
      var dataMail = item;

      dataMail.mail_class = "Lớp 1";
      //dataMail.mail_password = item.mail_password_new;
      dataMail.mail_feedback = item.mail_password;
      dataMail.mail_password = item.mail_password_new;
      dataMail.maildate_nextclass = moment().format("YYYY-MM-DD HH:mm");

      if (dataMail.mail_history) {
        dataMail.mail_history =
          users_name +
          "|" +
          moment().format("YYYY-MM-DD HH:mm") +
          "|" +
          dataMail.mail_class +
          "," +
          dataMail.mail_history;
      } else {
        dataMail.mail_history =
          users_name +
          "|" +
          moment().format("YYYY-MM-DD HH:mm") +
          "|" +
          dataMail.mail_class +
          ",";
      }

      for (const key in dataMail) {
        if (dataMail[key] == "") {
          delete dataMail[key];
        }
      }
      Mail.findOneAndUpdate(
        { mail_id: mail_id },
        { $set: dataMail },
        { useFindAndModify: false },
        (err, mail) => {
          if (err) {
            console.log(err);
            return res.status(400).json({
              error: "Bạn không được phép thực hiện hành động này",
            });
          }
        }
      );

      var dataebay = {};

      dataebay.ebay_class = "Lớp 1";
      dataebay.ebay_password = item.mail_password_new;
      dataebay.ebaydate_nextclass = moment().format("YYYY-MM-DD HH:mm");
      dataebay.ebaydate_start = moment().format("YYYY-MM-DD HH:mm");
      dataebay.ebaydate_verify = moment().format("YYYY-MM-DD HH:mm");
      if (dataebay.ebay_history) {
        dataebay.ebay_history =
          users_name +
          "|" +
          moment().format("YYYY-MM-DD HH:mm") +
          "|" +
          dataebay.ebay_class +
          "," +
          dataebay.ebay_history;
      } else {
        dataebay.ebay_history =
          users_name +
          "|" +
          moment().format("YYYY-MM-DD HH:mm") +
          "|" +
          dataebay.ebay_class +
          ",";
      }

      // update Ebay
      Ebay.findOneAndUpdate(
        { ebay_id: mail_id },
        { $set: dataebay },
        { useFindAndModify: false },
        (err, mail) => {
          if (err) {
            console.log(err);
            return;
          }
        }
      );

      var datadevice = {};
      datadevice.device_password = req.body[0].mail_password_new;
      datadevice.device_user = req.body[0].mail_user;
      datadevice.device_class = "PC 1";
      datadevice.devicedate_nextclass = moment().format("YYYY-MM-DD HH:mm");
      datadevice.devicedate_start = moment().format("YYYY-MM-DD HH:mm");
      datadevice.devicedate_verify = moment().format("YYYY-MM-DD HH:mm");
      // update Ebay
      Device.findOneAndUpdate(
        { device_id: mail_id },
        { $set: datadevice },
        { useFindAndModify: false },
        (err, mail) => {
          if (err) {
            console.log(err);
            return;
          }
        }
      );

    });

    
      
  });
};
