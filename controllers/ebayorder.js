// Import model
import Ebayorder from "../models/ebayorder";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";
export const create = (req, res) => {
  const ebayorder = new Ebayorder(req.body);
  ebayorder.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm ebayorder không thành công",
      });
    }
    res.json(acc);
  });
};

export const getebayorder = (req, res) => {
  return res.json(req.ebayorder);
};

export const listebayorder = (req, res) => {
  var class_name = req.query.ebayorder_class;
  var ebayorder_employee = req.query.ebayorder_employee;
  if (class_name) {
    Ebayorder.find({ ebayorder_class: class_name }, (err, ebayorder) => {
      if (err || !ebayorder) {
        res.status(400).json({
          message: "Không tìm thấy ebayorder",
        });
      }
      res.json(ebayorder);
    });
  }
  if (ebayorder_employee) {
    Ebayorder.find({ ebayorder_employee: ebayorder_employee }, (err, ebayorder) => {
      if (err || !ebayorder) {
        res.status(400).json({
          message: "Không tìm thấy ebayorder",
        });
      }
      res.json(ebayorder);
    });
  }
};

export const ebayorderByID = (req, res, next, id) => {
  Ebayorder.findOne({ ebayorder_id: id }, (err, ebayorder) => {
    if (err || !ebayorder) {
      res.status(400).json({
        message: "Không tìm thấy ebayorder",
      });
      return;
    }
    req.ebayorder = ebayorder;
    next();
  });
};

export const update = (req, res) => {
  var ebayorder_id = req.query.id;
  Ebayorder.findOneAndUpdate(
    { ebayorder_id: ebayorder_id },
    { $set: req.body },
    { useFindAndModify: false },
    (err, ebayorder) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Bạn không được phép thực hiện hành động này",
        });
      }
      res.json(ebayorder);
    }
  );
};
// hàm phân quyền trong Ebayorder
export const canViewEbayorder = (req, res, next) => {
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
        user.manage_view.indexOf("ebayorder_id") != -1 &&
        user.users_owner.indexOf("Phòng sản xuất") != -1
      ) {
        next();
      } else {
        res.status(403).json({
          error: "Không có quyền truy cập ebayorder",
        });
      }
    });
  } catch (ex) {
    res.status(400).send("Token không chính xác");
  }
};