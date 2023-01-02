import Bill from "../models/bill";

// Tạo hàm create
export const create = (req, res) => {
  // bill => là 1 đối tượng được tạo ra từ model Bill -> gồm tất cả các fields như được khai báo trong model bill và gán giá trị
  // bằng giá trị của req.body gửi lên từ client
  console.log(req.body);
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
  console.log(req.body);
  res.json({
    message: "Test thành công",
  });
};

export const getBill = (req, res) => {
  Bill.find({}).exec((err, bill) => {
    if (err) {
      return;
    }
    res.json(bill);
  });
};

export const getBillTable = (req, res) => {
  let from = req.query.from;
  let to = req.query.to;
  let match = {
    bill_work: decodeURIComponent(req.query.status)
  };
  if(from && to){
    match.date = { $gte: new Date(from), $lte: new Date(to) }
  }
    Bill.aggregate([
      { $addFields: { date: { $toDate: "$bill_date" } } },
      {
        $match: match,
      },
    ]).exec((err, bill) => {
      if(err){
        return
      } else {
        res.json(bill);
      }
    });
};

export const update = (req, res) => {
  let id = req.body._id;
  Bill.findOneAndUpdate(
    { _id: id },
    { $set: req.body },
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
