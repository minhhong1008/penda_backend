// Import model
import Device from "../models/device";

export const create = (req, res) => {
  const device = new Device(req.body);
  device.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm device không thành công",
      });
    }
    res.json(acc);
  });
};
export const deviceByID = (req, res, next, id) => {
  Device.findOne({ device_id: id }, (err, device) => {
    if (err || !device) {
      res.status(400).json({
        message: "Không tìm thấy device",
      });
      return;
    }
    req.device = device;
    next();
  });
};

export const update = (req, res) => {
  var device_id = req.query.id;
  Device.findOneAndUpdate(
    { device_id: device_id },
    { $set: req.body },
    { useFindAndModify: false },
    (err, device) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Bạn không được phép thực hiện hành động này",
        });
      }
      res.json(device);
    }
  );
};
export const getdevice = (req, res) => {
  return res.json(req.device);
};

export const listdevice = (req, res) => {
  var class_name = req.query.device_class;
  var device_employee = req.query.device_employee;
  if (class_name) {
    Device.find({ device_class: class_name }, (err, device) => {
      if (err || !device) {
        res.status(400).json({
          message: "Không tìm thấy device",
        });
      }
      res.json(device);
    });
  }
  if (device_employee) {
    Device.find({ device_employee: device_employee }, (err, device) => {
      if (err || !device) {
        res.status(400).json({
          message: "Không tìm thấy device",
        });
      }
      res.json(device);
    });
  }
};


