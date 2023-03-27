// Import model
import Ebay from "../models/ebay";
import Device from "../models/device";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";
import moment from "moment";

export const create = (req, res) => {
  const ebay = new Ebay(req.body);
  ebay.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm ebay không thành công",
      });
    }
    res.json(acc);
  });
};

export const getebay = (req, res) => {
  return res.json(req.ebay);
};

// View bảng ebay_table
export const listebay = (req, res) => {
  var class_name = req.query.ebay_class;
  var query = req.query.query;

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
    console.log(
      user.users_name +
        ": View bảng ebay_table : " +
        moment().format("YYYY-MM-DD HH:mm")
    );
    let filter_ebay = "";
    if (class_name) {
      // "Giám đốc", "Phó Giám đốc", "Trưởng phòng" vào được tất cả các tài khoản
      if (
        ["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
          user.users_function
        ) != -1
      ) {
        filter_ebay = {
          ebay_class: class_name,
        };
      } else {
        // Nhân viên chỉ vào được tài khoản nhân viên đó quản lý
        var users_name_filter = new RegExp("(.*)" + users_name + "(.*)");
        filter_ebay = {
          ebay_class: class_name,
          ebay_employee: users_name_filter,
          //ebay_status: "Live"
        };
      }
      Ebay.find(filter_ebay).exec((err, ebay) => {
        if (err || !ebay) {
          res.status(400).json({
            message: "Không tìm thấy ebay",
          });
        }
        // Reverse sắp xếp các ebay theo thứ tự tạo mới nhất
        res.json(ebay.reverse());
      });
    }
  });
};

// View bảng ebay_info
export const ebayByID = (req, res, next, id) => {
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
    console.log(
      user.users_name +
        ": View bảng ebay_info : " +
        id +
        " : " +
        moment().format("YYYY-MM-DD HH:mm")
    );
    let filter_ebay = "";
    // "Giám đốc", "Phó Giám đốc", "Trưởng phòng" vào được tất cả các tài khoản
    if (
      ["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
        user.users_function
      ) != -1
    ) {
      Ebay.findOne({ ebay_id: id })
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
        .populate("tiktok_id", [
          "tiktok_id",
          "tiktok_status",
          "tiktok_class",
          "tiktok_user",
          "tiktok_password",
        ])
        .populate("customer_id", [
          "customer_id",
          "customer_status",
          "customer_class",
          "customer_user",
          "customer_phone1",
        ])
        .exec((err, ebay) => {
          if (err || !ebay) {
            return res.status(500);
          }

          // get list users_name từ db vào ebay_employee
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

          let newData = JSON.parse(JSON.stringify(ebay));
          newData.listselect_ebay_employee = userData;
          req.ebay = newData;
          next();
        });
    } else {
      // Nhân viên chỉ vào được tài khoản nhân viên đó quản lý
      var users_name_re = new RegExp("(.*)" + users_name + "(.*)");
      filter_ebay = {
        ebay_id: id,
        ebay_employee: users_name_re,
        //ebay_status: "Live"
      };

      Ebay.findOne(filter_ebay)
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
        .populate("tiktok_id", [
          "tiktok_id",
          "tiktok_status",
          "tiktok_class",
          "tiktok_user",
          "tiktok_password",
        ])
        .populate("customer_id", [
          "customer_id",
          "customer_status",
          "customer_class",
          "customer_user",
          "customer_phone1",
        ])
        .exec((err, ebay) => {
          if (err || !ebay) {
            res.status(400).json({
              message: "Không tìm thấy ebay",
            });
            return;
          }

          // get list users_name từ db vào ebay_employee
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
          let newData = JSON.parse(JSON.stringify(ebay));
          newData.listselect_ebay_employee = userData;
          req.ebay = newData;
          next();
        });
    }
  });
};

// Update dữ liệu từ ebay_info
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

    var ebay_id = req.query.id;
    console.log(
      user.users_name +
        ": Update bảng ebay_info : " +
        ebay_id +
        " : " +
        moment().format("YYYY-MM-DD HH:mm")
    );
    var dataEbay = req.body;
    dataEbay.ebay_history =
      users_name +
      "|" +
      moment().format("YYYY-MM-DD HH:mm") +
      "|" +
      dataEbay.ebay_class +
      "," +
      dataEbay.ebay_history;

    for (const key in dataEbay) {
      if (dataEbay[key] == "") {
        delete dataEbay[key];
      }
    }
    Ebay.findOneAndUpdate(
      { ebay_id: ebay_id },
      { $set: dataEbay },
      { useFindAndModify: false },
      (err, ebay) => {
        if (err) {
          return res.status(400).json({
            error: "Bạn không được phép thực hiện hành động này",
          });
        }
        res.json(ebay);
      }
    );
  });
};

// Copy dữ liệu từ ebay_info
export const Copy_re = (req, res) => {
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
    var ebay_id = req.query.id;
    var dataEbay = req.body;
    dataEbay.ebay_class == "Lớp 1";

    dataEbay.ebay_history =
      users_name +
      "|" +
      moment().format("YYYY-MM-DD HH:mm") +
      "|" +
      dataEbay.ebay_class;

    for (const key in dataEbay) {
      if (dataEbay[key] == "") {
        delete dataEbay[key];
      }
    }
    Ebay.findOneAndUpdate(
      { ebay_id: ebay_id },
      { $set: dataEbay },
      { useFindAndModify: false },
      (err, ebay) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            error: "Bạn không được phép thực hiện hành động này",
          });
        }
        res.json(ebay);
      }
    );
  });
};

// Get count ra bảng ebay_class
export const getCountEbay_class = (req, res) => {
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
      Ebay.aggregate([
        {
          $group: {
            _id: "$ebay_class",
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
      Ebay.aggregate([
        {
          $match: {
            ebay_employee: users_name_re,
          },
        },
        {
          $group: {
            _id: "$ebay_class",
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

export const searchEbay = (req, res) => {
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
    console.log(
      user.users_name + ": Search Ebay : " + moment().format("YYYY-MM-DD HH:mm")
    );
    var users_name_re = new RegExp("(.*)" + users_name + "(.*)");

    // "Giám đốc", "Phó Giám đốc", "Trưởng phòng" xem được tổng tài khoản
    if (
      ["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
        user.users_function
      ) != -1
    ) {
      textand.map((item) => {
        search.push({
          ebay_employee: new RegExp("(.*)" + item.trim() + "(.*)"),
        });
      });
    } else {
      textand.map((item) => {
        search.push({
          ebay_employee: users_name_re,
        });
      });
    }

    textand.map((item) => {
      search.push({
        ebay_id: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        ebay_user: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        ebay_detail: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        ebay_limit: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        ebay_item: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        ebay_sold: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        ebay_feedback: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        ebay_plan: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        ebay_block: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        ebay_error: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        ebay_processing: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        ebay_type: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        ebay_sell_status: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        ebay_owner: new RegExp("(.*)" + item.trim() + "(.*)"),
      });

      search.push({
        ebay_outline: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        ebay_status: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        ebay_class: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
      search.push({
        ebay_note: new RegExp("(.*)" + item.trim() + "(.*)"),
      });
    });

    // Nhân viên chỉ search được tài khoản nhân viên đó

    Ebay.aggregate([
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
// Chưa dùng

//
export const Gologincare = (req, res) => {

  Ebay.aggregate([
    { $project: { ebay_class: 1, ebay_user: 1, ebay_id: 1 } },
    {
      $match: {
        ebay_class: {
          $in: ["Lớp 14", "Lớp 15"],
        },
      },
    },
    { $sample: { size: 1 } },
  ]).exec((err, ebay) => {
    if (err || !ebay) {
      return res.status(400).json({
        error: "Đã Lỗi",
      });
    }
    let device_id = ebay[0].ebay_id;
    Device.findOne(
      { device_id: device_id },
      { device_class: 1, device_password: 1, device_user: 1 }
    ).exec((err, device) => {
      if (err || !device) {
        return res.status(400).json({
          error: "Đã Lỗi rồi",
        });
      }
     
      if (device.device_user ==" " || device.device_password ==" ") {
        
        return res.status(400).json({
          error: "Đã Lỗi rồi",
        });
        
      }else{
        res.json(device);
      }
      // Reverse sắp xếp các ebay theo thứ tự tạo mới nhất
      
    });
  });
};

// ================ Middle ware====================
// hàm phân quyền trong Ebay, user phải trong phòng sản xuất và quản lý Ebay mới view đc Ebay

export const canViewEbay = (req, res, next) => {
  const data = req.headers["x-access-token"] || req.headers["authorization"];
  if (!data) {
    return res.status(400).json({
      error: "Chưa login",
    });
  }
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
        user.manage_view.indexOf("ebay_id") != -1 &&
        user.users_owner.indexOf("Phòng sản xuất") != -1 &&
        user.users_status.indexOf("Active") != -1
      ) {
        next();
      } else {
        res.status(403).json({
          error: "Không có quyền truy cập ebay",
        });
      }
    });
  } catch (ex) {
    res.status(400).send("Token không chính xác");
  }
};
