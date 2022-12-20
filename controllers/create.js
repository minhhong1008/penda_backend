import Etsy from "../models/etsy";
import Ebay from "../models/ebay";
import Amazon from "../models/amazon";
import Shopee from "../models/shopee";
import Facebook from "../models/facebook";
import Tiktok from "../models/tiktok";
import Payoneer from "../models/payoneer";
import Paypal from "../models/paypal";
import Pingpong from "../models/pingpong";
import Bank from "../models/bank";
import Mail from "../models/mail";
import Sim from "../models/sim";
import Device from "../models/device";
import Proxy from "../models/proxy";
import Info from "../models/info";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";

export const create = (req, res) => {
  let type = req.query.type;
  let body = req.body;
  let data = req.body.data.split("\n");
  if (data.length - 1 == 0) {
    console.log("Không có dữ liệu");
    return;
  }

  if (type == "etsy") {
    Etsy.countDocuments().exec((err, etsy) => {
      if (err || !etsy) {
        res.status(400).json({
          message: "Không tìm thấy etsy",
        });
      }
      let first_id = etsy;
      data.forEach((item, index) => {
        let value = item.split("|");

        var etsy_data = {
          etsy_id: "ET_" + (parseInt(first_id) + index + 1),
          etsy_user: value[0],
          etsy_password: value[1],
          etsy_detail: value[2],
          etsy_limit: value[3],
          etsy_item: value[4],
          etsy_sold: value[5],
          etsy_feedback: value[6],
          etsy_plan: body.plan,
          etsy_block: body.block,
          list_view: body.view,
          etsy_class: body.class,
          etsy_employee: body.employee,
          etsy_owner: body.owner,
          etsy_processing: body.processing,
          etsy_sell_status: body.sell_status,
          etsy_status: body.status,
          etsy_type: body.type,
        };
        var etsy = new Etsy(etsy_data);
        etsy.save((err, acc) => {
          if (err) {
            return res.status(400).json({
              error: "Thêm etsy không thành công",
            });
          }
        });
      });
    });
  }

  if (type == "ebay") {
    Ebay.countDocuments().exec((err, ebay) => {
      if (err || !ebay) {
        res.status(400).json({
          message: "Không tìm thấy ebay",
        });
      }
      let first_id = ebay;
      data.forEach((item, index) => {
        let value = item.split("|");

        var ebay_data = {
          ebay_id: "EB_" + (parseInt(first_id) + index + 1),
          ebay_user: value[0],
          ebay_password: value[1],
          ebay_detail: value[2],
          ebay_limit: value[3],
          ebay_item: value[4],
          ebay_sold: value[5],
          ebay_feedback: value[6],
          ebay_plan: body.plan,
          ebay_block: body.block,
          list_view: body.view,
          ebay_class: body.class,
          ebay_employee: body.employee,
          ebay_owner: body.owner,
          ebay_processing: body.processing,
          ebay_sell_status: body.sell_status,
          ebay_status: body.status,
          ebay_type: body.type,
        };
        var ebay = new Ebay(ebay_data);
        ebay.save((err, acc) => {
          if (err) {
            return res.status(400).json({
              error: "Thêm ebay không thành công",
            });
          }
        });
      });
    });
  }

  if (type == "amazon") {
    Amazon.countDocuments().exec((err, amazon) => {
      if (err || !amazon) {
        res.status(400).json({
          message: "Không tìm thấy amazon",
        });
      }
      let first_id = amazon;
      data.forEach((item, index) => {
        let value = item.split("|");

        var amazon_data = {
          amazon_id: "AM_" + (parseInt(first_id) + index + 1),
          amazon_user: value[0],
          amazon_password: value[1],
          amazon_detail: value[2],
          amazon_limit: value[3],
          amazon_item: value[4],
          amazon_sold: value[5],
          amazon_feedback: value[6],
          amazon_plan: body.plan,
          amazon_block: body.block,
          list_view: body.view,
          amazon_class: body.class,
          amazon_employee: body.employee,
          amazon_owner: body.owner,
          amazon_processing: body.processing,
          amazon_sell_status: body.sell_status,
          amazon_status: body.status,
          amazon_type: body.type,
        };
        var amazon = new Amazon(amazon_data);
        amazon.save((err, acc) => {
          if (err) {
            return res.status(400).json({
              error: "Thêm amazon không thành công",
            });
          }
        });
      });
    });
  }

  if (type == "shopee") {
    Shopee.countDocuments().exec((err, shopee) => {
      if (err || !shopee) {
        res.status(400).json({
          message: "Không tìm thấy shopee",
        });
      }
      let first_id = shopee;
      console.log(first_id)
      data.forEach((item, index) => {
        let value = item.split("|");

        var shopee_data = {
          shopee_id: "SP_" + (parseInt(first_id) + index + 1),
          shopee_user: value[0],
          shopee_password: value[1],
          shopee_detail: value[2],
          shopee_limit: value[3],
          shopee_item: value[4],
          shopee_sold: value[5],
          shopee_feedback: value[6],
          shopee_plan: body.plan,
          shopee_block: body.block,
          list_view: body.view,
          shopee_class: body.class,
          shopee_employee: body.employee,
          shopee_owner: body.owner,
          shopee_processing: body.processing,
          shopee_sell_status: body.sell_status,
          shopee_status: body.status,
          shopee_type: body.type,
        };
        var shopee = new Shopee(shopee_data);
        shopee.save((err, acc) => {
          if (err) {
            return res.status(400).json({
              error: "Thêm shopee không thành công",
            });
          }
        });
      });
    });
  }

  if (type == "payoneer") {
    Payoneer.countDocuments().exec((err, payoneer) => {
      if (err || !payoneer) {
        res.status(400).json({
          message: "Không tìm thấy payoneer",
        });
      }
      let first_id = payoneer;
      data.forEach((item, index) => {
        let value = item.split("|");

        var payoneer_data = {
          payoneer_id: "PO_" + (parseInt(first_id) + index + 1),
          payoneer_user: value[0],
          payoneer_password: value[1],
          payoneer_detail: value[2],
          payoneer_limit: value[3],
          payoneer_item: value[4],
          payoneer_sold: value[5],
          payoneer_feedback: value[6],
          payoneer_plan: body.plan,
          payoneer_block: body.block,
          list_view: body.view,
          payoneer_class: body.class,
          payoneer_employee: body.employee,
          payoneer_owner: body.owner,
          payoneer_processing: body.processing,
          payoneer_sell_status: body.sell_status,
          payoneer_status: body.status,
          payoneer_type: body.type,
        };
        var payoneer = new Payoneer(payoneer_data);
        payoneer.save((err, acc) => {
          if (err) {
            return res.status(400).json({
              error: "Thêm payoneer không thành công",
            });
          }
        });
      });
    });
  }

  if (type == "paypal") {
    Paypal.countDocuments().exec((err, paypal) => {
      if (err || !paypal) {
        res.status(400).json({
          message: "Không tìm thấy paypal",
        });
      }
      let first_id = paypal;
      data.forEach((item, index) => {
        let value = item.split("|");

        var paypal_data = {
          paypal_id: "PP_" + (parseInt(first_id) + index + 1),
          paypal_user: value[0],
          paypal_password: value[1],
          paypal_detail: value[2],
          paypal_limit: value[3],
          paypal_item: value[4],
          paypal_sold: value[5],
          paypal_feedback: value[6],
          paypal_plan: body.plan,
          paypal_block: body.block,
          list_view: body.view,
          paypal_class: body.class,
          paypal_employee: body.employee,
          paypal_owner: body.owner,
          paypal_processing: body.processing,
          paypal_sell_status: body.sell_status,
          paypal_status: body.status,
          paypal_type: body.type,
        };
        var paypal = new Paypal(paypal_data);
        paypal.save((err, acc) => {
          if (err) {
            return res.status(400).json({
              error: "Thêm paypal không thành công",
            });
          }
        });
      });
    });
  }

  if (type == "pingpong") {
    Pingpong.countDocuments().exec((err, pingpong) => {
      if (err || !pingpong) {
        res.status(400).json({
          message: "Không tìm thấy pingpong",
        });
      }
      let first_id = pingpong;
      data.forEach((item, index) => {
        let value = item.split("|");

        var pingpong_data = {
          pingpong_id: "PI_" + (parseInt(first_id) + index + 1),
          pingpong_user: value[0],
          pingpong_password: value[1],
          pingpong_detail: value[2],
          pingpong_limit: value[3],
          pingpong_item: value[4],
          pingpong_sold: value[5],
          pingpong_feedback: value[6],
          pingpong_plan: body.plan,
          pingpong_block: body.block,
          list_view: body.view,
          pingpong_class: body.class,
          pingpong_employee: body.employee,
          pingpong_owner: body.owner,
          pingpong_processing: body.processing,
          pingpong_sell_status: body.sell_status,
          pingpong_status: body.status,
          pingpong_type: body.type,
        };
        var pingpong = new Pingpong(pingpong_data);
        pingpong.save((err, acc) => {
          if (err) {
            return res.status(400).json({
              error: "Thêm pingpong không thành công",
            });
          }
        });
      });
    });
  }

  if (type == "bank") {
    Bank.countDocuments().exec((err, bank) => {
      if (err || !bank) {
        res.status(400).json({
          message: "Không tìm thấy bank",
        });
      }
      let first_id = bank;
      data.forEach((item, index) => {
        let value = item.split("|");

        var bank_data = {
          bank_id: "B_" + (parseInt(first_id) + index + 1),
          bank_user: value[0],
          bank_password: value[1],
          bank_detail: value[2],
          bank_limit: value[3],
          bank_item: value[4],
          bank_sold: value[5],
          bank_feedback: value[6],
          bank_plan: body.plan,
          bank_block: body.block,
          list_view: body.view,
          bank_class: body.class,
          bank_employee: body.employee,
          bank_owner: body.owner,
          bank_processing: body.processing,
          bank_sell_status: body.sell_status,
          bank_status: body.status,
          bank_type: body.type,
        };
        var bank = new Bank(bank_data);
        bank.save((err, acc) => {
          if (err) {
            return res.status(400).json({
              error: "Thêm bank không thành công",
            });
          }
        });
      });
    });
  }

  if (type == "mail") {
    Mail.countDocuments().exec((err, mail) => {
      if (err || !mail) {
        res.status(400).json({
          message: "Không tìm thấy mail",
        });
      }
      let first_id = mail;
      data.forEach((item, index) => {
        let value = item.split("|");

        var mail_data = {
          mail_id: "M_" + (parseInt(first_id) + index + 1),
          mail_user: value[0],
          mail_password: value[1],
          mail_detail: value[2],
          mail_limit: value[3],
          mail_item: value[4],
          mail_sold: value[5],
          mail_feedback: value[6],
          mail_plan: body.plan,
          mail_block: body.block,
          list_view: body.view,
          mail_class: body.class,
          mail_employee: body.employee,
          mail_owner: body.owner,
          mail_processing: body.processing,
          mail_sell_status: body.sell_status,
          mail_status: body.status,
          mail_type: body.type,
        };
        var mail = new Mail(mail_data);
        mail.save((err, acc) => {
          if (err) {
            return res.status(400).json({
              error: "Thêm mail không thành công",
            });
          }
        });
      });
    });
  }

  if (type == "sim") {
    Sim.countDocuments().exec((err, sim) => {
      if (err || !sim) {
        res.status(400).json({
          message: "Không tìm thấy sim",
        });
      }
      let first_id = sim;
      data.forEach((item, index) => {
        let value = item.split("|");

        var sim_data = {
          sim_id: "S_" + (parseInt(first_id) + index + 1),
          sim_user: value[0],
          sim_password: value[1],
          sim_detail: value[2],
          sim_limit: value[3],
          sim_item: value[4],
          sim_sold: value[5],
          sim_feedback: value[6],
          sim_plan: body.plan,
          sim_block: body.block,
          list_view: body.view,
          sim_class: body.class,
          sim_employee: body.employee,
          sim_owner: body.owner,
          sim_processing: body.processing,
          sim_sell_status: body.sell_status,
          sim_status: body.status,
          sim_type: body.type,
        };
        var sim = new Sim(sim_data);
        sim.save((err, acc) => {
          if (err) {
            return res.status(400).json({
              error: "Thêm sim không thành công",
            });
          }
        });
      });
    });
  }

  if (type == "device") {
    Device.countDocuments().exec((err, device) => {
      if (err || !device) {
        res.status(400).json({
          message: "Không tìm thấy device",
        });
      }
      let first_id = device;
      data.forEach((item, index) => {
        let value = item.split("|");

        var device_data = {
          device_id: "D_" + (parseInt(first_id) + index + 1),
          device_user: value[0],
          device_password: value[1],
          device_detail: value[2],
          device_limit: value[3],
          device_item: value[4],
          device_sold: value[5],
          device_feedback: value[6],
          device_plan: body.plan,
          device_block: body.block,
          list_view: body.view,
          device_class: body.class.replace("Lớp", "PC"),
          device_employee: body.employee,
          device_owner: body.owner,
          device_processing: body.processing,
          device_sell_status: body.sell_status,
          device_status: body.status,
          device_type: body.type,
        };
        var device = new Device(device_data);
        device.save((err, acc) => {
          if (err) {
            return res.status(400).json({
              error: "Thêm device không thành công",
            });
          }
        });
      });
    });
  }

  if (type == "proxy") {
    Proxy.countDocuments().exec((err, proxy) => {
      if (err || !proxy) {
        res.status(400).json({
          message: "Không tìm thấy proxy",
        });
      }
      let first_id = proxy;
      data.forEach((item, index) => {
        let value = item.split("|");

        var proxy_data = {
          proxy_id: "P_" + (parseInt(first_id) + index + 1),
          proxy_user: value[0],
          proxy_password: value[1],
          proxy_detail: value[2],
          proxy_limit: value[3],
          proxy_item: value[4],
          proxy_sold: value[5],
          proxy_feedback: value[6],
          proxy_plan: body.plan,
          proxy_block: body.block,
          list_view: body.view,
          proxy_class: body.class,
          proxy_employee: body.employee,
          proxy_owner: body.owner,
          proxy_processing: body.processing,
          proxy_sell_status: body.sell_status,
          proxy_status: body.status,
          proxy_type: body.type,
        };
        var proxy = new Proxy(proxy_data);
        proxy.save((err, acc) => {
          if (err) {
            return res.status(400).json({
              error: "Thêm proxy không thành công",
            });
          }
        });
      });
    });
  }

  if (type == "facebook") {
    Facebook.countDocuments().exec((err, facebook) => {
      if (err || !facebook) {
        res.status(400).json({
          message: "Không tìm thấy facebook",
        });
      }
      let first_id = facebook;
      data.forEach((item, index) => {
        let value = item.split("|");

        var facebook_data = {
          facebook_id: "FB_" + (parseInt(first_id) + index + 1),
          facebook_user: value[0],
          facebook_password: value[1],
          facebook_detail: value[2],
          facebook_limit: value[3],
          facebook_item: value[4],
          facebook_sold: value[5],
          facebook_feedback: value[6],
          facebook_plan: body.plan,
          facebook_block: body.block,
          list_view: body.view,
          facebook_class: body.class,
          facebook_employee: body.employee,
          facebook_owner: body.owner,
          facebook_processing: body.processing,
          facebook_sell_status: body.sell_status,
          facebook_status: body.status,
          facebook_type: body.type,
        };
        var facebook = new Facebook(facebook_data);
        facebook.save((err, acc) => {
          if (err) {
            return res.status(400).json({
              error: "Thêm facebook không thành công",
            });
          }
        });
      });
    });
  }

  if (type == "tiktok") {
    Tiktok.countDocuments().exec((err, tiktok) => {
      if (err || !tiktok) {
        res.status(400).json({
          message: "Không tìm thấy tiktok",
        });
      }
      let first_id = tiktok;
      data.forEach((item, index) => {
        let value = item.split("|");

        var tiktok_data = {
          tiktok_id: "TT_" + (parseInt(first_id) + index + 1),
          tiktok_user: value[0],
          tiktok_password: value[1],
          tiktok_detail: value[2],
          tiktok_limit: value[3],
          tiktok_item: value[4],
          tiktok_sold: value[5],
          tiktok_feedback: value[6],
          tiktok_plan: body.plan,
          tiktok_block: body.block,
          list_view: body.view,
          tiktok_class: body.class,
          tiktok_employee: body.employee,
          tiktok_owner: body.owner,
          tiktok_processing: body.processing,
          tiktok_sell_status: body.sell_status,
          tiktok_status: body.status,
          tiktok_type: body.type,
        };
        var tiktok = new Tiktok(tiktok_data);
        tiktok.save((err, acc) => {
          if (err) {
            return res.status(400).json({
              error: "Thêm tiktok không thành công",
            });
          }
        });
      });
    });
  }

  if (type == "info") {
    Info.countDocuments().exec((err, info) => {
      if (err || !info) {
        res.status(400).json({
          message: "Không tìm thấy info",
        });
      }
      let first_id = info;

      data.forEach((item, index) => {
        let value = item.split("|");

        var info_data = {
          info_id: "I_" + (parseInt(first_id) + index + 1),

          info_sex: value[0],
          infodate_birthday: value[1],
          info_fullname: value[2],
          info_passport: value[3],
          info_ssn: value[4],
          info_origin: value[5],
          info_code: value[6],
          info_residence: value[7],
          info_identifying: value[8],
          infodate_expiry: value[9],
          infodate_start: value[10],
          infodate_import: value[11],
          info_plan: body.plan,
          info_block: body.block,
          list_view: body.view,
          info_class: body.class,
          info_employee: body.employee,
          info_owner: body.owner,
          info_status: body.status,
          info_type: body.type,
        };

        var info = new Info(info_data);
        info.save((err, acc) => {
          if (err) {
            return res.status(400).json({
              error: "Thêm info không thành công",
            });
          }
        });
      });
    });
  }
};

// Hàm tạo ra liên kết các account
export const submit = (req, res) => {
  const type = req.query.type;
  if (type == "ebay") {
    Ebay.find().exec((err, ebay) => {
      ebay.forEach((item) => {
        if (item.list_view) {let list_view = item.list_view.split(",");
        list_view.forEach((view) => {
          if (!item[view]) {
            item[view] =
              view[0].toUpperCase() + "_" + item.ebay_id.split("_")[1];

            if (view == "payoneer_id") {
              item[view] = "PO" + "_" + item.ebay_id.split("_")[1];
            }
            if (view == "paypal_id") {
              item[view] = "PP" + "_" + item.ebay_id.split("_")[1];
            }
            if (view == "pingpong_id") {
              item[view] = "PI" + "_" + item.ebay_id.split("_")[1];
            }
            if (view == "ebay_id") {
              item[view] = "EB" + "_" + item.ebay_id.split("_")[1];
            }
            if (view == "etsy_id") {
              item[view] = "ET" + "_" + item.ebay_id.split("_")[1];
            }
            if (view == "amazon_id") {
              item[view] = "AM" + "_" + item.ebay_id.split("_")[1];
            }
            if (view == "shopee_id") {
              item[view] = "SP" + "_" + item.ebay_id.split("_")[1];
            }
            if (view == "facebook_id") {
              item[view] = "FB" + "_" + item.ebay_id.split("_")[1];
            }
            if (view == "tiktok_id") {
              item[view] = "TT" + "_" + item.ebay_id.split("_")[1];
            }

            Ebay.findOneAndUpdate(
              { ebay_id: item.ebay_id },
              { $set: item },
              { useFindAndModify: false },
              (err, ebay) => {}
            );
          }
        });}
        
      });
    });
  }

  if (type == "etsy") {
    Etsy.find().exec((err, etsy) => {
      etsy.forEach((item) => {
        if (item.list_view) {
          let list_view = item.list_view.split(",");
          list_view.forEach((view) => {
            if (!item[view]) {
              item[view] =
                view[0].toUpperCase() + "_" + item.etsy_id.split("_")[1];
              if (view == "payoneer_id") {
                item[view] = "PO" + "_" + item.etsy_id.split("_")[1];
              }
              if (view == "paypal_id") {
                item[view] = "PP" + "_" + item.etsy_id.split("_")[1];
              }
              if (view == "pingpong_id") {
                item[view] = "PI" + "_" + item.etsy_id.split("_")[1];
              }
              if (view == "ebay_id") {
                item[view] = "EB" + "_" + item.etsy_id.split("_")[1];
              }
              if (view == "etsy_id") {
                item[view] = "ET" + "_" + item.etsy_id.split("_")[1];
              }
              if (view == "amazon_id") {
                item[view] = "AM" + "_" + item.etsy_id.split("_")[1];
              }
              if (view == "shopee_id") {
                item[view] = "SP" + "_" + item.etsy_id.split("_")[1];
              }
              if (view == "facebook_id") {
                item[view] = "FB" + "_" + item.etsy_id.split("_")[1];
              }
              if (view == "tiktok_id") {
                item[view] = "TT" + "_" + item.etsy_id.split("_")[1];
              }

              Etsy.findOneAndUpdate(
                { etsy_id: item.etsy_id },
                { $set: item },
                { useFindAndModify: false },
                (err, etsy) => {}
              );
            }
          });
        }
      });
    });
  }

  if (type == "shopee") {
    Shopee.find().exec((err, shopee) => {
     
      shopee.forEach((item) => {
        if (item.list_view) {
          let list_view = item.list_view.split(",");
          list_view.forEach((view) => {
            if (!item[view]) {
              item[view] =
                view[0].toUpperCase() + "_" + item.shopee_id.split("_")[1];
              if (view == "payoneer_id") {
                item[view] = "PO" + "_" + item.shopee_id.split("_")[1];
              }
              if (view == "paypal_id") {
                item[view] = "PP" + "_" + item.shopee_id.split("_")[1];
              }
              if (view == "pingpong_id") {
                item[view] = "PI" + "_" + item.shopee_id.split("_")[1];
              }
              if (view == "ebay_id") {
                item[view] = "EB" + "_" + item.shopee_id.split("_")[1];
              }
              if (view == "etsy_id") {
                item[view] = "ET" + "_" + item.shopee_id.split("_")[1];
              }
              if (view == "amazon_id") {
                item[view] = "AM" + "_" + item.shopee_id.split("_")[1];
              }
              if (view == "shopee_id") {
                item[view] = "SP" + "_" + item.shopee_id.split("_")[1];
              }
              if (view == "facebook_id") {
                item[view] = "FB" + "_" + item.shopee_id.split("_")[1];
              }
              if (view == "tiktok_id") {
                item[view] = "TT" + "_" + item.shopee_id.split("_")[1];
              }
  
              Shopee.findOneAndUpdate(
                { shopee_id: item.shopee_id },
                { $set: item },
                { useFindAndModify: false },
                (err, shopee) => {}
              );
            }
          });
        }
        
      });
    });
  }

  if (type == "amazon") {
    Amazon.find().exec((err, amazon) => {
      amazon.forEach((item) => {
        if (item.list_view) {
          let list_view = item.list_view.split(",");
          list_view.forEach((view) => {
            if (!item[view]) {
              item[view] =
                view[0].toUpperCase() + "_" + item.amazon_id.split("_")[1];

              if (view == "payoneer_id") {
                item[view] = "PO" + "_" + item.amazon_id.split("_")[1];
              }
              if (view == "paypal_id") {
                item[view] = "PP" + "_" + item.amazon_id.split("_")[1];
              }
              if (view == "pingpong_id") {
                item[view] = "PI" + "_" + item.amazon_id.split("_")[1];
              }
              if (view == "ebay_id") {
                item[view] = "EB" + "_" + item.amazon_id.split("_")[1];
              }
              if (view == "etsy_id") {
                item[view] = "ET" + "_" + item.amazon_id.split("_")[1];
              }
              if (view == "amazon_id") {
                item[view] = "AM" + "_" + item.amazon_id.split("_")[1];
              }
              if (view == "shopee_id") {
                item[view] = "SP" + "_" + item.amazon_id.split("_")[1];
              }
              if (view == "facebook_id") {
                item[view] = "FB" + "_" + item.amazon_id.split("_")[1];
              }
              if (view == "tiktok_id") {
                item[view] = "TT" + "_" + item.amazon_id.split("_")[1];
              }

              Amazon.findOneAndUpdate(
                { amazon_id: item.amazon_id },
                { $set: item },
                { useFindAndModify: false },
                (err, amazon) => {}
              );
            }
          });
        }
      });
    });
  }

  if (type == "facebook") {
    Facebook.find().exec((err, facebook) => {
      facebook.forEach((item) => {
        if (item.list_view) {
          let list_view = item.list_view.split(",");
          list_view.forEach((view) => {
            if (!item[view]) {
              item[view] =
                view[0].toUpperCase() + "_" + item.facebook_id.split("_")[1];

              if (view == "payoneer_id") {
                item[view] = "PO" + "_" + item.facebook_id.split("_")[1];
              }
              if (view == "paypal_id") {
                item[view] = "PP" + "_" + item.facebook_id.split("_")[1];
              }
              if (view == "pingpong_id") {
                item[view] = "PI" + "_" + item.facebook_id.split("_")[1];
              }
              if (view == "ebay_id") {
                item[view] = "EB" + "_" + item.facebook_id.split("_")[1];
              }
              if (view == "etsy_id") {
                item[view] = "ET" + "_" + item.facebook_id.split("_")[1];
              }
              if (view == "amazon_id") {
                item[view] = "AM" + "_" + item.facebook_id.split("_")[1];
              }
              if (view == "shopee_id") {
                item[view] = "SP" + "_" + item.facebook_id.split("_")[1];
              }
              if (view == "facebook_id") {
                item[view] = "FB" + "_" + item.facebook_id.split("_")[1];
              }
              if (view == "tiktok_id") {
                item[view] = "TT" + "_" + item.facebook_id.split("_")[1];
              }

              Facebook.findOneAndUpdate(
                { facebook_id: item.facebook_id },
                { $set: item },
                { useFindAndModify: false },
                (err, facebook) => {}
              );
            }
          });
        }
      });
    });
  }

  if (type == "tiktok") {
    Tiktok.find().exec((err, tiktok) => {
      tiktok.forEach((item) => {
        if (item.list_view) {
          let list_view = item.list_view.split(",");
          list_view.forEach((view) => {
            if (!item[view]) {
              item[view] =
                view[0].toUpperCase() + "_" + item.tiktok_id.split("_")[1];

              if (view == "payoneer_id") {
                item[view] = "PO" + "_" + item.tiktok_id.split("_")[1];
              }
              if (view == "paypal_id") {
                item[view] = "PP" + "_" + item.tiktok_id.split("_")[1];
              }
              if (view == "pingpong_id") {
                item[view] = "PI" + "_" + item.tiktok_id.split("_")[1];
              }
              if (view == "ebay_id") {
                item[view] = "EB" + "_" + item.tiktok_id.split("_")[1];
              }
              if (view == "etsy_id") {
                item[view] = "ET" + "_" + item.tiktok_id.split("_")[1];
              }
              if (view == "amazon_id") {
                item[view] = "AM" + "_" + item.tiktok_id.split("_")[1];
              }
              if (view == "shopee_id") {
                item[view] = "SP" + "_" + item.tiktok_id.split("_")[1];
              }
              if (view == "facebook_id") {
                item[view] = "FB" + "_" + item.tiktok_id.split("_")[1];
              }
              if (view == "tiktok_id") {
                item[view] = "TT" + "_" + item.tiktok_id.split("_")[1];
              }

              Tiktok.findOneAndUpdate(
                { tiktok_id: item.tiktok_id },
                { $set: item },
                { useFindAndModify: false },
                (err, tiktok) => {}
              );
            }
          });
        }
      });
    });
  }

  if (type == "payoneer") {
    Payoneer.find().exec((err, payoneer) => {
      payoneer.forEach((item) => {
        if (item.list_view) {
          let list_view = item.list_view.split(",");
          list_view.forEach((view) => {
            if (!item[view]) {
              item[view] =
                view[0].toUpperCase() + "_" + item.payoneer_id.split("_")[1];

              if (view == "payoneer_id") {
                item[view] = "PO" + "_" + item.payoneer_id.split("_")[1];
              }
              if (view == "paypal_id") {
                item[view] = "PP" + "_" + item.payoneer_id.split("_")[1];
              }
              if (view == "pingpong_id") {
                item[view] = "PI" + "_" + item.payoneer_id.split("_")[1];
              }
              if (view == "ebay_id") {
                item[view] = "EB" + "_" + item.payoneer_id.split("_")[1];
              }
              if (view == "etsy_id") {
                item[view] = "ET" + "_" + item.payoneer_id.split("_")[1];
              }
              if (view == "amazon_id") {
                item[view] = "AM" + "_" + item.payoneer_id.split("_")[1];
              }
              if (view == "shopee_id") {
                item[view] = "SP" + "_" + item.payoneer_id.split("_")[1];
              }
              if (view == "facebook_id") {
                item[view] = "FB" + "_" + item.payoneer_id.split("_")[1];
              }
              if (view == "tiktok_id") {
                item[view] = "TT" + "_" + item.payoneer_id.split("_")[1];
              }

              Payoneer.findOneAndUpdate(
                { payoneer_id: item.payoneer_id },
                { $set: item },
                { useFindAndModify: false },
                (err, payoneer) => {}
              );
            }
          });
        }
      });
    });
  }

  if (type == "paypal") {
    Paypal.find().exec((err, paypal) => {
      paypal.forEach((item) => {
        if (item.list_view) {
          let list_view = item.list_view.split(",");
          list_view.forEach((view) => {
            if (!item[view]) {
              item[view] =
                view[0].toUpperCase() + "_" + item.paypal_id.split("_")[1];

              if (view == "payoneer_id") {
                item[view] = "PO" + "_" + item.paypal_id.split("_")[1];
              }
              if (view == "paypal_id") {
                item[view] = "PP" + "_" + item.paypal_id.split("_")[1];
              }
              if (view == "pingpong_id") {
                item[view] = "PI" + "_" + item.paypal_id.split("_")[1];
              }
              if (view == "ebay_id") {
                item[view] = "EB" + "_" + item.paypal_id.split("_")[1];
              }
              if (view == "etsy_id") {
                item[view] = "ET" + "_" + item.paypal_id.split("_")[1];
              }
              if (view == "amazon_id") {
                item[view] = "AM" + "_" + item.paypal_id.split("_")[1];
              }
              if (view == "shopee_id") {
                item[view] = "SP" + "_" + item.paypal_id.split("_")[1];
              }
              if (view == "facebook_id") {
                item[view] = "FB" + "_" + item.paypal_id.split("_")[1];
              }
              if (view == "tiktok_id") {
                item[view] = "TT" + "_" + item.paypal_id.split("_")[1];
              }

              Paypal.findOneAndUpdate(
                { paypal_id: item.paypal_id },
                { $set: item },
                { useFindAndModify: false },
                (err, paypal) => {}
              );
            }
          });
        }
      });
    });
  }

  if (type == "pingpong") {
    Pingpong.find().exec((err, pingpong) => {
      pingpong.forEach((item) => {
        if (item.list_view) {
          let list_view = item.list_view.split(",");
          list_view.forEach((view) => {
            if (!item[view]) {
              item[view] =
                view[0].toUpperCase() + "_" + item.pingpong_id.split("_")[1];

              if (view == "payoneer_id") {
                item[view] = "PO" + "_" + item.pingpong_id.split("_")[1];
              }
              if (view == "paypal_id") {
                item[view] = "PP" + "_" + item.pingpong_id.split("_")[1];
              }
              if (view == "pingpong_id") {
                item[view] = "PI" + "_" + item.pingpong_id.split("_")[1];
              }
              if (view == "ebay_id") {
                item[view] = "EB" + "_" + item.pingpong_id.split("_")[1];
              }
              if (view == "etsy_id") {
                item[view] = "ET" + "_" + item.pingpong_id.split("_")[1];
              }
              if (view == "amazon_id") {
                item[view] = "AM" + "_" + item.pingpong_id.split("_")[1];
              }
              if (view == "shopee_id") {
                item[view] = "SP" + "_" + item.pingpong_id.split("_")[1];
              }
              if (view == "facebook_id") {
                item[view] = "FB" + "_" + item.pingpong_id.split("_")[1];
              }
              if (view == "tiktok_id") {
                item[view] = "TT" + "_" + item.pingpong_id.split("_")[1];
              }

              Pingpong.findOneAndUpdate(
                { pingpong_id: item.pingpong_id },
                { $set: item },
                { useFindAndModify: false },
                (err, pingpong) => {}
              );
            }
          });
        }
      });
    });
  }

  if (type == "bank") {
    Bank.find().exec((err, bank) => {
      bank.forEach((item) => {
        if (item.list_view) {
          let list_view = item.list_view.split(",");
          list_view.forEach((view) => {
            if (!item[view]) {
              item[view] =
                view[0].toUpperCase() + "_" + item.bank_id.split("_")[1];

              if (view == "payoneer_id") {
                item[view] = "PO" + "_" + item.bank_id.split("_")[1];
              }
              if (view == "paypal_id") {
                item[view] = "PP" + "_" + item.bank_id.split("_")[1];
              }
              if (view == "pingpong_id") {
                item[view] = "PI" + "_" + item.bank_id.split("_")[1];
              }
              if (view == "bank_id") {
                item[view] = "EB" + "_" + item.bank_id.split("_")[1];
              }
              if (view == "etsy_id") {
                item[view] = "ET" + "_" + item.bank_id.split("_")[1];
              }
              if (view == "amazon_id") {
                item[view] = "AM" + "_" + item.bank_id.split("_")[1];
              }
              if (view == "shopee_id") {
                item[view] = "SP" + "_" + item.bank_id.split("_")[1];
              }
              if (view == "facebook_id") {
                item[view] = "FB" + "_" + item.bank_id.split("_")[1];
              }
              if (view == "tiktok_id") {
                item[view] = "TT" + "_" + item.bank_id.split("_")[1];
              }

              Bank.findOneAndUpdate(
                { bank_id: item.bank_id },
                { $set: item },
                { useFindAndModify: false },
                (err, bank) => {}
              );
            }
          });
        }
      });
    });
  }

  if (type == "mail") {
    Mail.find().exec((err, mail) => {
      mail.forEach((item) => {
        if (item.list_view) {
          let list_view = item.list_view.split(",");
          list_view.forEach((view) => {
            if (!item[view]) {
              item[view] =
                view[0].toUpperCase() + "_" + item.mail_id.split("_")[1];

              if (view == "payoneer_id") {
                item[view] = "PO" + "_" + item.mail_id.split("_")[1];
              }
              if (view == "paypal_id") {
                item[view] = "PP" + "_" + item.mail_id.split("_")[1];
              }
              if (view == "pingpong_id") {
                item[view] = "PI" + "_" + item.mail_id.split("_")[1];
              }
              if (view == "ebay_id") {
                item[view] = "EB" + "_" + item.mail_id.split("_")[1];
              }
              if (view == "etsy_id") {
                item[view] = "ET" + "_" + item.mail_id.split("_")[1];
              }
              if (view == "amazon_id") {
                item[view] = "AM" + "_" + item.mail_id.split("_")[1];
              }
              if (view == "shopee_id") {
                item[view] = "SP" + "_" + item.mail_id.split("_")[1];
              }
              if (view == "facebook_id") {
                item[view] = "FB" + "_" + item.mail_id.split("_")[1];
              }
              if (view == "tiktok_id") {
                item[view] = "TT" + "_" + item.mail_id.split("_")[1];
              }

              Mail.findOneAndUpdate(
                { mail_id: item.mail_id },
                { $set: item },
                { useFindAndModify: false },
                (err, mail) => {}
              );
            }
          });
        }
      });
    });
  }

  if (type == "info") {
    Info.find().exec((err, info) => {
      info.forEach((item) => {
        if (item.list_view) {
          let list_view = item.list_view.split(",");
          list_view.forEach((view) => {
            if (!item[view]) {
              item[view] =
                view[0].toUpperCase() + "_" + item.info_id.split("_")[1];

              if (view == "payoneer_id") {
                item[view] = "PO" + "_" + item.info_id.split("_")[1];
              }
              if (view == "paypal_id") {
                item[view] = "PP" + "_" + item.info_id.split("_")[1];
              }
              if (view == "pingpong_id") {
                item[view] = "PI" + "_" + item.info_id.split("_")[1];
              }
              if (view == "ebay_id") {
                item[view] = "EB" + "_" + item.info_id.split("_")[1];
              }
              if (view == "etsy_id") {
                item[view] = "ET" + "_" + item.info_id.split("_")[1];
              }
              if (view == "amazon_id") {
                item[view] = "AM" + "_" + item.info_id.split("_")[1];
              }
              if (view == "shopee_id") {
                item[view] = "SP" + "_" + item.info_id.split("_")[1];
              }
              if (view == "facebook_id") {
                item[view] = "FB" + "_" + item.info_id.split("_")[1];
              }
              if (view == "tiktok_id") {
                item[view] = "TT" + "_" + item.info_id.split("_")[1];
              }

              Info.findOneAndUpdate(
                { info_id: item.info_id },
                { $set: item },
                { useFindAndModify: false },
                (err, info) => {}
              );
            }
          });
        }
      });
    });
  }

  if (type == "sim") {
    Sim.find().exec((err, sim) => {
      sim.forEach((item) => {
        if (item.list_view) {
          let list_view = item.list_view.split(",");
          list_view.forEach((view) => {
            if (!item[view]) {
              item[view] =
                view[0].toUpperCase() + "_" + item.sim_id.split("_")[1];

              if (view == "payoneer_id") {
                item[view] = "PO" + "_" + item.sim_id.split("_")[1];
              }
              if (view == "paypal_id") {
                item[view] = "PP" + "_" + item.sim_id.split("_")[1];
              }
              if (view == "pingpong_id") {
                item[view] = "PI" + "_" + item.sim_id.split("_")[1];
              }
              if (view == "ebay_id") {
                item[view] = "EB" + "_" + item.sim_id.split("_")[1];
              }
              if (view == "etsy_id") {
                item[view] = "ET" + "_" + item.sim_id.split("_")[1];
              }
              if (view == "amazon_id") {
                item[view] = "AM" + "_" + item.sim_id.split("_")[1];
              }
              if (view == "shopee_id") {
                item[view] = "SP" + "_" + item.sim_id.split("_")[1];
              }
              if (view == "facebook_id") {
                item[view] = "FB" + "_" + item.sim_id.split("_")[1];
              }
              if (view == "tiktok_id") {
                item[view] = "TT" + "_" + item.sim_id.split("_")[1];
              }

              Sim.findOneAndUpdate(
                { sim_id: item.sim_id },
                { $set: item },
                { useFindAndModify: false },
                (err, sim) => {}
              );
            }
          });
        }
      });
    });
  }

  if (type == "device") {
    Device.find().exec((err, device) => {
      device.forEach((item) => {
        if (item.list_view) {
          let list_view = item.list_view.split(",");
          list_view.forEach((view) => {
            if (!item[view]) {
              item[view] =
                view[0].toUpperCase() + "_" + item.device_id.split("_")[1];

              if (view == "payoneer_id") {
                item[view] = "PO" + "_" + item.device_id.split("_")[1];
              }
              if (view == "paypal_id") {
                item[view] = "PP" + "_" + item.device_id.split("_")[1];
              }
              if (view == "pingpong_id") {
                item[view] = "PI" + "_" + item.device_id.split("_")[1];
              }
              if (view == "ebay_id") {
                item[view] = "EB" + "_" + item.device_id.split("_")[1];
              }
              if (view == "etsy_id") {
                item[view] = "ET" + "_" + item.device_id.split("_")[1];
              }
              if (view == "amazon_id") {
                item[view] = "AM" + "_" + item.device_id.split("_")[1];
              }
              if (view == "shopee_id") {
                item[view] = "SP" + "_" + item.device_id.split("_")[1];
              }
              if (view == "facebook_id") {
                item[view] = "FB" + "_" + item.device_id.split("_")[1];
              }
              if (view == "tiktok_id") {
                item[view] = "TT" + "_" + item.device_id.split("_")[1];
              }

              Device.findOneAndUpdate(
                { device_id: item.device_id },
                { $set: item },
                { useFindAndModify: false },
                (err, device) => {}
              );
            }
          });
        }
      });
    });
  }

  if (type == "proxy") {
    Proxy.find().exec((err, proxy) => {
      proxy.forEach((item) => {
        if (item.list_view) {
          let list_view = item.list_view.split(",");
          list_view.forEach((view) => {
            if (!item[view]) {
              item[view] =
                view[0].toUpperCase() + "_" + item.proxy_id.split("_")[1];

              if (view == "payoneer_id") {
                item[view] = "PO" + "_" + item.proxy_id.split("_")[1];
              }
              if (view == "paypal_id") {
                item[view] = "PP" + "_" + item.proxy_id.split("_")[1];
              }
              if (view == "pingpong_id") {
                item[view] = "PI" + "_" + item.proxy_id.split("_")[1];
              }
              if (view == "ebay_id") {
                item[view] = "EB" + "_" + item.proxy_id.split("_")[1];
              }
              if (view == "etsy_id") {
                item[view] = "ET" + "_" + item.proxy_id.split("_")[1];
              }
              if (view == "amazon_id") {
                item[view] = "AM" + "_" + item.proxy_id.split("_")[1];
              }
              if (view == "shopee_id") {
                item[view] = "SP" + "_" + item.proxy_id.split("_")[1];
              }
              if (view == "facebook_id") {
                item[view] = "FB" + "_" + item.proxy_id.split("_")[1];
              }
              if (view == "tiktok_id") {
                item[view] = "TT" + "_" + item.proxy_id.split("_")[1];
              }

              Proxy.findOneAndUpdate(
                { proxy_id: item.proxy_id },
                { $set: item },
                { useFindAndModify: false },
                (err, proxy) => {}
              );
            }
          });
        }
      });
    });
  }
};
