// Import model
import Shopee from "../models/shopee";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";
import moment, { now } from "moment";

export const create = (req, res) => {
  const shopee = new Shopee(req.body);
  shopee.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm shopee không thành công",
      });
    }
    res.json(acc);
  });
};

export const getshopee = (req, res) => {
  return res.json(req.shopee);
};

// View bảng shopee_table
export const listshopee = (req, res) => {
  var class_name = req.query.shopee_class;
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
    let filter_shopee = "";
    if (class_name) {
      // "Giám đốc", "Phó Giám đốc", "Trưởng phòng" vào được tất cả các tài khoản
      if (
        ["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
          user.users_function
        ) != -1
      ) {
        filter_shopee = {
          shopee_class: class_name,
        };
      } else {
        // Nhân viên chỉ vào được tài khoản nhân viên đó quản lý
        var users_name_re = new RegExp("(.*)" + users_name + "(.*)");
        filter_shopee = {
          shopee_class: class_name,
          shopee_employee: users_name_re,
          //shopee_status: "Live"
        };
      }

      Shopee.find(filter_shopee).exec((err, shopee) => {
        if (err || !shopee) {
          res.status(400).json({
            message: "Không tìm thấy shopee",
          });
        }
        // Reverse sắp xếp các shopee theo thứ tự tạo mới nhất
        res.json(shopee.reverse());
      });
    }
  });
};

// View bảng shopee_info
export const shopeeByID = (req, res, next, id) => {
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
    let filter_shopee = "";
    // "Giám đốc", "Phó Giám đốc", "Trưởng phòng" vào được tất cả các tài khoản
    if (
      ["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
        user.users_function
      ) != -1
    ) {
      Shopee.findOne({ shopee_id: id })
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
        .populate("ebay_id", [
          "ebay_id",
          "ebay_status",
          "ebay_class",
          "ebay_user",
          "ebay_password",
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
        .exec((err, shopee) => {
          
          if (err || !shopee) {
          
            return res.status(500);
          }

          // get list users_name từ db vào shopee_employee
          Users.find({}, { users_name: 1, _id: 0 }).exec((err, users) => {
            users.forEach((user) => {
              userData.push(user.users_name);
            });
          });

          let newData = JSON.parse(JSON.stringify(shopee));
          newData.listselect_shopee_employee = userData;
          req.shopee = newData;
          next();
        });
    } else {
      // Nhân viên chỉ vào được tài khoản nhân viên đó quản lý
      var users_name_re = new RegExp("(.*)" + users_name + "(.*)");
      filter_shopee = {
        shopee_id: id,
        shopee_employee: users_name_re,
        //shopee_status: "Live"
      };

      Shopee.findOne(filter_shopee)
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
      .populate("ebay_id", [
        "ebay_id",
        "ebay_status",
        "ebay_class",
        "ebay_user",
        "ebay_password",
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
      .exec((err, shopee) => {
        if (err || !shopee) {
          res.status(400).json({
            message: "Không tìm thấy shopee",
          });
          return;
        }

        // get list users_name từ db vào shopee_employee
        Users.find({}, { users_name: 1, _id: 0 }).exec((err, users) => {
          users.forEach((user) => {
            userData.push(user.users_name);
          });
        });
        let newData = JSON.parse(JSON.stringify(shopee));
        newData.listselect_shopee_employee = userData;
        req.shopee = newData;
        next();
      });
    }
  });

  /*  // get thông tin tài nguyên
   let sim_id = "", mail_id = "",device_id="",info_id="";
    if (shopee.list_view) {
      let list_view = shopee.list_view.split(",");
      list_view.forEach((view) => {
        switch (view) {
          case "sim_id": {
            Sim.findOne({ sim_id: shopee.sim_id.split('|')[0] }).exec((err, item) => {
              if (item) {
                 sim_id =
                  item.sim_id +
                  "|" +
                  item.sim_status +
                  "|" +
                  item.sim_user +
                  "|" +
                  item.sim_password;
                shopee.sim_id = sim_id;
                req.shopee = shopee;
              }
            });
          }

          case "device_id": {
            Device.findOne({ device_id: shopee.device_id }).exec((err, item) => {
              if (item) {
                 device_id =
                  item.device_id +
                  "|" +
                  item.device_status +
                  "|" +
                  item.device_user +
                  "|" +
                  item.device_password;
                shopee.device_id = device_id;
                req.shopee = shopee;
              }
            });
          }
          case "info_ids": {
            Info.findOne({ info_id: shopee.info_id }).exec((err, item) => {
              if (item) {
                 info_id =
                  item.info_id +
                  "|" +
                  item.info_status +
                  "|" +
                  item.info_fullname +
                  "|" +
                  item.info_passport;
                shopee.info_id = info_id;
                req.shopee = shopee;
              }
            });
          }
          case "mail_id": {
            Mail.findOne({ mail_id: shopee.mail_id }).exec((err, item) => {
              if (item) {
                 mail_id =
                  item.mail_id +
                  "|" +
                  item.mail_status +
                  "|" +
                  item.mail_user +
                  "|" +
                  item.mail_password;
                shopee.mail_id = mail_id;
                req.shopee = shopee;
                next();
              }
            });
          }

          req.shopee = shopee;
          next();
        }
      });
    } else {
      req.shopee = shopee;
      next();
    } */
};
// Update dữ liệu từ shopee_info ( đang gặp vấn đề quyền nhân viên uodate thì nhiều field bị rỗng)
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
    var shopee_id = req.query.id;
    var dataShopee = req.body;
    dataShopee.shopee_history =
      users_name +
      "|" +
      moment(now()).format("MM-DD-YYYY HH:mm") +
      "|" +
      dataShopee.shopee_class +
      "," +
      dataShopee.shopee_history;

    for (const key in dataShopee) {
      if (dataShopee[key] == "") {
        delete dataShopee[key];
      }
    }
    Shopee.findOneAndUpdate(
      { shopee_id: shopee_id },
      { $set: dataShopee },
      { useFindAndModify: false },
      (err, shopee) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            error: "Bạn không được phép thực hiện hành động này",
          });
        }
        res.json(shopee);
      }
    );
  });
};
// Get count ra bảng shopee_class
export const getCountShopee_class = (req, res) => {
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
      Shopee.aggregate([
        {
          $group: {
            _id: "$shopee_class",
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
      Shopee.aggregate([
        {
          $match: {
            shopee_employee: users_name_re,
          },
        },
        {
          $group: {
            _id: "$shopee_class",
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
// hàm phân quyền trong Shopee, user phải trong phòng sản xuất và quản lý Shopee mới view đc Shopee

export const canViewShopee = (req, res, next) => {
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
        user.manage_view.indexOf("shopee_id") != -1 &&
        user.users_owner.indexOf("Phòng sản xuất") != -1 &&
        user.users_status.indexOf("Active") != -1
      ) {
        next();
      } else {
        res.status(403).json({
          error: "Không có quyền truy cập shopee",
        });
      }
    });
  } catch (ex) {
    res.status(400).send("Token không chính xác");
  }
};
