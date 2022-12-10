import Etsy from "../models/etsy";
import Ebay from "../models/ebay";
import Bank from "../models/bank";
export const create = (req, res) => {
  Etsy.find()
    .sort({ etsy_id: 1 })
    .exec((err, etsy) => {
      if (err || !etsy) {
        res.status(400).json({
          message: "Không tìm thấy etsy",
        });
      }

      let first_id = etsy[etsy.length - 1].etsy_id.split("_")[1];
      let type = req.query.type;
      let body = req.body;
      let data = req.body.data.split("\n");
      data.forEach((item, index) => {
        let value = item.split("|");
        if (type == "etsy") {
          var etsy_data = {
            etsy_id: "ET_" + (parseInt(first_id) + index + 1),
            etsy_user: value[0],
            etsy_password: value[1],
            etsy_class: body.class,
            etsy_detail: body.detail,
            etsy_employee: body.employee,
            etsy_owner: body.owner,
            etsy_processing: body.processing,
            etsy_sell_status: body.sell_status,
            etsy_status: body.status,
            etsy_type: body.type
          };
          var etsy = new Etsy(etsy_data);
          etsy.save((err, acc) => {
            if (err) {
              return res.status(400).json({
                error: "Thêm etsy không thành công",
              });
            }
          });
        }
        if(type == "ebay") {
            var ebay_data = {
                ebay_id: "EB_" + (parseInt(first_id) + index + 1),
                ebay_user: value[0],
                ebay_password: value[1],
                ebay_class: body.class,
                ebay_detail: body.detail,
                ebay_employee: body.employee,
                ebay_owner: body.owner,
                ebay_processing: body.processing,
                ebay_sell_status: body.sell_status,
                ebay_status: body.status,
                ebay_type: body.type
              };
              var ebay = new Ebay(ebay_data);
              ebay.save((err, acc) => {
                if (err) {
                  return res.status(400).json({
                    error: "Thêm ebay không thành công",
                  });
                }
              });
        }
        if(type == "bank") {
            var bank_data = {
                bank_id: "B_" + (parseInt(first_id) + index + 1),
                bank_user: value[0],
                bank_password: value[1],
                bank_class: body.class,
                bank_detail: body.detail,
                bank_employee: body.employee,
                bank_owner: body.owner,
                bank_processing: body.processing,
                bank_sell_status: body.sell_status,
                bank_status: body.status,
                bank_type: body.type
              };
              var bank = new Bank(bank_data);
              bank.save((err, acc) => {
                if (err) {
                  return res.status(400).json({
                    error: "Thêm bank không thành công",
                  });
                }
              });
        }
      });
    });
};
