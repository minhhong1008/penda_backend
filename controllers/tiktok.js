// Import model
import Etsy from "../models/tiktok";

export const create = (req, res) => {
  const tiktok = new Etsy(req.body);
  tiktok.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm tiktok không thành công",
      });
    }
    res.json(acc);
  });
};
export const tiktokByID = (req, res, next, id) => {
  Etsy.findOne({ tiktok_id: id }, (err, tiktok) => {
    if (err || !tiktok) {
      res.status(400).json({
        message: "Không tìm thấy tiktok",
      });
      return;
    }
    req.tiktok = tiktok;
    next();
  });
};

export const update = (req, res) => {
  var tiktok_id = req.query.id;
  Etsy.findOneAndUpdate(
    { tiktok_id: tiktok_id },
    { $set: req.body },
    { useFindAndModify: false },
    (err, tiktok) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Bạn không được phép thực hiện hành động này",
        });
      }
      res.json(tiktok);
    }
  );
};
export const gettiktok = (req, res) => {
  return res.json(req.tiktok);
};

export const listtiktok = (req, res) => {
  var class_name = req.query.tiktok_class;
  var tiktok_employee = req.query.tiktok_employee;
  if (class_name) {
    Etsy.find({ tiktok_class: class_name }, (err, tiktok) => {
      if (err || !tiktok) {
        res.status(400).json({
          message: "Không tìm thấy tiktok",
        });
      }
      res.json(tiktok);
    });
  }
  if (tiktok_employee) {
    Etsy.find({ tiktok_employee: tiktok_employee }, (err, tiktok) => {
      if (err || !tiktok) {
        res.status(400).json({
          message: "Không tìm thấy tiktok",
        });
      }
      res.json(tiktok);
    });
  }
};


