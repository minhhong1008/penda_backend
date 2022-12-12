// Import model
import Etsy from "../models/shopee";

export const create = (req, res) => {
  const shopee = new Etsy(req.body);
  shopee.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm shopee không thành công",
      });
    }
    res.json(acc);
  });
};
export const shopeeByID = (req, res, next, id) => {
  Etsy.findOne({ shopee_id: id }, (err, shopee) => {
    if (err || !shopee) {
      res.status(400).json({
        message: "Không tìm thấy shopee",
      });
      return;
    }
    req.shopee = shopee;
    next();
  });
};

export const update = (req, res) => {
  var shopee_id = req.query.id;
  Etsy.findOneAndUpdate(
    { shopee_id: shopee_id },
    { $set: req.body },
    { useFindAndModify: false },
    (err, shopee) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Bạn không được phép thực hiện hành động này",
        });
      }
      res.json(shopee);
    }
  );
};
export const getshopee = (req, res) => {
  return res.json(req.shopee);
};

export const listshopee = (req, res) => {
  var class_name = req.query.shopee_class;
  var shopee_employee = req.query.shopee_employee;
  if (class_name) {
    Etsy.find({ shopee_class: class_name }, (err, shopee) => {
      if (err || !shopee) {
        res.status(400).json({
          message: "Không tìm thấy shopee",
        });
      }
      res.json(shopee);
    });
  }
  if (shopee_employee) {
    Etsy.find({ shopee_employee: shopee_employee }, (err, shopee) => {
      if (err || !shopee) {
        res.status(400).json({
          message: "Không tìm thấy shopee",
        });
      }
      res.json(shopee);
    });
  }
};


