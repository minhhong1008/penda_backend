// Import model
import Etsy from "../models/etsy";

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
      res.json(etsy);
    });
  }
  if (etsy_employee) {
    Etsy.find({ etsy_employee: etsy_employee }, (err, etsy) => {
      if (err || !etsy) {
        res.status(400).json({
          message: "Không tìm thấy etsy",
        });
      }
      res.json(etsy);
    });
  }
};


