// Import model
import Mail from "../models/mail";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";
export const create = (req, res) => {
  const mail = new Mail(req.body);
  mail.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm mail không thành công",
      });
    }
    res.json(acc);
  });
};
export const mailByID = (req, res, next, id) => {
  Mail.findOne({ mail_id: id }, (err, mail) => {
    if (err || !mail) {
      res.status(400).json({
        message: "Không tìm thấy mail",
      });
      return;
    }
    req.mail = mail;
    next();
  });
};

export const update = (req, res) => {
  var mail_id = req.query.id;
  Mail.findOneAndUpdate(
    { mail_id: mail_id },
    { $set: req.body },
    { useFindAndModify: false },
    (err, mail) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Bạn không được phép thực hiện hành động này",
        });
      }
      res.json(mail);
    }
  );
};
export const getmail = (req, res) => {
  return res.json(req.mail);
};

export const listmail = (req, res) => {
  var class_name = req.query.mail_class;
  var mail_employee = req.query.mail_employee;
  if (class_name) {
    Mail.find({ mail_class: class_name }, (err, mail) => {
      if (err || !mail) {
        res.status(400).json({
          message: "Không tìm thấy mail",
        });
      }
      res.json(mail);
    });
  }
  if (mail_employee) {
    Mail.find({ mail_employee: mail_employee }, (err, mail) => {
      if (err || !mail) {
        res.status(400).json({
          message: "Không tìm thấy mail",
        });
      }
      res.json(mail);
    });
  }
};

// hàm phân quyền trong Mail
export const canViewMail = (req, res, next) => {
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
        user.manage_view.indexOf("mail_id") != -1 &&
        user.users_owner.indexOf("Phòng sản xuất") != -1
      ) {
        next();
      } else {
        res.status(403).json({
          error: "Không có quyền truy cập mail",
        });
      }
    });
  } catch (ex) {
    res.status(400).send("Token không chính xác");
  }
};