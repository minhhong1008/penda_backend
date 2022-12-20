// Import model
import Pingpong from "../models/pingpong";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";

export const create = (req, res) => {
  const pingpong = new Pingpong(req.body);
  pingpong.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm pingpong không thành công",
      });
    }
    res.json(acc);
  });
};
export const pingpongByID = (req, res, next, id) => {
  Pingpong.findOne({ pingpong_id: id }, (err, pingpong) => {
    if (err || !pingpong) {
      res.status(400).json({
        message: "Không tìm thấy pingpong",
      });
      return;
    }
    req.pingpong = pingpong;
    next();
  });
};

export const update = (req, res) => {
  var pingpong_id = req.query.id;
  Pingpong.findOneAndUpdate(
    { pingpong_id: pingpong_id },
    { $set: req.body },
    { useFindAndModify: false },
    (err, pingpong) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Bạn không được phép thực hiện hành động này",
        });
      }
      res.json(pingpong);
    }
  );
};
export const getpingpong = (req, res) => {
  return res.json(req.pingpong);
};

export const listpingpong = (req, res) => {
  var class_name = req.query.pingpong_class;
  var pingpong_employee = req.query.pingpong_employee;
  if (class_name) {
    Pingpong.find({ pingpong_class: class_name }, (err, pingpong) => {
      if (err || !pingpong) {
        res.status(400).json({
          message: "Không tìm thấy pingpong",
        });
      }
      res.json(pingpong);
    });
  }
  if (pingpong_employee) {
    Pingpong.find({ pingpong_employee: pingpong_employee }, (err, pingpong) => {
      if (err || !pingpong) {
        res.status(400).json({
          message: "Không tìm thấy pingpong",
        });
      }
      res.json(pingpong);
    });
  }
};

// hàm phân quyền trong Pingpong
export const canViewPingpong = (req, res, next) => {
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
        user.manage_view.indexOf("pingpong_id") != -1 &&
        user.users_owner.indexOf("Phòng sản xuất") != -1
      ) {
        next();
      } else {
        res.status(403).json({
          error: "Không có quyền truy cập pingpong",
        });
      }
    });
  } catch (ex) {
    res.status(400).send("Token không chính xác");
  }
};