// Import model
import Sim from "../models/sim";

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


