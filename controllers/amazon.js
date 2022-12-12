// Import model
import Amazon from "../models/amazon";

export const create = (req, res) => {
  const amazon = new Amazon(req.body);
  amazon.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm amazon không thành công",
      });
    }
    res.json(acc);
  });
};

export const getamazon = (req, res) => {
  return res.json(req.amazon);
};

export const listamazon = (req, res) => {
  var class_name = req.query.amazon_class;
  var amazon_employee = req.query.amazon_employee;
  if (class_name) {
    Amazon.find({ amazon_class: class_name }, (err, amazon) => {
      if (err || !amazon) {
        res.status(400).json({
          message: "Không tìm thấy amazon",
        });
      }
      res.json(amazon);
    });
  }
  if (amazon_employee) {
    Amazon.find({ amazon_employee: amazon_employee }, (err, amazon) => {
      if (err || !amazon) {
        res.status(400).json({
          message: "Không tìm thấy amazon",
        });
      }
      res.json(amazon);
    });
  }
};

export const amazonByID = (req, res, next, id) => {
  Amazon.findOne({ amazon_id: id }, (err, amazon) => {
    if (err || !amazon) {
      res.status(400).json({
        message: "Không tìm thấy amazon",
      });
      return;
    }
    req.amazon = amazon;
    next();
  });
};

export const update = (req, res) => {
  var amazon_id = req.query.id;
  Amazon.findOneAndUpdate(
    { amazon_id: amazon_id },
    { $set: req.body },
    { useFindAndModify: false },
    (err, amazon) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Bạn không được phép thực hiện hành động này",
        });
      }
      res.json(amazon);
    }
  );
};
