// Import model
import Etsy from "../models/etsy";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";
import moment, { now } from "moment";

export const create = (req, res) => {
  const etsy = new Etsy(req.body);
  etsy.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm etsy không thành công",
      });
    }
    res.json(acc);
  });
};

export const getetsy = (req, res) => {
  return res.json(req.etsy);
};

// View bảng etsy_table
export const listetsy = (req, res) => {
  var class_name = req.query.etsy_class;
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
    let filter_etsy = "";
    if (class_name) {
      // "Giám đốc", "Phó Giám đốc", "Trưởng phòng" vào được tất cả các tài khoản
      if (
        ["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
          user.users_function
        ) != -1
      ) {
        filter_etsy = {
          etsy_class: class_name,
        };
      } else {
        // Nhân viên chỉ vào được tài khoản nhân viên đó quản lý
        var users_name_re = new RegExp("(.*)" + users_name + "(.*)");
        filter_etsy = {
          etsy_class: class_name,
          etsy_employee: users_name_re,
          //etsy_status: "Live"
        };
      }

      Etsy.find(filter_etsy).exec((err, etsy) => {
        if (err || !etsy) {
          res.status(400).json({
            message: "Không tìm thấy etsy",
          });
        }
        // Reverse sắp xếp các etsy theo thứ tự tạo mới nhất
        res.json(etsy.reverse());
      });
    }
  });
};

// View bảng etsy_info
export const etsyByID = (req, res, next, id) => {
  let userData = [];
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
    let filter_etsy = "";
    // "Giám đốc", "Phó Giám đốc", "Trưởng phòng" vào được tất cả các tài khoản
    if (
      ["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
        user.users_function
      ) != -1
    ) {

      Etsy.findOne({ etsy_id: id })
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
        .populate("ebay_id", [
          "ebay_id",
          "ebay_status",
          "ebay_class",
          "ebay_user",
          "ebay_password",
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
        .populate("tiktok_id", [
          "tiktok_id",
          "tiktok_status",
          "tiktok_class",
          "tiktok_user",
          "tiktok_password",
        ])
        .exec((err, etsy) => {
          console.log("etsy")
          if (err || !etsy) {
            console.log("Lỗi không truy vấn được Etsy, kiểm tra populate")
            return res.status(500);
          }

          // get list users_name từ db vào etsy_employee
          Users.find({}, { users_name: 1, _id: 0 }).exec((err, users) => {
            if (err) {
              return res.status(400).json({
                error: "Đã Lỗi",
              });
            }
            users.forEach((user) => {
              userData.push(user.users_name);
            });
          });

          let newData = JSON.parse(JSON.stringify(etsy));
          newData.listselect_etsy_employee = userData;
          req.etsy = newData;
          next();
        });
    } else {
      // Nhân viên chỉ vào được tài khoản nhân viên đó quản lý
      var users_name_re = new RegExp("(.*)" + users_name + "(.*)");
      filter_etsy = {
        etsy_id: id,
        etsy_employee: users_name_re,
        //etsy_status: "Live"
      };

      Etsy.findOne(filter_etsy)
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
      .populate("ebay_id", [
        "ebay_id",
        "ebay_status",
        "ebay_class",
        "ebay_user",
        "ebay_password",
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
      .populate("tiktok_id", [
        "tiktok_id",
        "tiktok_status",
        "tiktok_class",
        "tiktok_user",
        "tiktok_password",
      ])
      .exec((err, etsy) => {
        
          if (err || !etsy) {
            console.log("Lỗi không truy vấn được Etsy, kiểm tra populate")
            return res.status(500);
          }

        // get list users_name từ db vào etsy_employee
        Users.find({}, { users_name: 1, _id: 0 }).exec((err, users) => {
          if (err) {
            return res.status(400).json({
              error: "Đã lỗi",
            });
          }
          users.forEach((user) => {
            userData.push(user.users_name);
          });
        });
        let newData = JSON.parse(JSON.stringify(etsy));
        newData.listselect_etsy_employee = userData;
        req.etsy = newData;
        next();
      });
    }
  });
};
// Update dữ liệu từ etsy_info ( đang gặp vấn đề quyền nhân viên uodate thì nhiều field bị rỗng)
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
    var etsy_id = req.query.id;
    var dataEtsy = req.body;
    dataEtsy.etsy_history =
      users_name +
      "|" +
      moment(now()).format("YYYY-MM-DD HH:mm") +
      "|" +
      dataEtsy.etsy_class +
      "," +
      dataEtsy.etsy_history;

    for (const key in dataEtsy) {
      if (dataEtsy[key] == "") {
        delete dataEtsy[key];
      }
    }
    Etsy.findOneAndUpdate(
      { etsy_id: etsy_id },
      { $set: dataEtsy },
      { useFindAndModify: false },
      (err, etsy) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            error: "Bạn không được phép thực hiện hành động này",
          });
        }
        res.json(etsy);
      }
    );
  });
};
// Get count ra bảng etsy_class
export const getCountEtsy_class = (req, res) => {
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
    var users_name_re = new RegExp("(.*)" + users_name + "(.*)");

    // "Giám đốc", "Phó Giám đốc", "Trưởng phòng" xem được tổng tài khoản
    if (
      ["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
        user.users_function
      ) != -1
    ) {
      Etsy.aggregate([
        {
          $group: {
            _id: "$etsy_class",
            count: {
              $count: {},
            },
          },
        },
      ]).exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: "Đã Lỗi",
          });
        }
        res.json({
          status: "success",
          data: data,
        });
      });
    } else {
      // Nhân viên chỉ xem được tổng tài khoản nhân viên đó quản lý
      Etsy.aggregate([
        {
          $match: {
            etsy_employee: users_name_re,
          },
        },
        {
          $group: {
            _id: "$etsy_class",
            count: {
              $count: {},
            },
          },
        },
      ]).exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: "Đã Lỗi",
          });
        }
        res.json({
          status: "success",
          data: data,
        });
      });
    }
  });
};

export const searchEtsy = (req, res) => {
  var text = req.query.query.split(",");
  var search = [];
  if (!text) {
    return;
  }
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
    var users_name_re = new RegExp("(.*)" + users_name + "(.*)");

    // "Giám đốc", "Phó Giám đốc", "Trưởng phòng" xem được tổng tài khoản
    if (
      ["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
        user.users_function
      ) != -1
    ) {
      text.map((item) => {
        search.push({
          etsy_employee: new RegExp("(.*)" + item.trim() + "(.*)"),
        });
      });
      
    } else {

      text.map((item) => {
        search.push({
          etsy_employee: users_name_re,
        });
      });
      
    }

    text.map((item) => {
      search.push({
        etsy_id: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        etsy_user: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        etsy_plan: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        etsy_block: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        etsy_error: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        etsy_processing: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        etsy_type: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        etsy_sell_status: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        etsy_owner: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      
      search.push({
        etsy_outline: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        etsy_status: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        etsy_class: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        etsy_note: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
    });
  
    // Nhân viên chỉ search được tài khoản nhân viên đó
  
    Etsy.aggregate([
      {
        $match: {
          $or: search,
        },
      },
    ]).exec((err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Đã Lỗi",
        });
      }
  
      res.json(data);
    });



  });

  
};
// ================ Middle ware====================
// hàm phân quyền trong Etsy, user phải trong phòng sản xuất và quản lý Etsy mới view đc Etsy

export const canViewEtsy = (req, res, next) => {
  const data = req.headers["x-access-token"] || req.headers["authorization"];
  const token = data.split(" ");
  if (!token) {
    return res.status(401).send("Bạn chưa đăng nhập, không tồn tại token");
  }
  try {
    const decoded = jwt.verify(token[1], "duy");
    Users.findOne({ _id: decoded._id }).exec((err, user) => {
      if (err) {
        return res.status(400).json({
          error: "Đã Lỗi",
        });
      }
      if (!user) {
        return res.status(403).json({
          error: "Bạn chưa đăng nhập",
        });
      }
      if (
        user.manage_view.indexOf("etsy_id") != -1 &&
        user.users_owner.indexOf("Phòng sản xuất") != -1 &&
        user.users_status.indexOf("Active") != -1
      ) {
        next();
      } else {
        res.status(403).json({
          error: "Không có quyền truy cập etsy",
        });
      }
    });
  } catch (ex) {
    res.status(400).send("Token không chính xác");
  }
};
