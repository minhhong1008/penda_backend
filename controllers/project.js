// Import model
import project from "../models/project";
import Info from "../models/info";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";
import moment, { now } from "moment";

export const create = (req, res) => {
  if (req.body) {
    let projet = new project({
      project_id: req.body.project_id,
      project_employee_request: req.body.project_employee_request,
      project_employee: req.body.project_employee,
      project_date_start: req.body.project_date_start,
      project_date_end: req.body.project_date_end,
      project_processing: req.body.project_processing,
      project_owner: req.body.project_owner,
      project_work_item: req.body.project_work_item,
      project_work: req.body.project_work,
      project_status: req.body.project_status,
    });

    projet.save((err, projet) => {
      if (err) {
        return res.status(400).json({
          error: "Đã lỗi",
        });
      }
      res.json(projet);
    });
  }
};

export const getproject = (req, res) => {
  return res.json(req.project);
};

// View bảng project_table
export const listproject = (req, res) => {
  var project_employee = req.query.project_employee;
  var project_status = req.query.project_status;
  let from = req.query.from;
  let to = req.query.to;

  const data = req.headers["x-access-token"] || req.headers["authorization"];
  let users_name = "";
  const token = data.split(" ");
  if (!token) {
    users_name = "";
  }
  const decoded = jwt.verify(token[1], "duy");
  Users.findOne({ _id: decoded._id }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Đã lỗi",
      });
    }
    if (!user) {
      users_name = "";
    }

    users_name = user.users_name;
    let filter_project = "";
    if (project_employee) {
      // "Giám đốc", "Phó Giám đốc", "Trưởng phòng" vào được tất cả các tài khoản
      if (
        ["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
          user.users_function
        ) != -1
      ) {
        if (project_status) {
          filter_project = {
            project_status: project_status,
            project_employee: project_employee,
          };
        } else {
          filter_project = {
            $and: [
              {
                $or: [
                  { project_status: "Bắt đầu" },
                  { project_status: "Thực hiện" },
                  { project_status: "Chưa xong" },
                  { project_status: "Vướng mắc" },
                ],
              },
              {
                project_employee: project_employee,
              },
            ],
          };
        }
      } else {
        // Nhân viên chỉ vào được tài khoản nhân viên đó quản lý
        var users_name_re = new RegExp("(.*)" + users_name + "(.*)"); // dùng để tìm users_name trong 1 chuỗi chứa users_name
        filter_project = {
          $and: [
            {
              $or: [
                {  project_employee: users_name_re},
                { project_employee_request: users_name_re },
              ],
            },
            {
              project_employee: project_employee,
            },
          ],
          
        
          //project_status: "Live"
        };
      }

      if (from && to) {
        filter_project.date = { $gte: new Date(from), $lte: new Date(to) };
      }
      project
        .aggregate([
          { $addFields: { date: { $toDate: "$project_date_start" } } },
          {
            $match: filter_project,
          },
        ])
        
        .exec((err, project) => {
          if (err) {
            return res.status(400).json({
              error: "Đã Lỗi",
            });
          }
          res.json(project);
        });
    }
  });
};

// View bảng project_info
export const projectByID = (req, res, next, id) => {
  let userData = [];

  const data = req.headers["x-access-token"] || req.headers["authorization"];
  let users_name = "";
  const token = data.split(" ");
  if (!token) {
    users_name = "";
  }
  const decoded = jwt.verify(token[1], "duy");
  Users.findOne({ _id: decoded._id }).exec((err, user) => {
    if (!user) {
      users_name = "";
    }
    users_name = user.users_name;
    let filter_project = "";
    /* "Giám đốc", "Phó Giám đốc", "Trưởng phòng" vào được tất cả các tài khoản */
    if (
      ["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
        user.users_function
      ) != -1
    ) {
      project.findOne({ _id: id }).exec((err, project) => {
        if (err || !project) {
          return res.status(400).json({
            error: "Đã lỗi",
          });
        }

        // get list users_name từ db vào project_employee ,"Giám đốc", "Phó Giám đốc", "Trưởng phòng" có thể thay đổi nhân viên
        Users.find({}, { users_name: 1, _id: 0 }).exec((err, users) => {
          if (err) {
            return res.status(400).json({
              error: "Đã lỗi",
            });
          }
          users.forEach((user) => {
            userData.push(user.users_name);
          });
        });

        let newData = JSON.parse(JSON.stringify(project));
        newData.listselect_project_employee = userData;
        req.project = newData;
        next();
      });
    } else {
      // Nhân viên chỉ vào được tài khoản nhân viên đó quản lý
      var users_name_re = new RegExp("(.*)" + users_name + "(.*)");
      filter_project = {
        _id: id,
        project_employee: users_name_re,
        //project_status: "Live"
      };

      project.findOne(filter_project).exec((err, project) => {
        if (err) {
          return res.status(400).json({
            error: "Đã lỗi",
          });
        }

        let newData = JSON.parse(JSON.stringify(project));
        req.project = newData;
        next();
      });
    }
  });
};

// Update dữ liệu từ project_info ( đang gặp vấn đề quyền nhân viên uodate thì nhiều field bị rỗng)
export const update = (req, res) => {
  const data = req.headers["x-access-token"] || req.headers["authorization"];
  let users_name = "";
  const token = data.split(" ");
  if (!token) {
    users_name = "";
  }
  const decoded = jwt.verify(token[1], "duy");
  Users.findOne({ _id: decoded._id }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Đã lỗi",
      });
    }
    if (!user) {
      users_name = "";
    }
    users_name = user.users_name;

    var dataproject = req.body;
    for (const key in dataproject) {
      if (dataproject[key] == "" || dataproject[key] == "undefinded") {
        delete dataproject[key];
      }
    }

    project.findOneAndUpdate(
      { _id: req.query.id },
      { $set: dataproject },
      { useFindAndModify: false },
      (err, project) => {
        if (err) {
          return res.status(400).json({
            error: "Bạn không được phép thực hiện hành động này",
          });
        }
        res.json(project);
      }
    );
  });
};

// Get count ra bảng project_class
export const getCountproject_class = (req, res) => {
  const data = req.headers["x-access-token"] || req.headers["authorization"];
  let users_name = "";
  let users_fb = "";
  const token = data.split(" ");
  if (!token) {
    users_name = "";
  }
  const decoded = jwt.verify(token[1], "duy");
  Users.findOne({ _id: decoded._id }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Đã lỗi",
      });
    }
    if (!user) {
      users_name = "";
    }
    
    users_name = user.users_name;
    users_fb = user.users_fb;
    var users_name_re = new RegExp("(.*)" + users_name + "(.*)");

    // "Giám đốc", "Phó Giám đốc", "Trưởng phòng" xem được tổng tài khoản
    if (
      ["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(
        user.users_function
      ) != -1
    ) {
      project
        .aggregate([
          /* {$match: {project_status: "Bắt đầu"}}, */
          {
            $group: {
              _id: {
                users_name: "$project_employee",
              },
              count: { $sum: 1 },
            },
          },
          { $sort: { count: -1 } },
        ])
        .exec((err, data) => {
          if (err || !data) {
            return res.status(400).json({
              error: "Đã lỗi",
            });
          }
          
          res.json({
            status: "success",
            data: data,
          });
        });
    } else {
      // Nhân viên chỉ xem được tổng tài khoản nhân viên đó quản lý
      project
        .aggregate([
          {
            $match: {
              project_employee: users_name_re,
            },
          },
          {
            $group: {
              _id: {
                users_name: "$project_employee",
              },
              count: { $sum: 1 },
            },
          },
          { $sort: { count: -1 } },
        ])
        .exec((err, data) => {
          if (err) {
            return res.status(400).json({
              error: "Đã lỗi",
            });
          }
          res.json({
            status: "success",
            data: data,
          });
        });
    }
  });
};

// ================ Middle ware====================
// hàm phân quyền trong project, user phải trong phòng sản xuất và quản lý project mới view đc project

export const canViewproject = (req, res, next) => {
  const data = req.headers["x-access-token"] || req.headers["authorization"];
  const token = data.split(" ");
  if (!token) {
    return res.status(401).send("Bạn chưa đăng nhập, không tồn tại token");
  }
  try {
    const decoded = jwt.verify(token[1], "duy");
    Users.findOne({ _id: decoded._id }).exec((err, user) => {
      if (err) {
        return res.status(400).json({
          error: "Đã lỗi",
        });
      }
      if (!user) {
        return res.status(403).json({
          error: "Bạn chưa đăng nhập",
        });
      }
      if (
        user.manage_view.indexOf("project_id") != -1 &&
        user.users_owner.indexOf("Phòng sản xuất") != -1 &&
        user.users_status.indexOf("Active") != -1
      ) {
        next();
      } else {
        res.status(403).json({
          error: "Không có quyền truy cập project",
        });
      }
    });
  } catch (ex) {
    res.status(400).send("Token không chính xác");
  }
};
