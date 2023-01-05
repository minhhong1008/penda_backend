// Import model
import Ebayitem from "../models/ebayitem";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";
export const create = (req, res) => {
  const ebayitem = new Ebayitem(req.body);
  ebayitem.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm ebayitem không thành công",
      });
    }
    res.json(acc);
  });
};

export const getebayitem = (req, res) => {
  return res.json(req.ebayitem);
};

export const listebayitem = (req, res) => {
  var class_name = req.query.ebayitem_class;
  var ebayitem_employee = req.query.ebayitem_employee;
  if (class_name) {
    Ebayitem.find({ ebayitem_class: class_name }, (err, ebayitem) => {
      if (err || !ebayitem) {
        res.status(400).json({
          message: "Không tìm thấy ebayitem",
        });
      }
      res.json(ebayitem);
    });
  }
  if (ebayitem_employee) {
    Ebayitem.find({ ebayitem_employee: ebayitem_employee }, (err, ebayitem) => {
      if (err || !ebayitem) {
        res.status(400).json({
          message: "Không tìm thấy ebayitem",
        });
      }
      res.json(ebayitem);
    });
  }
};

export const ebayitemByID = (req, res, next, id) => {
  Ebayitem.findOne({ ebayitem_id: id }, (err, ebayitem) => {
    if (err || !ebayitem) {
      res.status(400).json({
        message: "Không tìm thấy ebayitem",
      });
      return;
    }
    req.ebayitem = ebayitem;
    next();
  });
};

export const update = (req, res) => {
  var ebayitem_id = req.query.id;
  Ebayitem.findOneAndUpdate(
    { ebayitem_id: ebayitem_id },
    { $set: req.body },
    { useFindAndModify: false },
    (err, ebayitem) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Bạn không được phép thực hiện hành động này",
        });
      }
      res.json(ebayitem);
    }
  );
};

// hàm phân quyền trong Ebayitem
export const canViewEbayitem = (req, res, next) => {
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
        user.manage_view.indexOf("ebayitem_id") != -1 &&
        user.users_owner.indexOf("Phòng sản xuất") != -1
      ) {
        next();
      } else {
        res.status(403).json({
          error: "Không có quyền truy cập ebayitem",
        });
      }
    });
  } catch (ex) {
    res.status(400).send("Token không chính xác");
  }
};