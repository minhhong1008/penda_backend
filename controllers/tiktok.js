// Import model
import Tiktok from "../models/tiktok";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";
export const create = (req, res) => {
  const tiktok = new Tiktok(req.body);
  tiktok.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm tiktok không thành công",
      });
    }
    res.json(acc);
  });
};
export const tiktokByID = (req, res, next, id) => {
  Tiktok.findOne({ tiktok_id: id }, (err, tiktok) => {
    if (err || !tiktok) {
      res.status(400).json({
        message: "Không tìm thấy tiktok",
      });
      return;
    }
    req.tiktok = tiktok;
    next();
  });
};

export const update = (req, res) => {
  var tiktok_id = req.query.id;
  Tiktok.findOneAndUpdate(
    { tiktok_id: tiktok_id },
    { $set: req.body },
    { useFindAndModify: false },
    (err, tiktok) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Bạn không được phép thực hiện hành động này",
        });
      }
      res.json(tiktok);
    }
  );
};
export const gettiktok = (req, res) => {
  return res.json(req.tiktok);
};

export const listtiktok = (req, res) => {
  var class_name = req.query.tiktok_class;
  var tiktok_employee = req.query.tiktok_employee;
  if (class_name) {
    Tiktok.find({ tiktok_class: class_name }, (err, tiktok) => {
      if (err || !tiktok) {
        res.status(400).json({
          message: "Không tìm thấy tiktok",
        });
      }
      res.json(tiktok);
    });
  }
  if (tiktok_employee) {
    Tiktok.find({ tiktok_employee: tiktok_employee }, (err, tiktok) => {
      if (err || !tiktok) {
        res.status(400).json({
          message: "Không tìm thấy tiktok",
        });
      }
      res.json(tiktok);
    });
  }
};

// hàm phân quyền trong Tiktok
export const canViewTiktok = (req, res, next) => {
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
        user.manage_view.indexOf("tiktok_id") != -1 &&
        user.users_owner.indexOf("Phòng sản xuất") != -1
      ) {
        next();
      } else {
        res.status(403).json({
          error: "Không có quyền truy cập tiktok",
        });
      }
    });
  } catch (ex) {
    res.status(400).send("Token không chính xác");
  }
};

