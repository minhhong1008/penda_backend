// Import model
import Users from "../models/user";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import crypto from "crypto";
const { v1: uuidv1 } = require("uuid");

export const hashPassword = (password) => {
  if (!password) {
    return "";
  }
  try {
    let salt = uuidv1();
    return {
      pass: crypto.createHmac("sha1", salt).update(password).digest("hex"),
      salt: salt,
    };
  } catch (error) {
    return "";
  }
};

export const create = (req, res) => {
  const users = new Users(req.body);
  users.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm users không thành công",
      });
    }
    res.json(acc);
  });
};

export const getusers = (req, res) => {
  return res.json(req.users);
};

export const listusers = (req, res) => {
  var users_status = req.query.users_status;
  if (users_status) {
    Users.find({ users_status: users_status })
      .sort({ users_sort: "ascending" })
      .collation({ locale: "en_US", numericOrdering: true })
      .exec((err, users) => {
        if (err || !users) {
          res.status(400).json({
            message: "Không tìm thấy users",
          });
        }

        res.json(users);
      });
  }
};

export const listusers_timesheets = (req, res) => {
  var users_status = "Active";

  if (users_status) {
    Users.find({ users_status: users_status })
      .sort({ users_sort: "ascending" })
      .exec((err, users) => {
        if (err || !users) {
          res.status(400).json({
            message: "Không tìm thấy users",
          });
        }

        res.json(users);
      });
  }
};

export const usersByID = (req, res, next, id) => {
  Users.findOne({ users_id: id }, (err, users) => {
    if (err || !users) {
      res.status(400).json({
        message: "Không tìm thấy users",
      });
      return;
    }

    req.users = users;
    next();
  });
};

export const update = (req, res) => {
  let newUser = JSON.parse(JSON.stringify(req.body));
  let { pass, salt } = hashPassword(req.body.users_passwords);
  newUser.salt = salt;
  newUser.hashed_password = pass;
  var users_id = req.query.id;
  for (const key in newUser) {
    if (newUser[key] == "") {
      delete newUser[key];
    }
  }
  Users.findOneAndUpdate(
    { users_id: users_id },
    { $set: newUser },
    { useFindAndModify: false },
    (err, users) => {
      if (err) {
        return res.status(400).json({
          error: "Bạn không được phép thực hiện hành động này",
        });
      }
      res.json(users);
    }
  );
};

// hàm phân quyền trong Users
export const canViewUsers = (req, res, next) => {
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
      if (user.users_owner.indexOf("Phòng hành chính nhân sự") != -1) {
        next();
      } else {
        res.status(403).json({
          error: "Không có quyền truy cập user",
        });
      }
    });
  } catch (ex) {
    res.status(400).send("Token không chính xác");
  }
};
