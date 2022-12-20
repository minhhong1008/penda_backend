// Import model
import Ebay from "../models/ebay";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";
import moment, { now } from "moment";

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
        var users_name_re = new RegExp("(.*)" + users_name + "(.*)");
        filter_ebay = {
          ebay_class: class_name,
          ebay_employee: users_name_re,
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
    if (!user) {
      users_name = "";
    }

    users_name = user.users_name;

    let filter_ebay = "";

    // "Giám đốc", "Phó Giám đốc", "Trưởng phòng" vào được tất cả các tài khoản
    if (
      ["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
        user.users_function
      ) != -1
    ) {
      Ebay.findOne({ ebay_id: id }, (err, ebay) => {
        if (err || !ebay) {
          res.status(400).json({
            message: "Không tìm thấy ebay",
          });
          return;
        }
        // get list users_name từ db vào ebay_employee
        Users.find({}, { users_name: 1, _id: 0 }).exec((err, users) => {
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

      Ebay.findOne(filter_ebay).exec((err, ebay) => {
        if (err || !ebay) {
          res.status(400).json({
            message: "Không tìm thấy ebay",
          });
          return;
        }
        // get list users_name từ db vào ebay_employee
        Users.find({}, { users_name: 1, _id: 0 }).exec((err, users) => {
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

  /*  // get thông tin tài nguyên
   let sim_id = "", mail_id = "",device_id="",info_id="";
    if (ebay.list_view) {
      let list_view = ebay.list_view.split(",");
      list_view.forEach((view) => {
        switch (view) {
          case "sim_id": {
            Sim.findOne({ sim_id: ebay.sim_id.split('|')[0] }).exec((err, item) => {
              if (item) {
                 sim_id =
                  item.sim_id +
                  "|" +
                  item.sim_status +
                  "|" +
                  item.sim_user +
                  "|" +
                  item.sim_password;
                ebay.sim_id = sim_id;
                req.ebay = ebay;
              }
            });
          }

          case "device_id": {
            Device.findOne({ device_id: ebay.device_id }).exec((err, item) => {
              if (item) {
                 device_id =
                  item.device_id +
                  "|" +
                  item.device_status +
                  "|" +
                  item.device_user +
                  "|" +
                  item.device_password;
                ebay.device_id = device_id;
                req.ebay = ebay;
              }
            });
          }
          case "info_ids": {
            Info.findOne({ info_id: ebay.info_id }).exec((err, item) => {
              if (item) {
                 info_id =
                  item.info_id +
                  "|" +
                  item.info_status +
                  "|" +
                  item.info_fullname +
                  "|" +
                  item.info_passport;
                ebay.info_id = info_id;
                req.ebay = ebay;
              }
            });
          }
          case "mail_id": {
            Mail.findOne({ mail_id: ebay.mail_id }).exec((err, item) => {
              if (item) {
                 mail_id =
                  item.mail_id +
                  "|" +
                  item.mail_status +
                  "|" +
                  item.mail_user +
                  "|" +
                  item.mail_password;
                ebay.mail_id = mail_id;
                req.ebay = ebay;
                next();
              }
            });
          }

          req.ebay = ebay;
          next();
        }
      });
    } else {
      req.ebay = ebay;
      next();
    } */
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
    if (!user) {
      users_name = "";
    }
    users_name = user.users_name;

    var ebay_id = req.query.id;
    var dataEbay = req.body;
    dataEbay.ebay_history = dataEbay.ebay_history + "," + users_name + "|" + moment(now()).format("DD/MM/YYYY HH:mm") + '|' + dataEbay.ebay_class;
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
    res.json({
      status: "success",
      data: data,
    });
  });
};

// ================ Middle ware====================
// hàm phân quyền trong Ebay, user phải trong phòng sản xuất và quản lý Ebay mới view đc Ebay

export const canViewEbay = (req, res, next) => {
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
