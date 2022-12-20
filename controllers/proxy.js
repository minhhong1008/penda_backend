// Import model
import Proxy from "../models/proxy";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";

export const create = (req, res) => {
  const proxy = new Proxy(req.body);
  proxy.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm proxy không thành công",
      });
    }
    res.json(acc);
  });
};
export const proxyByID = (req, res, next, id) => {
  Proxy.findOne({ proxy_id: id }, (err, proxy) => {
    if (err || !proxy) {
      res.status(400).json({
        message: "Không tìm thấy proxy",
      });
      return;
    }
    req.proxy = proxy;
    next();
  });
};

export const update = (req, res) => {
  var proxy_id = req.query.id;
  Proxy.findOneAndUpdate(
    { proxy_id: proxy_id },
    { $set: req.body },
    { useFindAndModify: false },
    (err, proxy) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Bạn không được phép thực hiện hành động này",
        });
      }
      res.json(proxy);
    }
  );
};
export const getproxy = (req, res) => {
  return res.json(req.proxy);
};

export const listproxy = (req, res) => {
  var class_name = req.query.proxy_class;
  var proxy_employee = req.query.proxy_employee;
  if (class_name) {
    Proxy.find({ proxy_class: class_name }, (err, proxy) => {
      if (err || !proxy) {
        res.status(400).json({
          message: "Không tìm thấy proxy",
        });
      }
      res.json(proxy);
    });
  }
  if (proxy_employee) {
    Proxy.find({ proxy_employee: proxy_employee }, (err, proxy) => {
      if (err || !proxy) {
        res.status(400).json({
          message: "Không tìm thấy proxy",
        });
      }
      res.json(proxy);
    });
  }
};

// hàm phân quyền trong Proxy
export const canViewProxy = (req, res, next) => {
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
        user.manage_view.indexOf("proxy_id") != -1 &&
        user.users_owner.indexOf("Phòng sản xuất") != -1
      ) {
        next();
      } else {
        res.status(403).json({
          error: "Không có quyền truy cập proxy",
        });
      }
    });
  } catch (ex) {
    res.status(400).send("Token không chính xác");
  }
};