// Import model
import Ebay from "../models/ebay";

export const create = (req, res) => {
  const ebay = new Ebay(req.body);
  ebay.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm ebay không thành công",
      });
    }
    res.json(acc);
  });
};

export const getebay = (req, res) => {
  return res.json(req.ebay);
};

export const listebay = (req, res) => {
  var class_name = req.query.ebay_class;
  var ebay_employee = req.query.ebay_employee;
  if (class_name) {
    Ebay.find({ ebay_class: class_name }, (err, ebay) => {
      if (err || !ebay) {
        res.status(400).json({
          message: "Không tìm thấy ebay",
        });
      }
      res.json(ebay);
    });
  }
  if (ebay_employee) {
    Ebay.find({ ebay_employee: ebay_employee }, (err, ebay) => {
      if (err || !ebay) {
        res.status(400).json({
          message: "Không tìm thấy ebay",
        });
      }
      res.json(ebay);
    });
  }
};

export const ebayByID = (req, res, next, id) => {
  Ebay.findOne({ ebay_id: id }, (err, ebay) => {
    if (err || !ebay) {
      res.status(400).json({
        message: "Không tìm thấy ebay",
      });
      return;
    }
    req.ebay = ebay;
    next();
  });
};

export const update = (req, res) => {
  var ebay_id = req.query.id;
  Ebay.findOneAndUpdate(
    { ebay_id: ebay_id },
    { $set: req.body },
    { useFindAndModify: false },
    (err, ebay) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Bạn không được phép thực hiện hành động này",
        });
      }
      res.json(ebay);
    }
  );
};
