// Import model
import Sim from "../models/sim";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";
import moment, { now } from "moment";

export const create = (req, res) => {
  const sim = new Sim(req.body);
  sim.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm sim không thành công",
      });
    }
    res.json(acc);
  });
};

export const getsim = (req, res) => {
  return res.json(req.sim);
};

// View bảng sim_table
export const listsim = (req, res) => {
  var class_name = req.query.sim_class;
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
    let filter_sim = "";
    if (class_name) {
      // "Giám đốc", "Phó Giám đốc", "Trưởng phòng" vào được tất cả các tài khoản
      if (
        ["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
          user.users_function
        ) != -1
      ) {
        filter_sim = {
          sim_class: class_name,
        };
      } else {
        // Nhân viên chỉ vào được tài khoản nhân viên đó quản lý
        var users_name_re = new RegExp("(.*)" + users_name + "(.*)");
        filter_sim = {
          sim_class: class_name,
          sim_employee: users_name_re,
          //sim_status: "Live"
        };
      }

      Sim.find(filter_sim).exec((err, sim) => {
        if (err || !sim) {
          res.status(400).json({
            message: "Không tìm thấy sim",
          });
        }
        // Reverse sắp xếp các sim theo thứ tự tạo mới nhất
        res.json(sim.reverse());
      });
    }
  });
};

// View bảng sim_info
export const simByID = (req, res, next, id) => {
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
    let filter_sim = "";
    // "Giám đốc", "Phó Giám đốc", "Trưởng phòng" vào được tất cả các tài khoản
    if (
      ["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
        user.users_function
      ) != -1
    ) {
      Sim.findOne({ sim_id: id })
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
        .populate("etsy_id", [
          "etsy_id",
          "etsy_status",
          "etsy_class",
          "etsy_user",
          "etsy_password",
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
        .exec((err, sim) => {
          if (err || !sim) {
            console.log("Lỗi không truy vấn được Sim, kiểm tra populate");
            return res.status(500);
          }

          // get list users_name từ db vào sim_employee
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

          let newData = JSON.parse(JSON.stringify(sim));
          newData.listselect_sim_employee = userData;
          req.sim = newData;
          next();
        });
    } else {
      // Nhân viên chỉ vào được tài khoản nhân viên đó quản lý
      var users_name_re = new RegExp("(.*)" + users_name + "(.*)");
      filter_sim = {
        sim_id: id,
        sim_employee: users_name_re,
        //sim_status: "Live"
      };

      Sim.findOne(filter_sim)
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
        .populate("etsy_id", [
          "etsy_id",
          "etsy_status",
          "etsy_class",
          "etsy_user",
          "etsy_password",
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
        .exec((err, sim) => {
          if (err || !sim) {
            console.log("Lỗi không truy vấn được Sim, kiểm tra populate");
            return res.status(500);
          }

          // get list users_name từ db vào sim_employee
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
          let newData = JSON.parse(JSON.stringify(sim));
          newData.listselect_sim_employee = userData;
          req.sim = newData;
          next();
        });
    }
  });
};
// Update dữ liệu từ sim_info ( đang gặp vấn đề quyền nhân viên uodate thì nhiều field bị rỗng)
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
    var sim_id = req.query.id;
    var dataSim = req.body;
    dataSim.sim_history =
      users_name +
      "|" +
      moment(now()).format("YYYY-MM-DD HH:mm") +
      "|" +
      dataSim.sim_class +
      "," +
      dataSim.sim_history;

    for (const key in dataSim) {
      if (dataSim[key] == "") {
        delete dataSim[key];
      }
    }
    Sim.findOneAndUpdate(
      { sim_id: sim_id },
      { $set: dataSim },
      { useFindAndModify: false },
      (err, sim) => {
        if (err) {
          return res.status(400).json({
            error: "Bạn không được phép thực hiện hành động này",
          });
        }
        res.json(sim);
      }
    );
  });
};
// Get count ra bảng sim_class
export const getCountSim_class = (req, res) => {
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
      Sim.aggregate([
        {
          $group: {
            _id: "$sim_class",
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
      Sim.aggregate([
        {
          $match: {
            sim_employee: users_name_re,
          },
        },
        {
          $group: {
            _id: "$sim_class",
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

export const searchSim = (req, res) => {
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
          sim_employee: new RegExp("(.*)" + item.trim() + "(.*)"),
        });
      });
    } else {
      search.push({
        sim_employee: users_name_re,
      });
    }

    text.map((item) => {
      search.push({
        sim_id: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        sim_user: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        sim_plan: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        sim_block: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        sim_error: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        sim_processing: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        sim_type: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        sim_sell_status: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        sim_owner: new RegExp("(.*)" + item.trim() + "(.*)"),
      });

      search.push({
        sim_outline: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        sim_status: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        sim_class: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        sim_note: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
    });

    // Nhân viên chỉ search được tài khoản nhân viên đó

    Sim.aggregate([
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
// hàm phân quyền trong Sim, user phải trong phòng sản xuất và quản lý Sim mới view đc Sim

export const canViewSim = (req, res, next) => {
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
        user.manage_view.indexOf("sim_id") != -1 &&
        user.users_owner.indexOf("Phòng sản xuất") != -1 &&
        user.users_status.indexOf("Active") != -1
      ) {
        next();
      } else {
        res.status(403).json({
          error: "Không có quyền truy cập sim",
        });
      }
    });
  } catch (ex) {
    res.status(400).send("Token không chính xác");
  }
};
