// Import model
import Mail from "../models/mail";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";
import moment, { now } from "moment";

export const create = (req, res) => {
  const mail = new Mail(req.body);
  mail.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm mail không thành công",
      });
    }
    res.json(acc);
  });
};

export const getmail = (req, res) => {
  return res.json(req.mail);
};

// View bảng mail_table
export const listmail = (req, res) => {
  var class_name = req.query.mail_class;
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
    let filter_mail = "";
    if (class_name) {
      // "Giám đốc", "Phó Giám đốc", "Trưởng phòng" vào được tất cả các tài khoản
      if (
        ["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
          user.users_function
        ) != -1
      ) {
        filter_mail = {
          mail_class: class_name,
        };
      } else {
        // Nhân viên chỉ vào được tài khoản nhân viên đó quản lý
        var users_name_re = new RegExp("(.*)" + users_name + "(.*)");
        filter_mail = {
          mail_class: class_name,
          mail_employee: users_name_re,
          //mail_status: "Live"
        };
      }

      Mail.find(filter_mail).exec((err, mail) => {
        if (err || !mail) {
          res.status(400).json({
            message: "Không tìm thấy mail",
          });
        }
        // Reverse sắp xếp các mail theo thứ tự tạo mới nhất
        res.json(mail.reverse());
      });
    }
  });
};

// View bảng mail_info
export const mailByID = (req, res, next, id) => {
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
    let filter_mail = "";
    // "Giám đốc", "Phó Giám đốc", "Trưởng phòng" vào được tất cả các tài khoản
    if (
      ["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
        user.users_function
      ) != -1
    ) {

      Mail.findOne({ mail_id: id })
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
        .populate("etsy_id", [
          "etsy_id",
          "etsy_status",
          "etsy_class",
          "etsy_user",
          "etsy_password",
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
        .exec((err, mail) => {
          console.log("mail")
          if (err || !mail) {
            console.log("Lỗi không truy vấn được Mail, kiểm tra populate")
            return res.status(500);
          }

          // get list users_name từ db vào mail_employee
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

          let newData = JSON.parse(JSON.stringify(mail));
          newData.listselect_mail_employee = userData;
          req.mail = newData;
          next();
        });
    } else {
      // Nhân viên chỉ vào được tài khoản nhân viên đó quản lý
      var users_name_re = new RegExp("(.*)" + users_name + "(.*)");
      filter_mail = {
        mail_id: id,
        mail_employee: users_name_re,
        //mail_status: "Live"
      };

      Mail.findOne(filter_mail)
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
      .populate("etsy_id", [
        "etsy_id",
        "etsy_status",
        "etsy_class",
        "etsy_user",
        "etsy_password",
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
      .exec((err, mail) => {
        console.log(mail)
          if (err || !mail) {
            console.log("Lỗi không truy vấn được Mail, kiểm tra populate")
            return res.status(500);
          }

        // get list users_name từ db vào mail_employee
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
        let newData = JSON.parse(JSON.stringify(mail));
        newData.listselect_mail_employee = userData;
        req.mail = newData;
        next();
      });
    }
  });
};
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
    var mail_id = req.query.id;
    var dataMail = req.body;
    dataMail.mail_history =
      users_name +
      "|" +
      moment(now()).format("YYYY-MM-DD HH:mm") +
      "|" +
      dataMail.mail_class +
      "," +
      dataMail.mail_history;

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
        res.json(mail);
      }
    );
  });
};
// Get count ra bảng mail_class
export const getCountMail_class = (req, res) => {
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
      Mail.aggregate([
        {
          $group: {
            _id: "$mail_class",
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
      Mail.aggregate([
        {
          $match: {
            mail_employee: users_name_re,
          },
        },
        {
          $group: {
            _id: "$mail_class",
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

export const searchMail = (req, res) => {
  
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
          mail_employee: new RegExp("(.*)" + item.trim() + "(.*)"),
        });
      });
      
    } else {

      textand.map((item) => {
        search.push({
          mail_employee: users_name_re,
        });
      });
      
    }

    textand.map((item) => {
      search.push({
        mail_id: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        mail_user: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        mail_detail: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        mail_limit: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        mail_item: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        mail_sold: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        mail_feedback: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        mail_plan: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        mail_block: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        mail_error: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        mail_processing: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        mail_type: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        mail_sell_status: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        mail_owner: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      
      search.push({
        mail_outline: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        mail_status: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        mail_class: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        mail_note: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
    });
  
    // Nhân viên chỉ search được tài khoản nhân viên đó
  
    Mail.aggregate([
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
// hàm phân quyền trong Mail, user phải trong phòng sản xuất và quản lý Mail mới view đc Mail

export const canViewMail = (req, res, next) => {
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
        user.manage_view.indexOf("mail_id") != -1 &&
        user.users_owner.indexOf("Phòng sản xuất") != -1 &&
        user.users_status.indexOf("Active") != -1
      ) {
        next();
      } else {
        res.status(403).json({
          error: "Không có quyền truy cập mail",
        });
      }
    });
  } catch (ex) {
    res.status(400).send("Token không chính xác");
  }
};
