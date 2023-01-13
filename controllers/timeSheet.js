import TimeSheet from "../models/timeSheet";
import moment, { now } from "moment";

export const create = (req, res) => {
  if (req.body.working_date == "Invalid Date" || req.body.users_name == "") {
    return res.status(400).json({
      error: "Đã lỗi",
    });
  }

  let date1 = moment(req.body.working_date).format("YYYY-MM-DD");
  let date2 = moment(now()).add(3, "d").format("YYYY-MM-DD");
  let date3 = moment(now()).format("YYYY-MM-DD");

  if (req.body.working_edit == "Tạo ca") {
    if (date1 >= date2) {
      TimeSheet.findOne({
        users_name: req.body.users_name,
        working_session: req.body.working_session,
        working_date: req.body.working_date,
      }).exec((err, timeSheet) => {
        if (err || timeSheet) {
          return res.status(400).json({
            error: "Đã lỗi",
          });
        }
        if (!timeSheet) {
          const timeSheet = new TimeSheet(req.body);
          timeSheet.save((err, data) => {
            if (err) {
              return res.status(400).json({
                error: "Đã lỗi",
              });
            }
            res.json(data);
          });
        }
      });
    }
    return;
  }

  if (req.body.working_edit == "Xóa ca") {
    if (date1 >= date2) {
      TimeSheet.find({
        users_name: req.body.users_name,
        working_date: req.body.working_date,
        working_session: req.body.working_session,
      })
        .remove()
        .exec((err, timeSheet) => {
          if (err) {
            return res.status(400).json({
              error: "Đã lỗi",
            });
          }
          res.json("Xóa thành công");
        });
    }
    return;
  }

  if (req.body.working_edit == "Xin nghỉ") {
    if (date1 >= date3 && date1 < date2) {
      TimeSheet.findOne({
        users_name: req.body.users_name,
        working_session: req.body.working_session,
        working_date: req.body.working_date,
      }).exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: "Đã lỗi",
          });
        }

        if (data) {
          data.working_verify = "p" + data.working_session.toLowerCase();

          TimeSheet.findOneAndUpdate(
            { _id: data._id },
            { $set: data },
            { useFindAndModify: false },
            (err, newdata) => {
              if (err) {
                return res.status(400).json({
                  error: "Đã lỗi",
                });
              } else {
                res.json(newdata);
              }
            }
          );
        }
      });
    }

    return;
  }
  return;
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
        working_verify: "$working_verify",
        working_check_late: "$working_check_late",
        working_check_soon: "$working_check_soon",
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
// nút chấm công trên header
export const createVerify = (req, res) => {
  // Kiểm tra đã đăng ký lịch chấm công chưa\

  TimeSheet.findOne({
    users_name: req.body[0].users_name,
    working_date: req.body[0].working_date,
    working_session: req.body[0].working_session,
  }).exec((err, data) => {
    if (err || !data) {
      return res.status(400).json({
        error: "Đã lỗi",
      });
    }

    /* Loại bỏ chấm công lại khi đã chấm công */
    if (data.working_verify != "" && data.working_check_late == "m") {
      return;
    }
    if (data.working_verify == "ps" && data.working_verify == "pc" && data.working_verify == "pt") {
      return;
    }
    /*  Chấm công khi hoàn thành ca */
    if (
      data.working_verify != req.body[0].working_verify &&
      data.working_verify != ""
    ) {
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
        }
      );
    }

    data.working_verify = req.body[0].working_verify;
    data.working_check_late = req.body[0].working_check_late;
    data.working_check_soon = req.body[0].working_check_soon;

    for (const key in data) {
      if (data[key] == "") {
        delete data[key];
      }
    }

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
      }
    );
  });
};

export const xuly_data = (req, res) => {
  let date1 = moment(now()).format("YYYY-MM-DD");
  let date2 = moment(now()).add(3, "d").format("YYYY-MM-DD");
  // let date3 = moment(now()).format("YYYY-MM-DD");
  TimeSheet.find().exec((err, data) => {
    console.log(data);
    data.forEach((item) => {
      if (item.working_date <= date1) {
        item.working_verify = item.working_session;
        console.log(item);
        TimeSheet.findOneAndUpdate(
          { _id: item._id },
          { $set: item },
          { useFindAndModify: false },
          (err, newdata) => {}
        );
      } else {
        item.working_verify = "";
        console.log(item);
        TimeSheet.findOneAndUpdate(
          { _id: item._id },
          { $set: item },
          { useFindAndModify: false },
          (err, newdata) => {}
        );
      }
    });
  });
};
