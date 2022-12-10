// Import model
import bank from "../models/bank";

export const create = (req, res) => {
  const bank = new bank(req.body);
  bank.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm bank không thành công",
      });
    }
    res.json(acc);
  });
};

export const getbank = (req, res) => {
  return res.json(req.bank);
};

export const listbank = (req, res) => {
  var class_name = req.query.bank_class;
  var bank_employee = req.query.bank_employee;
  if (class_name) {
    bank.find({ bank_class: class_name }, (err, bank) => {
      if (err || !bank) {
        res.status(400).json({
          message: "Không tìm thấy bank",
        });
      }
      res.json(bank);
    });
  }
  if (bank_employee) {
    bank.find({ bank_employee: bank_employee }, (err, bank) => {
      if (err || !bank) {
        res.status(400).json({
          message: "Không tìm thấy bank",
        });
      }
      res.json(bank);
    });
  }
};

export const bankByID = (req, res, next, id) => {
  bank.findOne({ bank_id: id }, (err, bank) => {
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
  console.log(req.body);
  bank.findOneAndUpdate(
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
