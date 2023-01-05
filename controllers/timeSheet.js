import TimeSheet from "../models/timeSheet";

export const create = (req, res) => {
  const session = new TimeSheet(req.body);
  session.save((err, session) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm tiktok không thành công",
      });
    }
    res.json(session);
  });
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
        user_id: "$user_id",
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
        _id: "$user_id",
        sessions: { $push: "$$ROOT" },
      },
    },
  ]).exec((err, sessions) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.json(sessions);
    }
  });
};
