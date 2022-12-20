// Import model
import Bank from "../models/bank";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";
export const create = (req, res) => {
  const bank = new Bank(req.body);
  bank.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm bank không thành công",
      });
    }
    res.json(acc);
  });
};
export const bankByID = (req, res, next, id) => {
  Bank.findOne({ bank_id: id }, (err, bank) => {
    if (err || !bank) {
      res.status(400).json({
        message: "Không tìm thấy bank",
      });
      return;
    }
    req.bank = bank;
    next();
  });
};

export const update = (req, res) => {
  var bank_id = req.query.id;
  Bank.findOneAndUpdate(
    { bank_id: bank_id },
    { $set: req.body },
    { useFindAndModify: false },
    (err, bank) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Bạn không được phép thực hiện hành động này",
        });
      }
      res.json(bank);
    }
  );
};
export const getbank = (req, res) => {
  return res.json(req.bank);
};

export const listbank = (req, res) => {
  var class_name = req.query.bank_class;
  var bank_employee = req.query.bank_employee;
  if (class_name) {
    Bank.find({ bank_class: class_name }, (err, bank) => {
      if (err || !bank) {
        res.status(400).json({
          message: "Không tìm thấy bank",
        });
      }
      res.json(bank);
    });
  }
  if (bank_employee) {
    Bank.find({ bank_employee: bank_employee }, (err, bank) => {
      if (err || !bank) {
        res.status(400).json({
          message: "Không tìm thấy bank",
        });
      }
      res.json(bank);
    });
  }
};

// hàm phân quyền trong Bank
export const canViewBank = (req, res, next) => {
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
        user.manage_view.indexOf("bank_id") != -1 &&
        user.users_owner.indexOf("Phòng sản xuất") != -1
      ) {
        next();
      } else {
        res.status(403).json({
          error: "Không có quyền truy cập bank",
        });
      }
    });
  } catch (ex) {
    res.status(400).send("Token không chính xác");
  }
};
