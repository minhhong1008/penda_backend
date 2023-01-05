import TimeSheet from "../models/timeSheet";
import moment, { now } from "moment";
export const create = (req, res) => {
  if (["Giám đốc", "Trưởng phòng"].indexOf(req.body.users_function) != -1) {
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
  } else {
    let date1 = moment(req.body.working_date).format("YYYY-MM-DD");
    let date2 = moment(now()).format("YYYY-MM-DD");
    if (date1 >= date2 + 2) {
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
