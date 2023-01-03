// Import model
import Person from "../models/person";
import Info from "../models/info";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";
import moment, { now } from "moment";

export const create = (req, res) => {
  const person = new Person(req.body);
  person.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm person không thành công",
      });
    }
    res.json(acc);
  });
};

export const getperson = (req, res) => {
  return res.json(req.person);
};

// View bảng person_table
export const listperson = (req, res) => {
  var class_name = req.query.person_class;
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
    let filter_person = "";
    if (class_name) {
      // "Giám đốc", "Phó Giám đốc", "Trưởng phòng" vào được tất cả các tài khoản
      if (
        ["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
          user.users_function
        ) != -1
      ) {
        filter_person = {
          person_class: class_name,
        };
      } else {
        // Nhân viên chỉ vào được tài khoản nhân viên đó quản lý
        var users_name_re = new RegExp("(.*)" + users_name + "(.*)");
        filter_person = {
          person_class: class_name,
          person_employee: users_name_re,
          //person_status: "Live"
        };
      }

      Person.find(filter_person).exec((err, person) => {
        if (err || !person) {
          res.status(400).json({
            message: "Không tìm thấy person",
          });
        }
        // Reverse sắp xếp các person theo thứ tự tạo mới nhất
        res.json(person.reverse());
      });
    }
  });
};

// View bảng person_info
export const personByID = (req, res, next, id) => {
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
    let filter_person = "";
    // "Giám đốc", "Phó Giám đốc", "Trưởng phòng" vào được tất cả các tài khoản
    if (
      ["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
        user.users_function
      ) != -1
    ) {
      console.log(user.users_function)

  /* 
      Person.findOne({ _id: decoded._id }).exec((err, sss) => {
        
        if (err || !sss) {
          console.log("Lỗi không truy vấn được Person, kiểm tra populate")
          return res.status(500);
        }
        
      });
      return
 */


      Person.findOne({ person_id: id })
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
        .exec((err, person) => {
          console.log("person")
          if (err || !person) {
            console.log("Lỗi không truy vấn được Person, kiểm tra populate")
            return res.status(500);
          }

          // get list users_name từ db vào person_employee
          Users.find({}, { users_name: 1, _id: 0 }).exec((err, users) => {
            users.forEach((user) => {
              userData.push(user.users_name);
            });
          });

          let newData = JSON.parse(JSON.stringify(person));
          newData.listselect_person_employee = userData;
          req.person = newData;
          next();
        });
    } else {
      // Nhân viên chỉ vào được tài khoản nhân viên đó quản lý
      var users_name_re = new RegExp("(.*)" + users_name + "(.*)");
      filter_person = {
        person_id: id,
        person_employee: users_name_re,
        //person_status: "Live"
      };

      Person.findOne(filter_person)
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
      .exec((err, person) => {
        console.log(person)
          if (err || !person) {
            console.log("Lỗi không truy vấn được Person, kiểm tra populate")
            return res.status(500);
          }

        // get list users_name từ db vào person_employee
        Users.find({}, { users_name: 1, _id: 0 }).exec((err, users) => {
          users.forEach((user) => {
            userData.push(user.users_name);
          });
        });
        let newData = JSON.parse(JSON.stringify(person));
        newData.listselect_person_employee = userData;
        req.person = newData;
        next();
      });
    }
  });
};
// Update dữ liệu từ person_info ( đang gặp vấn đề quyền nhân viên uodate thì nhiều field bị rỗng)
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
    var person_id = req.query.id;
    var dataPerson = req.body;
    dataPerson.person_history =
      users_name +
      "|" +
      moment(now()).format("YYYY-MM-DD HH:mm") +
      "|" +
      dataPerson.person_class +
      "," +
      dataPerson.person_history;

    for (const key in dataPerson) {
      if (dataPerson[key] == "") {
        delete dataPerson[key];
      }
    }
    Person.findOneAndUpdate(
      { person_id: person_id },
      { $set: dataPerson },
      { useFindAndModify: false },
      (err, person) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            error: "Bạn không được phép thực hiện hành động này",
          });
        }
        res.json(person);
      }
    );
  });
};
// Get count ra bảng person_class
export const getCountPerson_class = (req, res) => {
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
      Person.aggregate([
        {
          $group: {
            _id: "$person_class",
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
      Person.aggregate([
        {
          $match: {
            person_employee: users_name_re,
          },
        },
        {
          $group: {
            _id: "$person_class",
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
// hàm phân quyền trong Person, user phải trong phòng sản xuất và quản lý Person mới view đc Person

export const canViewPerson = (req, res, next) => {
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
        user.manage_view.indexOf("person_id") != -1 &&
        user.users_owner.indexOf("Phòng sản xuất") != -1 &&
        user.users_status.indexOf("Active") != -1
      ) {
        next();
      } else {
        res.status(403).json({
          error: "Không có quyền truy cập person",
        });
      }
    });
  } catch (ex) {
    res.status(400).send("Token không chính xác");
  }
};
