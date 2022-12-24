// Để nhân file ebay.js--> amazon.js: replate ebay,Ebay thành amazon, Amazon sau đó sửa amazon_id trong populate thành lại ebay, có 2 chỗ cần sửa
import Amazon from "../models/amazon";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";
import moment, { now } from "moment";

export const create = (req, res) => {
  const amazon = new Amazon(req.body);
  amazon.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm amazon không thành công",
      });
    }
    res.json(acc);
  });
};

export const getamazon = (req, res) => {
  return res.json(req.amazon);
};

// View bảng amazon_table
export const listamazon = (req, res) => {
  var class_name = req.query.amazon_class;
  const data = req.headers["x-access-token"] || req.headers["authorization"];
  let users_name = "";
  const token = data.split(" ");
  if (!token) {
    users_name = "";
  }
  const decoded = jwt.verify(token[1], "duy");
  Users.findOne({ _id: decoded._id }).exec((err, user) => {
    if (!user) {
      users_name = "";
    }

    users_name = user.users_name;
    let filter_amazon = "";
    if (class_name) {
      // "Giám đốc", "Phó Giám đốc", "Trưởng phòng" vào được tất cả các tài khoản
      if (
        ["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
          user.users_function
        ) != -1
      ) {
        filter_amazon = {
          amazon_class: class_name,
        };
      } else {
        // Nhân viên chỉ vào được tài khoản nhân viên đó quản lý
        var users_name_re = new RegExp("(.*)" + users_name + "(.*)");
        filter_amazon = {
          amazon_class: class_name,
          amazon_employee: users_name_re,
          //amazon_status: "Live"
        };
      }

      Amazon.find(filter_amazon).exec((err, amazon) => {
        if (err || !amazon) {
          res.status(400).json({
            message: "Không tìm thấy amazon",
          });
        }
        // Reverse sắp xếp các amazon theo thứ tự tạo mới nhất
        res.json(amazon.reverse());
      });
    }
  });
};

// View bảng amazon_info
export const amazonByID = (req, res, next, id) => {
  let userData = [];
  const data = req.headers["x-access-token"] || req.headers["authorization"];
  let users_name = "";
  const token = data.split(" ");
  if (!token) {
    users_name = "";
  }
  const decoded = jwt.verify(token[1], "duy");
  Users.findOne({ _id: decoded._id }).exec((err, user) => {
    if (!user) {
      users_name = "";
    }
    users_name = user.users_name;
    let filter_amazon = "";
    // "Giám đốc", "Phó Giám đốc", "Trưởng phòng" vào được tất cả các tài khoản
    if (
      ["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
        user.users_function
      ) != -1
    ) {
      Amazon.findOne({ amazon_id: id })
        .populate("device_id", [
          "device_id",
          "device_status",
          "device_class",
          "device_user",
          "device_password",
        ])
        .populate("proxy_id", [
          "proxy_id",
          "proxy_status",
          "proxy_class",
          "proxy_user",
          "proxy_password",
        ])
        .populate("info_id", [
          "info_id",
          "info_status",
          "info_class",
          "info_fullname",
          "infodate_birthday",
        ])
        .populate("mail_id", [
          "mail_id",
          "mail_status",
          "mail_class",
          "mail_user",
          "mail_password",
        ])
        .populate("sim_id", [
          "sim_id",
          "sim_status",
          "sim_class",
          "sim_user",
          "sim_password",
        ])
        .populate("bank_id", [
          "bank_id",
          "bank_status",
          "bank_class",
          "bank_user",
          "bank_password",
        ])
        .populate("payoneer_id", [
          "payoneer_id",
          "payoneer_status",
          "payoneer_class",
          "payoneer_user",
          "payoneer_password",
        ])
        .populate("paypal_id", [
          "paypal_id",
          "paypal_status",
          "paypal_class",
          "paypal_user",
          "paypal_password",
        ])
        .populate("pingpong_id", [
          "pingpong_id",
          "pingpong_status",
          "pingpong_class",
          "pingpong_user",
          "pingpong_password",
        ])
        .populate("etsy_id", [
          "etsy_id",
          "etsy_status",
          "etsy_class",
          "etsy_user",
          "etsy_password",
        ])
        .populate("ebay_id", [
          "ebay_id",
          "ebay_status",
          "ebay_class",
          "ebay_user",
          "ebay_password",
        ])
        .populate("shopee_id", [
          "shopee_id",
          "shopee_status",
          "shopee_class",
          "shopee_user",
          "shopee_password",
        ])
        .populate("facebook_id", [
          "facebook_id",
          "facebook_status",
          "facebook_class",
          "facebook_user",
          "facebook_password",
        ])
        .populate("tiktok_id", [
          "tiktok_id",
          "tiktok_status",
          "tiktok_class",
          "tiktok_user",
          "tiktok_password",
        ])
        .exec((err, amazon) => {
          console.log("aaaaaaa");
          if (err || !amazon) {
            console.log("dddd");
            return res.status(500);
          }

          // get list users_name từ db vào amazon_employee
          Users.find({}, { users_name: 1, _id: 0 }).exec((err, users) => {
            users.forEach((user) => {
              userData.push(user.users_name);
            });
          });

          let newData = JSON.parse(JSON.stringify(amazon));
          newData.listselect_amazon_employee = userData;
          req.amazon = newData;
          next();
        });
    } else {
      // Nhân viên chỉ vào được tài khoản nhân viên đó quản lý
      var users_name_re = new RegExp("(.*)" + users_name + "(.*)");
      filter_amazon = {
        amazon_id: id,
        amazon_employee: users_name_re,
        //amazon_status: "Live"
      };

      Amazon.findOne(filter_amazon)
        .populate("device_id", [
          "device_id",
          "device_status",
          "device_class",
          "device_user",
          "device_password",
        ])
        .populate("proxy_id", [
          "proxy_id",
          "proxy_status",
          "proxy_class",
          "proxy_user",
          "proxy_password",
        ])
        .populate("info_id", [
          "info_id",
          "info_status",
          "info_class",
          "info_fullname",
          "infodate_birthday",
        ])
        .populate("mail_id", [
          "mail_id",
          "mail_status",
          "mail_class",
          "mail_user",
          "mail_password",
        ])
        .populate("sim_id", [
          "sim_id",
          "sim_status",
          "sim_class",
          "sim_user",
          "sim_password",
        ])
        .populate("bank_id", [
          "bank_id",
          "bank_status",
          "bank_class",
          "bank_user",
          "bank_password",
        ])
        .populate("payoneer_id", [
          "payoneer_id",
          "payoneer_status",
          "payoneer_class",
          "payoneer_user",
          "payoneer_password",
        ])
        .populate("paypal_id", [
          "paypal_id",
          "paypal_status",
          "paypal_class",
          "paypal_user",
          "paypal_password",
        ])
        .populate("pingpong_id", [
          "pingpong_id",
          "pingpong_status",
          "pingpong_class",
          "pingpong_user",
          "pingpong_password",
        ])
        .populate("etsy_id", [
          "etsy_id",
          "etsy_status",
          "etsy_class",
          "etsy_user",
          "etsy_password",
        ])
        .populate("ebay_id", [
          "ebay_id",
          "ebay_status",
          "ebay_class",
          "ebay_user",
          "ebay_password",
        ])
        .populate("shopee_id", [
          "shopee_id",
          "shopee_status",
          "shopee_class",
          "shopee_user",
          "shopee_password",
        ])
        .populate("facebook_id", [
          "facebook_id",
          "facebook_status",
          "facebook_class",
          "facebook_user",
          "facebook_password",
        ])
        .populate("tiktok_id", [
          "tiktok_id",
          "tiktok_status",
          "tiktok_class",
          "tiktok_user",
          "tiktok_password",
        ])
        .exec((err, amazon) => {
          if (err || !amazon) {
            res.status(400).json({
              message: "Không tìm thấy amazon",
            });
            return;
          }

          // get list users_name từ db vào amazon_employee
          Users.find({}, { users_name: 1, _id: 0 }).exec((err, users) => {
            users.forEach((user) => {
              userData.push(user.users_name);
            });
          });
          let newData = JSON.parse(JSON.stringify(amazon));
          newData.listselect_amazon_employee = userData;
          req.amazon = newData;
          next();
        });
    }
  });

  /*  // get thông tin tài nguyên
   let sim_id = "", mail_id = "",device_id="",info_id="";
    if (amazon.list_view) {
      let list_view = amazon.list_view.split(",");
      list_view.forEach((view) => {
        switch (view) {
          case "sim_id": {
            Sim.findOne({ sim_id: amazon.sim_id.split('|')[0] }).exec((err, item) => {
              if (item) {
                 sim_id =
                  item.sim_id +
                  "|" +
                  item.sim_status +
                  "|" +
                  item.sim_user +
                  "|" +
                  item.sim_password;
                amazon.sim_id = sim_id;
                req.amazon = amazon;
              }
            });
          }

          case "device_id": {
            Device.findOne({ device_id: amazon.device_id }).exec((err, item) => {
              if (item) {
                 device_id =
                  item.device_id +
                  "|" +
                  item.device_status +
                  "|" +
                  item.device_user +
                  "|" +
                  item.device_password;
                amazon.device_id = device_id;
                req.amazon = amazon;
              }
            });
          }
          case "info_ids": {
            Info.findOne({ info_id: amazon.info_id }).exec((err, item) => {
              if (item) {
                 info_id =
                  item.info_id +
                  "|" +
                  item.info_status +
                  "|" +
                  item.info_fullname +
                  "|" +
                  item.info_passport;
                amazon.info_id = info_id;
                req.amazon = amazon;
              }
            });
          }
          case "mail_id": {
            Mail.findOne({ mail_id: amazon.mail_id }).exec((err, item) => {
              if (item) {
                 mail_id =
                  item.mail_id +
                  "|" +
                  item.mail_status +
                  "|" +
                  item.mail_user +
                  "|" +
                  item.mail_password;
                amazon.mail_id = mail_id;
                req.amazon = amazon;
                next();
              }
            });
          }

          req.amazon = amazon;
          next();
        }
      });
    } else {
      req.amazon = amazon;
      next();
    } */
};
// Update dữ liệu từ amazon_info ( đang gặp vấn đề quyền nhân viên uodate thì nhiều field bị rỗng)
export const update = (req, res) => {
  const data = req.headers["x-access-token"] || req.headers["authorization"];
  let users_name = "";
  const token = data.split(" ");
  if (!token) {
    users_name = "";
  }
  const decoded = jwt.verify(token[1], "duy");
  Users.findOne({ _id: decoded._id }).exec((err, user) => {
    if (!user) {
      users_name = "";
    }
    users_name = user.users_name;
    var amazon_id = req.query.id;
    var dataAmazon = req.body;
    dataAmazon.amazon_history =
      users_name +
      "|" +
      moment(now()).format("MM-DD-YYYY HH:mm") +
      "|" +
      dataAmazon.amazon_class +
      "," +
      dataAmazon.amazon_history;

    for (const key in dataAmazon) {
      if (dataAmazon[key] == "") {
        delete dataAmazon[key];
      }
    }
    Amazon.findOneAndUpdate(
      { amazon_id: amazon_id },
      { $set: dataAmazon },
      { useFindAndModify: false },
      (err, amazon) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            error: "Bạn không được phép thực hiện hành động này",
          });
        }
        res.json(amazon);
      }
    );
  });
};
// Get count ra bảng amazon_class
export const getCountAmazon_class = (req, res) => {
  const data = req.headers["x-access-token"] || req.headers["authorization"];
  let users_name = "";
  const token = data.split(" ");
  if (!token) {
    users_name = "";
  }
  const decoded = jwt.verify(token[1], "duy");
  Users.findOne({ _id: decoded._id }).exec((err, user) => {
    if (!user) {
      users_name = "";
    }
    users_name = user.users_name;
    var users_name_re = new RegExp("(.*)" + users_name + "(.*)");

    // "Giám đốc", "Phó Giám đốc", "Trưởng phòng" xem được tổng tài khoản
    if (
      ["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
        user.users_function
      ) != -1
    ) {
      Amazon.aggregate([
        {
          $group: {
            _id: "$amazon_class",
            count: {
              $count: {},
            },
          },
        },
      ]).exec((err, data) => {
        res.json({
          status: "success",
          data: data,
        });
      });
    } else {
      // Nhân viên chỉ xem được tổng tài khoản nhân viên đó quản lý
      Amazon.aggregate([
        {
          $match: {
            amazon_employee: users_name_re,
          },
        },
        {
          $group: {
            _id: "$amazon_class",
            count: {
              $count: {},
            },
          },
        },
      ]).exec((err, data) => {
        res.json({
          status: "success",
          data: data,
        });
      });
    }
  });
};

// ================ Middle ware====================
// hàm phân quyền trong Amazon, user phải trong phòng sản xuất và quản lý Amazon mới view đc Amazon

export const canViewAmazon = (req, res, next) => {
  const data = req.headers["x-access-token"] || req.headers["authorization"];
  const token = data.split(" ");
  if (!token) {
    return res.status(401).send("Bạn chưa đăng nhập, không tồn tại token");
  }
  try {
    const decoded = jwt.verify(token[1], "duy");
    Users.findOne({ _id: decoded._id }).exec((err, user) => {
      if (!user) {
        return res.status(403).json({
          error: "Bạn chưa đăng nhập",
        });
      }
      if (
        user.manage_view.indexOf("amazon_id") != -1 &&
        user.users_owner.indexOf("Phòng sản xuất") != -1 &&
        user.users_status.indexOf("Active") != -1
      ) {
        next();
      } else {
        res.status(403).json({
          error: "Không có quyền truy cập amazon",
        });
      }
    });
  } catch (ex) {
    res.status(400).send("Token không chính xác");
  }
};
