import TimeSheet from "../models/timeSheet";
import moment, { now } from "moment";

export const create = (req, res) => {
  if (req.body.working_date == "Invalid Date" || req.body.users_name == "") {
    return res.status(400).json({
      error: "Đã lỗi",
    });
  }
  if (["Giám đốc", "Trưởng phòng"].indexOf(req.body.users_function) !== -1) {
    // Đăng ký của leader chấm công
    if (req.body.working_session == "delete") {
      TimeSheet.find({
        users_name: req.body.users_name,
        working_date: req.body.working_date,
      })
        .remove()
        .exec((err, timeSheet) => {
          if (err) {
            return res.status(400).json({
              error: "Đã lỗi",
            });
          }
          res.json(timeSheet);
        });
    } else {
      TimeSheet.findOne({
        users_name: req.body.users_name,
        working_session: req.body.working_session,
        working_date: req.body.working_date,
      }).exec((err, timeSheet) => {
        if (err) {
          return res.status(400).json({
            error: "Đã lỗi",
          });
        }
        if (!timeSheet) {
          const session = new TimeSheet(req.body);
          session.save((err, session) => {
            if (err) {
              return res.status(400).json({
                error: "Đã lỗi",
              });
            }
            res.json(session);
          });
        } else {
          return res.status(400).json({
            err: "Đã đăng ký ca này rồi",
          });
        }
      });
    }
  } else {
    // Đăng ký của nhân viên
    let date1 = moment(req.body.working_date).format("YYYY-MM-DD");
    let date2 = moment(now()).add(3, "d").format("YYYY-MM-DD");
    if (date1 >= date2) {
      if (req.body.working_session == "delete") {
        TimeSheet.find({
          users_name: req.body.users_name,
          working_date: req.body.working_date,
        })
          .remove()
          .exec((err, timeSheet) => {
            if (err) {
              return res.status(400).json({
                error: "Đã lỗi",
              });
            }
            res.json(timeSheet);
          });
      } else {
        TimeSheet.findOne({
          users_name: req.body.users_name,
          working_session: req.body.working_session,
          working_date: req.body.working_date,
        }).exec((err, timeSheet) => {
          if (err) {
            return res.status(400).json({
              error: "Đã lỗi",
            });
          }
          if (!timeSheet) {
            const session = new TimeSheet(req.body);
            session.save((err, session) => {
              if (err) {
                return res.status(400).json({
                  error: "Đã lỗi",
                });
              }
              res.json(session);
            });
          }
        });
      }
    }
  }
};

export const list = (req, res) => {
  TimeSheet.aggregate([
    { $addFields: { date: { $toDate: "$working_date" } } },
    {
      $project: {
        month: { $month: "$date" },
        year: { $year: "$date" },
        day: { $dayOfMonth: "$date" },
        working_session: "$working_session",
        users_name: "$users_name",
        working_date: "$working_date",
      },
    },
    {
      $match: {
        month: parseInt(req.query.month),
        year: parseInt(req.query.year),
      },
    },
    {
      $group: {
        _id: "$users_name",
        sessions: { $push: "$$ROOT" },
      },
    },
  ]).exec((err, sessions) => {
    if (err) {
      return res.status(400).json({
        error: "Đã lỗi",
      });
    } else {
      res.json(sessions);
    }
  });
};

export const createVerify = (req, res) => {
  // Kiểm tra đã đăng ký lịch chấm công chưa
  TimeSheet.findOne({
    users_name: req.body.users_name,
    working_date: req.body.working_date,
    working_session: req.body.working_check,
    working_verify: "unverify",
  }).exec((err, data) => {
    if (err || !data) {
      return res.status(400).json({
        error: "Đã lỗi",
      });
    }
    // nếu đã đăng ký rồi thì update verify, khi update verify sẽ không chấm công nữa
    data.working_verify = "verify";
    TimeSheet.findOneAndUpdate(
      { _id: data._id },
      { $set: data },
      { useFindAndModify: false },
      (err, newdata) => {
        if (err) {
          return res.status(400).json({
            error: "Đã Lỗi",
          });
        }
        res.json(newdata);
      }
    );

    
    //
    if (req.body.working_session == req.body.working_check) {
      return;
    }

    TimeSheet.findOne({
      users_name: req.body.users_name,
      working_date: req.body.working_date,
      working_session: req.body.working_session,
      working_verify: "verify",
    }).exec((err, datas) => {
      if (err) {
        return res.status(400).json({
          error: "Đã lỗi",
        });
      }

      if (!datas) {
        const timeSheet = new TimeSheet(req.body);
        timeSheet.save((err, info) => {
          if (err) {
            return res.status(400).json({
              error: "Đã lỗi",
            });
          }
        });
      }
    });
  });
};
