// Import model
import Info from "../models/info";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";
export const create = (req, res) => {
  const info = new Info(req.body);
  info.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm info không thành công",
      });
    }
    res.json(acc);
  });
};
export const infoByID = (req, res, next, id) => {
  Info.findOne({ info_id: id }, (err, info) => {
    if (err || !info) {
      res.status(400).json({
        message: "Không tìm thấy info",
      });
      return;
    }
    req.info = info;
    next();
  });
};

export const update = (req, res) => {
  var info_id = req.query.id;
  Info.findOneAndUpdate(
    { info_id: info_id },
    { $set: req.body },
    { useFindAndModify: false },
    (err, info) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Bạn không được phép thực hiện hành động này",
        });
      }
      res.json(info);
    }
  );
};
export const getinfo = (req, res) => {
  return res.json(req.info);
};

export const listinfo = (req, res) => {
  var class_name = req.query.info_class;
  var info_employee = req.query.info_employee;
  if (class_name) {
    Info.find({ info_class: class_name }, (err, info) => {
      if (err || !info) {
        res.status(400).json({
          message: "Không tìm thấy info",
        });
      }
      res.json(info);
    });
  }
  if (info_employee) {
    Info.find({ info_employee: info_employee }, (err, info) => {
      if (err || !info) {
        res.status(400).json({
          message: "Không tìm thấy info",
        });
      }
      res.json(info);
    });
  }
};
// hàm phân quyền trong Info
export const canViewInfo = (req, res, next) => {
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
        user.manage_view.indexOf("info_id") != -1 &&
        user.users_owner.indexOf("Phòng sản xuất") != -1
      ) {
        next();
      } else {
        res.status(403).json({
          error: "Không có quyền truy cập info",
        });
      }
    });
  } catch (ex) {
    res.status(400).send("Token không chính xác");
  }
};

