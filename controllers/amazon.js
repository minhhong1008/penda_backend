// Import model
import Amazon from "../models/amazon";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";

export const create = (req, res) => {
  const amazon = new Amazon(req.body);
  amazon.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm amazon không thành công",
      });
    }
    res.json(acc);
  });
};

export const getamazon = (req, res) => {
  return res.json(req.amazon);
};

export const listamazon = (req, res) => {
  var class_name = req.query.amazon_class;
  var amazon_employee = req.query.amazon_employee;
  if (class_name) {
    Amazon.find({ amazon_class: class_name }, (err, amazon) => {
      if (err || !amazon) {
        res.status(400).json({
          message: "Không tìm thấy amazon",
        });
      }
      res.json(amazon);
    });
  }
  if (amazon_employee) {
    Amazon.find({ amazon_employee: amazon_employee }, (err, amazon) => {
      if (err || !amazon) {
        res.status(400).json({
          message: "Không tìm thấy amazon",
        });
      }
      res.json(amazon);
    });
  }
};

export const amazonByID = (req, res, next, id) => {
  Amazon.findOne({ amazon_id: id }, (err, amazon) => {
    if (err || !amazon) {
      res.status(400).json({
        message: "Không tìm thấy amazon",
      });
      return;
    }
    req.amazon = amazon;
    next();
  });
};

export const update = (req, res) => {
  var amazon_id = req.query.id;
  Amazon.findOneAndUpdate(
    { amazon_id: amazon_id },
    { $set: req.body },
    { useFindAndModify: false },
    (err, amazon) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Bạn không được phép thực hiện hành động này",
        });
      }
      res.json(amazon);
    }
  );
};

// hàm phân quyền trong Amazon
export const canViewAmazon = (req, res, next) => {
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
        user.manage_view.indexOf("amazon_id") != -1 &&
        user.users_owner.indexOf("Phòng sản xuất") != -1
      ) {
        next();
      } else {
        res.status(403).json({
          error: "Không có quyền truy cập amazon",
        });
      }
    });
  } catch (ex) {
    res.status(400).send("Token không chính xác");
  }
};
