import moment from "moment";
import Users from "../models/user";
import TimeSheet from "../models/timeSheet";
import Salary from "../models/salary";

var CronJob = require("cron").CronJob;

const renderData = (timeSheet, userss) => {
  let newData = [];
  let data_index = 0;
  let time_sheet_data = [];
  timeSheet.map((item, index) => {
    let session_obj = {};
    let verify_obj = {};
    let total_check = 0;
    let total_verrify = 0;
    let total_n = 0;
    session_obj["index"] = parseInt(
      userss.filter((session_obj) => session_obj.users_name == item._id)[0]
        .users_sort
    );

    session_obj["users_name"] = userss.filter(
      (session_obj) => session_obj.users_name == item._id
    )[0].users_name;

    verify_obj["users_name"] = "Chấm công";
    item.sessions.map((session, index) => {
      if (
        session.working_check_late == "m" ||
        session.working_verify == "Bs" ||
        session.working_verify == "Bc" ||
        session.working_verify == "Bt" ||
        session.working_verify == "ps" ||
        session.working_verify == "pc" ||
        session.working_verify == "pt"
      ) {
        total_check++;
      }

      if (
        session.working_verify == "Bs" ||
        session.working_verify == "Bc" ||
        session.working_verify == "Bt" ||
        session.working_verify == "S" ||
        session.working_verify == "C" ||
        session.working_verify == "T"
      ) {
        total_verrify++;
      }
      // Tính ngày nghỉ không xin phép
      if (
        moment(session.working_date).format("YYYY-MM-DD") <
          moment().format("YYYY-MM-DD") &&
        session.working_session != "" &&
        session.working_verify == ""
      ) {
        total_n++;
      }
    });

    session_obj["total"] = item.sessions.length;
    verify_obj["total"] = total_verrify - 0.25 * total_check - 2 * total_n;

    time_sheet_data.push(session_obj);
    time_sheet_data.push(verify_obj);
  });

  time_sheet_data.forEach((user_time, index) => {
    console.log(user_time);
    if (index % 2 == 0) {
      newData.push({
        user_index: user_time.index,
        users_name: user_time.users_name,
        users_expected_days: user_time.total,
      });
    } else {
      newData[data_index] = {
        ...newData[data_index],
        users_days: user_time.total,
      };
      data_index = data_index + 1;
    }
  });
  const final_data = [];
  let total_users_true_salary = "";
    let total_users_expected_salary ="";
    let total_users_now_salary ="";
    let total_users_salary_advance ="";
  userss.forEach((user, index) => {
    newData.forEach((data) => {
      if (user.users_name == data.users_name) {
        let users_now_salary = Math.round(
          Math.round(parseInt(user.users_salary) / 60) *
            parseFloat(data.users_days) +
            parseInt(user.users_comission) +
            parseInt(user.users_subsidize)
        );
        let users_expected_salary = Math.round(
          Math.round(parseInt(user.users_salary) / 60) *
            parseFloat(data.users_expected_days)
        );
        let users_true_salary = Math.round(
          users_now_salary - parseInt(user.users_salary_advance)
        );
        final_data.push({
          ...data,
          users_function: user.users_function,
          users_salary: user.users_salary,
          users_bonus: user.users_comission,
          users_allowance: user.users_subsidize,
          users_now_salary: users_now_salary,
          users_expected_salary: users_expected_salary,
          users_advance: user.users_salary_advance,
          users_true_salary: users_true_salary,
        });

        
      }
    });
  });

  final_data.forEach((item, index) => {
    total_users_true_salary = Math.round(
      total_users_true_salary + parseInt(item.users_true_salary)
    );
    total_users_expected_salary = Math.round(
      total_users_expected_salary + parseInt(item.users_expected_salary)
    );

    total_users_now_salary = Math.round(
      total_users_now_salary + parseInt(item.users_now_salary)
    );
    total_users_salary_advance = Math.round(
      total_users_salary_advance + parseInt(item.users_advance)
    );
  });

  final_data.push({
    users_name: "Tổng",
    users_true_salary: total_users_true_salary,
    users_expected_salary: total_users_expected_salary,
    users_now_salary: total_users_now_salary,
    users_advance: total_users_salary_advance,
  });

  const salary = new Salary({
    time: moment().format("MM-YYYY"),
    value: JSON.stringify(final_data),
  });
  Salary.findOne({ time: moment().format("MM-YYYY").toString() }).exec((err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data) {
       
        Salary.findOneAndUpdate(
          { _id: data._id },
          { value: JSON.stringify(final_data) },
          { useFindAndModify: false },
          (err, result) => {
            if (err) {
              console.log(err);
              return console.log("Cron Update Salary Lỗi: " + moment().format("YYYY-MM-DD HH:mm") );
            }
            
            console.log("Cron Update Salary thành công: " + moment().format("YYYY-MM-DD HH:mm") );
          }
        );
      } else {
        salary.save((item, err) => {
          if (err) {
            if (err) {
              console.log(err);
              return console.log("Cron Lưu  Salary Lỗi: " + moment().format("YYYY-MM-DD HH:mm") );
            }
          }
          console.log("Cron Lưu  Salary thành công: " + moment().format("YYYY-MM-DD HH:mm") );
        });
      }
    }
  });
};

export const time_sheet_cron = new CronJob(
  "00 00/01 * * * *",
  function () {
    Users.find({ users_status: "Active" })
      .sort({ users_sort: "ascending" })
      .collation({ locale: "en_US", numericOrdering: true })
      .exec((err, users) => {
        if (err || !users) {
          console.log("Lỗi");
        }
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
              month: parseInt(moment().format("MM")),
              year: parseInt(moment().format("YYYY")),
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
            return console.log("Lỗi");
          } else {
            renderData(sessions, users);
          }
        });
      });
    // renderData()
  },
  null,
  false,
  "America/Los_Angeles"
);
