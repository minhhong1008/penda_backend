// Import model
import Paypal from "../models/paypal";

export const create = (req, res) => {
  const paypal = new Paypal(req.body);
  paypal.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm paypal không thành công",
      });
    }
    res.json(acc);
  });
};
export const paypalByID = (req, res, next, id) => {
  Paypal.findOne({ paypal_id: id }, (err, paypal) => {
    if (err || !paypal) {
      res.status(400).json({
        message: "Không tìm thấy paypal",
      });
      return;
    }
    req.paypal = paypal;
    next();
  });
};

export const update = (req, res) => {
  var paypal_id = req.query.id;
  Paypal.findOneAndUpdate(
    { paypal_id: paypal_id },
    { $set: req.body },
    { useFindAndModify: false },
    (err, paypal) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Bạn không được phép thực hiện hành động này",
        });
      }
      res.json(paypal);
    }
  );
};
export const getpaypal = (req, res) => {
  return res.json(req.paypal);
};

export const listpaypal = (req, res) => {
  var class_name = req.query.paypal_class;
  var paypal_employee = req.query.paypal_employee;
  if (class_name) {
    Paypal.find({ paypal_class: class_name }, (err, paypal) => {
      if (err || !paypal) {
        res.status(400).json({
          message: "Không tìm thấy paypal",
        });
      }
      res.json(paypal);
    });
  }
  if (paypal_employee) {
    Paypal.find({ paypal_employee: paypal_employee }, (err, paypal) => {
      if (err || !paypal) {
        res.status(400).json({
          message: "Không tìm thấy paypal",
        });
      }
      res.json(paypal);
    });
  }
};