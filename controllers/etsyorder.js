// Import model
import Etsyorder from "../models/etsyorder";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";
export const create = (req, res) => {
  const etsyorder = new Etsyorder(req.body);
  etsyorder.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm etsyorder không thành công",
      });
    }
    res.json(acc);
  });
};
export const etsyorderByID = (req, res, next, id) => {
  Etsyorder.findOne({ etsyorder_id: id }, (err, etsyorder) => {
    if (err || !etsyorder) {
      res.status(400).json({
        message: "Không tìm thấy etsyorder",
      });
      return;
    }
    req.etsyorder = etsyorder;
    next();
  });
};

export const update = (req, res) => {
  var etsyorder_id = req.query.id;
  Etsyorder.findOneAndUpdate(
    { etsyorder_id: etsyorder_id },
    { $set: req.body },
    { useFindAndModify: false },
    (err, etsyorder) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Bạn không được phép thực hiện hành động này",
        });
      }
      res.json(etsyorder);
    }
  );
};
export const getetsyorder = (req, res) => {
  return res.json(req.etsyorder);
};

export const listetsyorder = (req, res) => {
  var class_name = req.query.etsyorder_class;
  var etsyorder_employee = req.query.etsyorder_employee;
  if (class_name) {
    Etsyorder.find({ etsyorder_class: class_name }, (err, etsyorder) => {
      if (err || !etsyorder) {
        res.status(400).json({
          message: "Không tìm thấy etsyorder",
        });
      }
      res.json(etsyorder);
    });
  }
  if (etsyorder_employee) {
    Etsyorder.find({ etsyorder_employee: etsyorder_employee }, (err, etsyorder) => {
      if (err || !etsyorder) {
        res.status(400).json({
          message: "Không tìm thấy etsyorder",
        });
      }
      res.json(etsyorder);
    });
  }
};
// hàm phân quyền trong Etsyorder
export const canViewEtsyorder = (req, res, next) => {
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
        user.manage_view.indexOf("etsyorder_id") != -1 &&
        user.users_owner.indexOf("Phòng sản xuất") != -1
      ) {
        next();
      } else {
        res.status(403).json({
          error: "Không có quyền truy cập etsyorder",
        });
      }
    });
  } catch (ex) {
    res.status(400).send("Token không chính xác");
  }
};

