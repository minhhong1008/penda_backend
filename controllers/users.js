// Import model
import Users from '../models/user';
import jwt from "jsonwebtoken"; // Tạo ra mã JWT

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
   
    Users.find({ users_status: users_status }).sort({users_sort: "ascending"}).exec((err, users) => {
      console.log(users)
      if (err || !users) {
        res.status(400).json({
          message: "Không tìm thấy users vcc",
        });
      }
      
      res.json(users);
    });
   
  }
};

export const listusers_timesheets = (req, res) => {
  var users_status = "Active";

  if (users_status) {
   
    Users.find({ users_status: users_status }).sort({users_sort: "ascending"}).exec((err, users) => {
      console.log(users)
      if (err || !users) {
        res.status(400).json({
          message: "Không tìm thấy users vcc",
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
    console.log("áddddd")
    req.users = users;
    next();
  });
};

export const update = (req, res) => {
  var users_id = req.query.id;
  Users.findOneAndUpdate(
    { users_id: users_id },
    { $set: req.body },
    { useFindAndModify: false },
    (err, users) => {
      if (err) {
        console.log(err);
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
      if (!user) {
        return res.status(403).json({
          error: "Bạn chưa đăng nhập",
        });
      }
      if (
        user.manage_view.indexOf("users_id") != -1 &&
        user.users_owner.indexOf("Phòng sản xuất") != -1
      ) {
        next();
      } else {
        res.status(403).json({
          error: "Không có quyền truy cập users",
        });
      }
    });
  } catch (ex) {
    res.status(400).send("Token không chính xác");
  }
};
