// Import model
import Paypal from "../models/paypal";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";

export const create = (req, res) => {
  const paypal = new Paypal(req.body);
  paypal.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm paypal không thành công",
      });
    }
    res.json(acc);
  });
};
export const paypalByID = (req, res, next, id) => {
  Paypal.findOne({ paypal_id: id }, (err, paypal) => {
    if (err || !paypal) {
      res.status(400).json({
        message: "Không tìm thấy paypal",
      });
      return;
    }
    req.paypal = paypal;
    next();
  });
};

export const update = (req, res) => {
  var paypal_id = req.query.id;
  Paypal.findOneAndUpdate(
    { paypal_id: paypal_id },
    { $set: req.body },
    { useFindAndModify: false },
    (err, paypal) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Bạn không được phép thực hiện hành động này",
        });
      }
      res.json(paypal);
    }
  );
};
export const getpaypal = (req, res) => {
  return res.json(req.paypal);
};

export const listpaypal = (req, res) => {
  var class_name = req.query.paypal_class;
  var paypal_employee = req.query.paypal_employee;
  if (class_name) {
    Paypal.find({ paypal_class: class_name }, (err, paypal) => {
      if (err || !paypal) {
        res.status(400).json({
          message: "Không tìm thấy paypal",
        });
      }
      res.json(paypal);
    });
  }
  if (paypal_employee) {
    Paypal.find({ paypal_employee: paypal_employee }, (err, paypal) => {
      if (err || !paypal) {
        res.status(400).json({
          message: "Không tìm thấy paypal",
        });
      }
      res.json(paypal);
    });
  }
};

// hàm phân quyền trong Paypal
export const canViewPaypal = (req, res, next) => {
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
        user.manage_view.indexOf("paypal_id") != -1 &&
        user.users_owner.indexOf("Phòng sản xuất") != -1
      ) {
        next();
      } else {
        res.status(403).json({
          error: "Không có quyền truy cập paypal",
        });
      }
    });
  } catch (ex) {
    res.status(400).send("Token không chính xác");
  }
};