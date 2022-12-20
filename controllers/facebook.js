// Import model
import Facebook from "../models/facebook";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";

export const create = (req, res) => {
  const facebook = new Facebook(req.body);
  facebook.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm facebook không thành công",
      });
    }
    res.json(acc);
  });
};
export const facebookByID = (req, res, next, id) => {
  Facebook.findOne({ facebook_id: id }, (err, facebook) => {
    if (err || !facebook) {
      res.status(400).json({
        message: "Không tìm thấy facebook",
      });
      return;
    }
    req.facebook = facebook;
    next();
  });
};

export const update = (req, res) => {
  var facebook_id = req.query.id;
  Facebook.findOneAndUpdate(
    { facebook_id: facebook_id },
    { $set: req.body },
    { useFindAndModify: false },
    (err, facebook) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Bạn không được phép thực hiện hành động này",
        });
      }
      res.json(facebook);
    }
  );
};
export const getfacebook = (req, res) => {
  return res.json(req.facebook);
};

export const listfacebook = (req, res) => {
  var class_name = req.query.facebook_class;
  var facebook_employee = req.query.facebook_employee;
  if (class_name) {
    Facebook.find({ facebook_class: class_name }, (err, facebook) => {
      if (err || !facebook) {
        res.status(400).json({
          message: "Không tìm thấy facebook",
        });
      }
      res.json(facebook);
    });
  }
  if (facebook_employee) {
    Facebook.find({ facebook_employee: facebook_employee }, (err, facebook) => {
      if (err || !facebook) {
        res.status(400).json({
          message: "Không tìm thấy facebook",
        });
      }
      res.json(facebook);
    });
  }
};

// hàm phân quyền trong Facebook
export const canViewFacebook = (req, res, next) => {
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
        user.manage_view.indexOf("facebook_id") != -1 &&
        user.users_owner.indexOf("Phòng sản xuất") != -1
      ) {
        next();
      } else {
        res.status(403).json({
          error: "Không có quyền truy cập facebook",
        });
      }
    });
  } catch (ex) {
    res.status(400).send("Token không chính xác");
  }
};
