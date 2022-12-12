// Import model
import Etsy from "../models/info";

export const create = (req, res) => {
  const info = new Etsy(req.body);
  info.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm info không thành công",
      });
    }
    res.json(acc);
  });
};
export const infoByID = (req, res, next, id) => {
  Etsy.findOne({ info_id: id }, (err, info) => {
    if (err || !info) {
      res.status(400).json({
        message: "Không tìm thấy info",
      });
      return;
    }
    req.info = info;
    next();
  });
};

export const update = (req, res) => {
  var info_id = req.query.id;
  Etsy.findOneAndUpdate(
    { info_id: info_id },
    { $set: req.body },
    { useFindAndModify: false },
    (err, info) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Bạn không được phép thực hiện hành động này",
        });
      }
      res.json(info);
    }
  );
};
export const getinfo = (req, res) => {
  return res.json(req.info);
};

export const listinfo = (req, res) => {
  var class_name = req.query.info_class;
  var info_employee = req.query.info_employee;
  if (class_name) {
    Etsy.find({ info_class: class_name }, (err, info) => {
      if (err || !info) {
        res.status(400).json({
          message: "Không tìm thấy info",
        });
      }
      res.json(info);
    });
  }
  if (info_employee) {
    Etsy.find({ info_employee: info_employee }, (err, info) => {
      if (err || !info) {
        res.status(400).json({
          message: "Không tìm thấy info",
        });
      }
      res.json(info);
    });
  }
};


