// Import model
import Etsy from "../models/etsy";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";


export const create = (req, res) => {
  const etsy = new Etsy(req.body);
  etsy.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm etsy không thành công",
      });
    }
    res.json(acc);
  });
};
export const etsyByID = (req, res, next, id) => {
  Etsy.findOne({ etsy_id: id }, (err, etsy) => {
    if (err || !etsy) {
      res.status(400).json({
        message: "Không tìm thấy etsy",
      });
      return;
    }
    req.etsy = etsy;
    next();
  });
};

export const update = (req, res) => {
  var etsy_id = req.query.id;
  Etsy.findOneAndUpdate(
    { etsy_id: etsy_id },
    { $set: req.body },
    { useFindAndModify: false },
    (err, etsy) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Bạn không được phép thực hiện hành động này",
        });
      }
      res.json(etsy);
    }
  );
};
export const getetsy = (req, res) => {
  return res.json(req.etsy);
};

export const listetsy = (req, res) => {
  var class_name = req.query.etsy_class;
  var etsy_employee = req.query.etsy_employee;
  if (class_name) {
    Etsy.find({ etsy_class: class_name }, (err, etsy) => {
      if (err || !etsy) {
        res.status(400).json({
          message: "Không tìm thấy etsy",
        });
      }
      // Reverse sắp xếp các ebay theo thứ tự tạo mới nhất
      res.json(etsy.reverse());
    });
  }
  if (etsy_employee) {
    Etsy.find({ etsy_employee: etsy_employee }, (err, etsy) => {
      if (err || !etsy) {
        res.status(400).json({
          message: "Không tìm thấy etsy",
        });
      }
      res.json(etsy.reverse());
    });
  }
};

export const getCountEtsy_class = (req, res) => {
  Etsy.aggregate([
    {
      $group: {
        _id: "$etsy_class",
        count: {
          $count: {},
        },
      },
    },
  ]).exec((err, data) => {
    
    res.json({
      status: "success",
      data: data
    })
  });
};

// hàm phân quyền trong Etsy
export const canViewEtsy = (req, res, next) => {
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
        user.manage_view.indexOf("etsy_id") != -1 &&
        user.users_owner.indexOf("Phòng sản xuất") != -1
      ) {
        next();
      } else {
        res.status(403).json({
          error: "Không có quyền truy cập etsy",
        });
      }
    });
  } catch (ex) {
    res.status(400).send("Token không chính xác");
  }
};
