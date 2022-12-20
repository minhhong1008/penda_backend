// Import model
import Device from "../models/device";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";
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

// hàm phân quyền trong Device
export const canViewDevice = (req, res, next) => {
  const data = req.headers["x-access-token"] || req.headers["authorization"];
  const token = data.split(" ");
  if (!token) {
    return res.status(401).send("Bạn chưa đăng nhập, không tồn tại token");
  }
  try {
    const decoded = jwt.verify(token[1], "duy");
    Users.findOne({ _id: decoded._id }).exec((err, user) => {
      if (!user) {
        return res.status(403).json({
          error: "Bạn chưa đăng nhập",
        });
      }
      if (
        user.manage_view.indexOf("device_id") != -1 &&
        user.users_owner.indexOf("Phòng sản xuất") != -1
      ) {
        next();
      } else {
        res.status(403).json({
          error: "Không có quyền truy cập device",
        });
      }
    });
  } catch (ex) {
    res.status(400).send("Token không chính xác");
  }
};
