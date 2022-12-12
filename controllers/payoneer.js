// Import model
import Payoneer from "../models/payoneer";

export const create = (req, res) => {
  const payoneer = new Payoneer(req.body);
  payoneer.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm payoneer không thành công",
      });
    }
    res.json(acc);
  });
};

export const getpayoneer = (req, res) => {
  return res.json(req.payoneer);
};

export const listpayoneer = (req, res) => {
  var class_name = req.query.payoneer_class;
  var payoneer_employee = req.query.payoneer_employee;
  if (class_name) {
    Payoneer.find({ payoneer_class: class_name }, (err, payoneer) => {
      if (err || !payoneer) {
        res.status(400).json({
          message: "Không tìm thấy payoneer",
        });
      }
      res.json(payoneer);
    });
  }
  if (payoneer_employee) {
    Payoneer.find({ payoneer_employee: payoneer_employee }, (err, payoneer) => {
      if (err || !payoneer) {
        res.status(400).json({
          message: "Không tìm thấy payoneer",
        });
      }
      res.json(payoneer);
    });
  }
};

export const payoneerByID = (req, res, next, id) => {
  Payoneer.findOne({ payoneer_id: id }, (err, payoneer) => {
    if (err || !payoneer) {
      res.status(400).json({
        message: "Không tìm thấy payoneer",
      });
      return;
    }
    req.payoneer = payoneer;
    next();
  });
};

export const update = (req, res) => {
  var payoneer_id = req.query.id;
  Payoneer.findOneAndUpdate(
    { payoneer_id: payoneer_id },
    { $set: req.body },
    { useFindAndModify: false },
    (err, payoneer) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Bạn không được phép thực hiện hành động này",
        });
      }
      res.json(payoneer);
    }
  );
};
