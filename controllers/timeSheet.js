import TimeSheet from "../models/timeSheet";
import moment, { now } from "moment";
const requestIp = require("request-ip");

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
  // Chỉ cho phép chấm công khi sử dụng mạng của công ty
  console.log(req.body[0].users_name+ ":Chấm công: " + moment().format("YYYY-MM-DD HH:mm") );
  if (requestIp) {
    const clientIp = requestIp.getClientIp(req);
    if (clientIp !== process.env.IP_ADDRESS) {
      return res.status(200).json({
        report: "Bạn đang không ở công ty",
      });
    }
  }
  
  // Kiểm tra đã đăng ký lịch chấm công chưa\
  TimeSheet.findOne({
    users_name: req.body[0].users_name,
    working_date: req.body[0].working_date,
    working_session: req.body[0].working_session,
  }).exec((err, data) => {
    if (err || !data) {
      return res.status(200).json({
        report: "Bạn không đăng ký lịch làm việc ca này",
      });
    }
    // Xin nghỉ thì không chấm công nữa
    if (
      data.working_verify == "ps" ||
      data.working_verify == "pc" ||
      data.working_verify == "pt"
    ) {
      return res.status(200).json({
        report: "Bạn đã xin nghỉ ca này ",
      });
    }
    // Hoàn thành ca rồi thì không chấm công nữa
    if (
      data.working_verify == "S" ||
      data.working_verify == "C" ||
      data.working_verify == "T"
    ) {
      return res.status(200).json({
        report: "Bạn đã hoàn thành ca : " + data.working_verify,
      });
    }
    // Đã chấm công rồi thì không chấm công nữa
    if (data.working_verify == req.body[0].working_verify) {
      if (data.working_check_late != "") {
        return res.status(200).json({
          report:
            "Bạn đã chấm công bắt đầu ca rồi! Bạn đi làm muộn, rút kinh nghiệm nhé",
        });
      } else {
        return res.status(200).json({
          report:
            "Bạn đã chấm công bắt đầu ca rồi! Bạn đi đúng giờ, phát huy nhé",
        });
      }
    }
    // Không chấm công bắt đầu vào ca thì không chấm ra được
    if (!data.working_verify || data.working_verify == "") {
      if (
        req.body[0].working_verify == "S" ||
        req.body[0].working_verify == "C" ||
        req.body[0].working_verify == "T"
      ) {
        return res.status(200).json({
          report: "Bạn không chấm công bắt đầu vào ca",
        });
      }
    }

    // update dữ liệu khi thỏa mãn điều kiện
    data.working_verify = req.body[0].working_verify;
    if (data.working_check_late == "m") {
      data.working_check_late == "m";
    } else {
      data.working_check_late = req.body[0].working_check_late;
    }

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
            report: "Đã Lỗi",
          });
        }
        if (newdata) {
          return res.json(newdata);
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
