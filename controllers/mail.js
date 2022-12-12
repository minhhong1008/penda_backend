// Import model
import Mail from "../models/mail";

export const create = (req, res) => {
  const mail = new Mail(req.body);
  mail.save((err, acc) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm mail không thành công",
      });
    }
    res.json(acc);
  });
};
export const mailByID = (req, res, next, id) => {
  Mail.findOne({ mail_id: id }, (err, mail) => {
    if (err || !mail) {
      res.status(400).json({
        message: "Không tìm thấy mail",
      });
      return;
    }
    req.mail = mail;
    next();
  });
};

export const update = (req, res) => {
  var mail_id = req.query.id;
  Mail.findOneAndUpdate(
    { mail_id: mail_id },
    { $set: req.body },
    { useFindAndModify: false },
    (err, mail) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Bạn không được phép thực hiện hành động này",
        });
      }
      res.json(mail);
    }
  );
};
export const getmail = (req, res) => {
  return res.json(req.mail);
};

export const listmail = (req, res) => {
  var class_name = req.query.mail_class;
  var mail_employee = req.query.mail_employee;
  if (class_name) {
    Mail.find({ mail_class: class_name }, (err, mail) => {
      if (err || !mail) {
        res.status(400).json({
          message: "Không tìm thấy mail",
        });
      }
      res.json(mail);
    });
  }
  if (mail_employee) {
    Mail.find({ mail_employee: mail_employee }, (err, mail) => {
      if (err || !mail) {
        res.status(400).json({
          message: "Không tìm thấy mail",
        });
      }
      res.json(mail);
    });
  }
};