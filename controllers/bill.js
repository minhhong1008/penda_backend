import Bill from "../models/bill";
import Users from "../models/user";
// Tạo hàm create
export const create = (req, res) => {
  // bill => là 1 đối tượng được tạo ra từ model Bill -> gồm tất cả các fields như được khai báo trong model bill và gán giá trị
  // bằng giá trị của req.body gửi lên từ client
  const bill = new Bill(req.body);
  // gọi phương thức save() của mongodb để lưu đối tượng này vào trong bảng bills trong database
  bill.save((err, bill) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm bill không thành công",
      });
    }
    res.json(bill);
  });
};

export const updatetest = (req, res) => {
  // bill => là 1 đối tượng được tạo ra từ model Bill -> gồm tất cả các fields như được khai báo trong model bill và gán giá trị
  // bằng giá trị của req.body gửi lên từ client

  res.json({
    message: "Test thành công",
  });
};

export const getBill = (req, res) => {
  let from = req.query.from;
  let to = req.query.to;
  let match = {};
  if (from && to) {
    match.date = { $gte: new Date(from), $lte: new Date(to) };
  }
  Bill.aggregate([
    { $addFields: { date: { $toDate: "$bill_date" } } },
    {
      $match: match,
    },
  ]).exec((err, bill) => {
    if (err) {
      return res.status(400).json({
        error: "Đã Lỗi",
      });
    }
    res.json(bill);
  });
};

export const getBillTable = (req, res) => {
  let from = req.query.from;
  let to = req.query.to;
  let match = {
    bill_work: decodeURIComponent(req.query.status).split("?action=")[0].trim(),
    bill_action: decodeURIComponent(req.query.status)
      .split("?action=")[1]
      .trim(),
  };
  if (from && to) {
    match.date = { $gte: new Date(from), $lte: new Date(to) };
  }
  Bill.aggregate([
    { $addFields: { date: { $toDate: "$bill_date" } } },
    {
      $match: match,
    },
  ]).exec((err, bill) => {
    if (err) {
      return res.status(400).json({
        error: "Đã Lỗi",
      });
    }
    res.json(bill);
  });
};

export const update = (req, res) => {
  let id = req.body._id;
  var dataBill = req.body;
  for (const key in dataBill) {
    if (dataBill[key] == "") {
      delete dataBill[key];
    }
  }
  Bill.findOneAndUpdate(
    { _id: id },
    { $set: dataBill },
    { useFindAndModify: false },
    (err, bill) => {
      if (err) {
        return res.status(400).json({
          error: "Bạn không được phép thực hiện hành động này",
        });
      }
      res.json(bill);
    }
  );
};

// get list users_name từ db vào ebay_employee
export const getEmployee = (req, res, next) => {
  let userData = [];
  Users.find({}, { users_name: 1, _id: 0 }).exec((err, users) => {
    if (err) {
      return res.status(400).json({
        error: "Đã lỗi",
      });
    }
    users.forEach((user) => {
      userData.push(user.users_name);
    });

    res.json(userData);
  });
};
