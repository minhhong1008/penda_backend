// Import model
import Sim from "../models/sim";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";
export const create = (req, res) => {
  const sim = new Sim(req.body);
  sim.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm sim không thành công",
      });
    }
    res.json(acc);
  });
};
export const simByID = (req, res, next, id) => {
  Sim.findOne({ sim_id: id }, (err, sim) => {
    if (err || !sim) {
      res.status(400).json({
        message: "Không tìm thấy sim",
      });
      return;
    }
    req.sim = sim;
    next();
  });
};

export const update = (req, res) => {
  var sim_id = req.query.id;
  Sim.findOneAndUpdate(
    { sim_id: sim_id },
    { $set: req.body },
    { useFindAndModify: false },
    (err, sim) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Bạn không được phép thực hiện hành động này",
        });
      }
      res.json(sim);
    }
  );
};
export const getsim = (req, res) => {
  return res.json(req.sim);
};

export const listsim = (req, res) => {
  var class_name = req.query.sim_class;
  var sim_employee = req.query.sim_employee;
  if (class_name) {
    Sim.find({ sim_class: class_name }, (err, sim) => {
      if (err || !sim) {
        res.status(400).json({
          message: "Không tìm thấy sim",
        });
      }
      res.json(sim);
    });
  }
  if (sim_employee) {
    Sim.find({ sim_employee: sim_employee }, (err, sim) => {
      if (err || !sim) {
        res.status(400).json({
          message: "Không tìm thấy sim",
        });
      }
      res.json(sim);
    });
  }
};

// hàm phân quyền trong Sim
export const canViewSim = (req, res, next) => {
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
        user.manage_view.indexOf("sim_id") != -1 &&
        user.users_owner.indexOf("Phòng sản xuất") != -1
      ) {
        next();
      } else {
        res.status(403).json({
          error: "Không có quyền truy cập sim",
        });
      }
    });
  } catch (ex) {
    res.status(400).send("Token không chính xác");
  }
};

