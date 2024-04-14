// Import model
import Payoneer from "../models/payoneer";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";
import moment, { now } from "moment";

export const create = (req, res) => {
  const payoneer = new Payoneer(req.body);
  payoneer.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm payoneer không thành công",
      });
    }
    res.json(acc);
  });
};

export const getpayoneer = (req, res) => {
  return res.json(req.payoneer);
};

// View bảng payoneer_table
export const listpayoneer = (req, res) => {
  var class_name = req.query.payoneer_class;
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
        error: "Đã lỗi",
      });
    }
    if (!user) {
      users_name = "";
    }

    users_name = user.users_name;
    let filter_payoneer = "";
    if (class_name) {
      // "Giám đốc", "Phó Giám đốc", "Trưởng phòng" vào được tất cả các tài khoản
      if (
        ["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
          user.users_function
        ) != -1
      ) {
        filter_payoneer = {
          payoneer_class: class_name,
        };
      } else {
        // Nhân viên chỉ vào được tài khoản nhân viên đó quản lý
        var users_name_re = new RegExp("(.*)" + users_name + "(.*)");
        filter_payoneer = {
          payoneer_class: class_name,
          payoneer_employee: users_name_re,
          //payoneer_status: "Live"
        };
      }

      Payoneer.find(filter_payoneer).exec((err, payoneer) => {
        if (err || !payoneer) {
          res.status(400).json({
            message: "Không tìm thấy payoneer",
          });
        }
        // Reverse sắp xếp các payoneer theo thứ tự tạo mới nhất
        res.json(payoneer.reverse());
      });
    }
  });
};

// View bảng payoneer_info
export const payoneerByID = (req, res, next, id) => {
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
        error: "Đã lỗi",
      });
    }
    if (!user) {
      users_name = "";
    }
    users_name = user.users_name;
    let filter_payoneer = "";
    // "Giám đốc", "Phó Giám đốc", "Trưởng phòng" vào được tất cả các tài khoản
    if (
      ["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
        user.users_function
      ) != -1
    ) {
      Payoneer.findOne({ payoneer_id: id })
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
        .populate("ebay_id", [
          "ebay_id",
          "ebay_status",
          "ebay_class",
          "ebay_user",
          "ebay_password",
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
        .populate("tiktok_id", [
          "tiktok_id",
          "tiktok_status",
          "tiktok_class",
          "tiktok_user",
          "tiktok_password",
        ])
        .exec((err, payoneer) => {
          
          if (err || !payoneer) {
          
            return res.status(500);
          }

          // get list users_name từ db vào payoneer_employee
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

          let newData = JSON.parse(JSON.stringify(payoneer));
          newData.listselect_payoneer_employee = userData;
          req.payoneer = newData;
          next();
        });
    } else {
      // Nhân viên chỉ vào được tài khoản nhân viên đó quản lý
      var users_name_re = new RegExp("(.*)" + users_name + "(.*)");
      filter_payoneer = {
        payoneer_id: id,
        payoneer_employee: users_name_re,
        //payoneer_status: "Live"
      };

      Payoneer.findOne(filter_payoneer)
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
      .populate("pingpong_id", [
        "pingpong_id",
        "pingpong_status",
        "pingpong_class",
        "pingpong_user",
        "pingpong_password",
      ])
      .populate("paypal_id", [
        "paypal_id",
        "paypal_status",
        "paypal_class",
        "paypal_user",
        "paypal_password",
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
      .populate("tiktok_id", [
        "tiktok_id",
        "tiktok_status",
        "tiktok_class",
        "tiktok_user",
        "tiktok_password",
      ])
      .exec((err, payoneer) => {
        if (err || !payoneer) {
          res.status(400).json({
            message: "Không tìm thấy payoneer",
          });
          return;
        }

        // get list users_name từ db vào payoneer_employee
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
        let newData = JSON.parse(JSON.stringify(payoneer));
        newData.listselect_payoneer_employee = userData;
        req.payoneer = newData;
        next();
      });
    }
  });

};
// Update dữ liệu từ payoneer_info ( đang gặp vấn đề quyền nhân viên uodate thì nhiều field bị rỗng)
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
        error: "Đã lỗi",
      });
    }
    if (!user) {
      users_name = "";
    }
    users_name = user.users_name;
    var payoneer_id = req.query.id;
    var dataPayoneer = req.body;
    dataPayoneer.payoneer_history =
      users_name +
      "|" +
      moment(now()).format("YYYY-MM-DD HH:mm") +
      "|" +
      dataPayoneer.payoneer_class +
      "," +
      dataPayoneer.payoneer_history;

    for (const key in dataPayoneer) {
      if (dataPayoneer[key] == "") {
        delete dataPayoneer[key];
      }
    }
    Payoneer.findOneAndUpdate(
      { payoneer_id: payoneer_id },
      { $set: dataPayoneer },
      { useFindAndModify: false },
      (err, payoneer) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            error: "Bạn không được phép thực hiện hành động này",
          });
        }
        res.json(payoneer);
      }
    );
  });
};
// Get count ra bảng payoneer_class
export const getCountPayoneer_class = (req, res) => {
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
        error: "Đã lỗi",
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
      Payoneer.aggregate([
        {
          $group: {
            _id: "$payoneer_class",
            count: {
              $count: {},
            },
          },
        },
      ]).exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: "Đã lỗi",
          });
        }
        res.json({
          status: "success",
          data: data,
        });
      });
    } else {
      // Nhân viên chỉ xem được tổng tài khoản nhân viên đó quản lý
      Payoneer.aggregate([
        {
          $match: {
            payoneer_employee: users_name_re,
          },
        },
        {
          $group: {
            _id: "$payoneer_class",
            count: {
              $count: {},
            },
          },
        },
      ]).exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: "Đã lỗi",
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

export const searchPayoneer = (req, res) => {
  
  var textand = req.query.query.split(",");
  var search = [];
  if (!textand) {
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
      textand.map((item) => {
        search.push({
          payoneer_employee: new RegExp("(.*)" + item.trim() + "(.*)"),
        });
      });
      
    } else {

      textand.map((item) => {
        search.push({
          payoneer_employee: users_name_re,
        });
      });
      
    }

    textand.map((item) => {
      search.push({
        payoneer_id: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        payoneer_user: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        payoneer_detail: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        payoneer_limit: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        payoneer_item: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        payoneer_sold: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        payoneer_feedback: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        payoneer_plan: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        payoneer_block: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        payoneer_error: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        payoneer_processing: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        payoneer_type: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        payoneer_sell_status: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        payoneer_owner: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      
      search.push({
        payoneer_outline: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        payoneer_status: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        payoneer_class: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        payoneer_note: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
    });
  
    // Nhân viên chỉ search được tài khoản nhân viên đó
  
    Payoneer.aggregate([
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
// hàm phân quyền trong Payoneer, user phải trong phòng sản xuất và quản lý Payoneer mới view đc Payoneer

export const canViewPayoneer = (req, res, next) => {
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
          error: "Đã lỗi",
        });
      }
      if (!user) {
        return res.status(403).json({
          error: "Bạn chưa đăng nhập",
        });
      }
      if (
        user.manage_view.indexOf("payoneer_id") != -1 &&
        user.users_owner.indexOf("Phòng sản xuất") != -1 &&
        user.users_status.indexOf("Active") != -1
      ) {
        next();
      } else {
        res.status(403).json({
          error: "Không có quyền truy cập payoneer",
        });
      }
    });
  } catch (ex) {
    res.status(400).send("Token không chính xác");
  }
};
