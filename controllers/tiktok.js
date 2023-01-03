// Import model
import Tiktok from "../models/tiktok";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";
import moment, { now } from "moment";

export const create = (req, res) => {
  const tiktok = new Tiktok(req.body);
  tiktok.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm tiktok không thành công",
      });
    }
    res.json(acc);
  });
};

export const gettiktok = (req, res) => {
  return res.json(req.tiktok);
};

// View bảng tiktok_table
export const listtiktok = (req, res) => {
  var class_name = req.query.tiktok_class;
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
    let filter_tiktok = "";
    if (class_name) {
      // "Giám đốc", "Phó Giám đốc", "Trưởng phòng" vào được tất cả các tài khoản
      if (
        ["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
          user.users_function
        ) != -1
      ) {
        filter_tiktok = {
          tiktok_class: class_name,
        };
      } else {
        // Nhân viên chỉ vào được tài khoản nhân viên đó quản lý
        var users_name_re = new RegExp("(.*)" + users_name + "(.*)");
        filter_tiktok = {
          tiktok_class: class_name,
          tiktok_employee: users_name_re,
          //tiktok_status: "Live"
        };
      }

      Tiktok.find(filter_tiktok).exec((err, tiktok) => {
        if (err || !tiktok) {
          res.status(400).json({
            message: "Không tìm thấy tiktok",
          });
        }
        // Reverse sắp xếp các tiktok theo thứ tự tạo mới nhất
        res.json(tiktok.reverse());
      });
    }
  });
};

// View bảng tiktok_info
export const tiktokByID = (req, res, next, id) => {
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
    let filter_tiktok = "";
    // "Giám đốc", "Phó Giám đốc", "Trưởng phòng" vào được tất cả các tài khoản
    if (
      ["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
        user.users_function
      ) != -1
    ) {
      Tiktok.findOne({ tiktok_id: id })
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
        .populate("amazon_id", [
          "amazon_id",
          "amazon_status",
          "amazon_class",
          "amazon_user",
          "amazon_password",
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
        .populate("ebay_id", [
          "ebay_id",
          "ebay_status",
          "ebay_class",
          "ebay_user",
          "ebay_password",
        ])
        .exec((err, tiktok) => {
          
          if (err || !tiktok) {
          
            return res.status(500);
          }

          // get list users_name từ db vào tiktok_employee
          Users.find({}, { users_name: 1, _id: 0 }).exec((err, users) => {
            users.forEach((user) => {
              userData.push(user.users_name);
            });
          });

          let newData = JSON.parse(JSON.stringify(tiktok));
          newData.listselect_tiktok_employee = userData;
          req.tiktok = newData;
          next();
        });
    } else {
      // Nhân viên chỉ vào được tài khoản nhân viên đó quản lý
      var users_name_re = new RegExp("(.*)" + users_name + "(.*)");
      filter_tiktok = {
        tiktok_id: id,
        tiktok_employee: users_name_re,
        //tiktok_status: "Live"
      };

      Tiktok.findOne(filter_tiktok)
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
      .populate("amazon_id", [
        "amazon_id",
        "amazon_status",
        "amazon_class",
        "amazon_user",
        "amazon_password",
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
      .populate("ebay_id", [
        "ebay_id",
        "ebay_status",
        "ebay_class",
        "ebay_user",
        "ebay_password",
      ])
      .exec((err, tiktok) => {
        if (err || !tiktok) {
          res.status(400).json({
            message: "Không tìm thấy tiktok",
          });
          return;
        }

        // get list users_name từ db vào tiktok_employee
        Users.find({}, { users_name: 1, _id: 0 }).exec((err, users) => {
          users.forEach((user) => {
            userData.push(user.users_name);
          });
        });
        let newData = JSON.parse(JSON.stringify(tiktok));
        newData.listselect_tiktok_employee = userData;
        req.tiktok = newData;
        next();
      });
    }
  });

  /*  // get thông tin tài nguyên
   let sim_id = "", mail_id = "",device_id="",info_id="";
    if (tiktok.list_view) {
      let list_view = tiktok.list_view.split(",");
      list_view.forEach((view) => {
        switch (view) {
          case "sim_id": {
            Sim.findOne({ sim_id: tiktok.sim_id.split('|')[0] }).exec((err, item) => {
              if (item) {
                 sim_id =
                  item.sim_id +
                  "|" +
                  item.sim_status +
                  "|" +
                  item.sim_user +
                  "|" +
                  item.sim_password;
                tiktok.sim_id = sim_id;
                req.tiktok = tiktok;
              }
            });
          }

          case "device_id": {
            Device.findOne({ device_id: tiktok.device_id }).exec((err, item) => {
              if (item) {
                 device_id =
                  item.device_id +
                  "|" +
                  item.device_status +
                  "|" +
                  item.device_user +
                  "|" +
                  item.device_password;
                tiktok.device_id = device_id;
                req.tiktok = tiktok;
              }
            });
          }
          case "info_ids": {
            Info.findOne({ info_id: tiktok.info_id }).exec((err, item) => {
              if (item) {
                 info_id =
                  item.info_id +
                  "|" +
                  item.info_status +
                  "|" +
                  item.info_fullname +
                  "|" +
                  item.info_passport;
                tiktok.info_id = info_id;
                req.tiktok = tiktok;
              }
            });
          }
          case "mail_id": {
            Mail.findOne({ mail_id: tiktok.mail_id }).exec((err, item) => {
              if (item) {
                 mail_id =
                  item.mail_id +
                  "|" +
                  item.mail_status +
                  "|" +
                  item.mail_user +
                  "|" +
                  item.mail_password;
                tiktok.mail_id = mail_id;
                req.tiktok = tiktok;
                next();
              }
            });
          }

          req.tiktok = tiktok;
          next();
        }
      });
    } else {
      req.tiktok = tiktok;
      next();
    } */
};
// Update dữ liệu từ tiktok_info ( đang gặp vấn đề quyền nhân viên uodate thì nhiều field bị rỗng)
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
    var tiktok_id = req.query.id;
    var dataTiktok = req.body;
    dataTiktok.tiktok_history =
      users_name +
      "|" +
      moment(now()).format("YYYY-MM-DD HH:mm") +
      "|" +
      dataTiktok.tiktok_class +
      "," +
      dataTiktok.tiktok_history;

    for (const key in dataTiktok) {
      if (dataTiktok[key] == "") {
        delete dataTiktok[key];
      }
    }
    Tiktok.findOneAndUpdate(
      { tiktok_id: tiktok_id },
      { $set: dataTiktok },
      { useFindAndModify: false },
      (err, tiktok) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            error: "Bạn không được phép thực hiện hành động này",
          });
        }
        res.json(tiktok);
      }
    );
  });
};
// Get count ra bảng tiktok_class
export const getCountTiktok_class = (req, res) => {
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
      Tiktok.aggregate([
        {
          $group: {
            _id: "$tiktok_class",
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
      Tiktok.aggregate([
        {
          $match: {
            tiktok_employee: users_name_re,
          },
        },
        {
          $group: {
            _id: "$tiktok_class",
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
// hàm phân quyền trong Tiktok, user phải trong phòng sản xuất và quản lý Tiktok mới view đc Tiktok

export const canViewTiktok = (req, res, next) => {
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
        user.manage_view.indexOf("tiktok_id") != -1 &&
        user.users_owner.indexOf("Phòng sản xuất") != -1 &&
        user.users_status.indexOf("Active") != -1
      ) {
        next();
      } else {
        res.status(403).json({
          error: "Không có quyền truy cập tiktok",
        });
      }
    });
  } catch (ex) {
    res.status(400).send("Token không chính xác");
  }
};
