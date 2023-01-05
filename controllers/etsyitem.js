// Import model
import Etsyitem from "../models/etsyitem";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";
export const create = (req, res) => {
  const etsyitem = new Etsyitem(req.body);
  etsyitem.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm etsyitem không thành công",
      });
    }
    res.json(acc);
  });
};
export const etsyitemByID = (req, res, next, id) => {
  Etsyitem.findOne({ etsyitem_id: id }, (err, etsyitem) => {
    if (err || !etsyitem) {
      res.status(400).json({
        message: "Không tìm thấy etsyitem",
      });
      return;
    }
    req.etsyitem = etsyitem;
    next();
  });
};

export const update = (req, res) => {
  var etsyitem_id = req.query.id;
  Etsyitem.findOneAndUpdate(
    { etsyitem_id: etsyitem_id },
    { $set: req.body },
    { useFindAndModify: false },
    (err, etsyitem) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Bạn không được phép thực hiện hành động này",
        });
      }
      res.json(etsyitem);
    }
  );
};
export const getetsyitem = (req, res) => {
  return res.json(req.etsyitem);
};

export const listetsyitem = (req, res) => {
  var class_name = req.query.etsyitem_class;
  var etsyitem_employee = req.query.etsyitem_employee;
  if (class_name) {
    Etsyitem.find({ etsyitem_class: class_name }, (err, etsyitem) => {
      if (err || !etsyitem) {
        res.status(400).json({
          message: "Không tìm thấy etsyitem",
        });
      }
      res.json(etsyitem);
    });
  }
  if (etsyitem_employee) {
    Etsyitem.find({ etsyitem_employee: etsyitem_employee }, (err, etsyitem) => {
      if (err || !etsyitem) {
        res.status(400).json({
          message: "Không tìm thấy etsyitem",
        });
      }
      res.json(etsyitem);
    });
  }
};
// hàm phân quyền trong Etsyitem
export const canViewEtsyitem = (req, res, next) => {
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
        user.manage_view.indexOf("etsyitem_id") != -1 &&
        user.users_owner.indexOf("Phòng sản xuất") != -1
      ) {
        next();
      } else {
        res.status(403).json({
          error: "Không có quyền truy cập etsyitem",
        });
      }
    });
  } catch (ex) {
    res.status(400).send("Token không chính xác");
  }
};