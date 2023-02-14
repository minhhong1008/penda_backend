import Device from "../models/device";
import Proxy from "../models/proxy";
import Info from "../models/info";
import Mail from "../models/mail";
import Sim from "../models/sim";
import Bank from "../models/bank";
import Payoneer from "../models/payoneer";
import Paypal from "../models/paypal";
import Pingpong from "../models/pingpong";
import Ebay from "../models/ebay";
import Etsy from "../models/etsy";
import Amazon from "../models/amazon";
import Shopee from "../models/shopee";
import Facebook from "../models/facebook";
import Tiktok from "../models/tiktok";
import Customer from "../models/customer";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";
import moment from "moment";

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

export const Create_newdata = (req, res) => {
  let type = req.query.type;
  let body = req.body;
  let data = req.body.data.split("\n");
  if (data.length - 1 == 0) {
    console.log("Không có dữ liệu");
    return;
  }
  console.log("ToolData : " + moment().format("YYYY-MM-DD HH:mm"));
  let types = type.split(",");

  if (types.indexOf("create") !== -1) {
    data.forEach((item, index) => {
      let value = item.split("|");
      let field_id = {};
      let temp_id = value[0];

      // Kiểm tra trùng id

      if (types.indexOf("device") !== -1) {
        Device.findOne({ device_id: temp_id }).exec((err, device) => {
          if (err) {
            return res.status(400).json({
              error: "Đã lỗi",
            });
          }
          if (!device) {
            let device = new Device({
              device_id: temp_id,
              device_class: "PC 1",
              list_view: body.view,
            });
            device.save((err, device) => {
              if (err) {
                return res.status(400).json({
                  error: "Đã lỗi",
                });
              }
              field_id.device_id = device._id;
            });
          }
        });
      }

      if (types.indexOf("proxy") !== -1) {
        Proxy.findOne({ proxy_id: temp_id }).exec((err, proxy) => {
          if (err) {
            return res.status(400).json({
              error: "Đã lỗi",
            });
          }
          if (!proxy) {
            let proxy = new Proxy({
              proxy_id: temp_id,
              proxy_class: "Lớp 1",
              list_view: body.view,
            });
            proxy.save((err, proxy) => {
              if (err) {
                return res.status(400).json({
                  error: "Đã lỗi",
                });
              }
              field_id.proxy_id = proxy._id;
            });
          }
        });
      }

      if (types.indexOf("info") !== -1) {
        Info.findOne({ info_id: temp_id }).exec((err, info) => {
          if (err) {
            return res.status(400).json({
              error: "Đã lỗi",
            });
          }
          if (!info) {
            let info = new Info({
              info_id: temp_id,
              info_class: "Lớp 1",
              list_view: body.view,
            });
            info.save((err, info) => {
              if (err) {
                return res.status(400).json({
                  error: "Đã lỗi",
                });
              }
              field_id.info_id = info._id;
            });
          }
        });
      }

      if (types.indexOf("sim") !== -1) {
        Sim.findOne({ sim_id: temp_id }).exec((err, sim) => {
          if (err) {
            return res.status(400).json({
              error: "Đã lỗi",
            });
          }
          if (!sim) {
            let sim = new Sim({
              sim_id: temp_id,
              sim_class: "Lớp 1",
              list_view: body.view,
            });
            sim.save((err, sim) => {
              if (err) {
                return res.status(400).json({
                  error: "Đã lỗi",
                });
              }
              field_id.sim_id = sim._id;
            });
          }
        });
      }

      if (types.indexOf("mail") !== -1) {
        Mail.findOne({ mail_id: temp_id }).exec((err, mail) => {
          if (err) {
            return res.status(400).json({
              error: "Đã lỗi",
            });
          }
          if (!mail) {
            let mail = new Mail({
              mail_id: temp_id,
              mail_class: "Lớp 1",
              list_view: body.view,
            });
            mail.save((err, mail) => {
              if (err) {
                return res.status(400).json({
                  error: "Đã lỗi",
                });
              }
              field_id.mail_id = mail._id;
            });
          }
        });
      }

      if (types.indexOf("bank") !== -1) {
        Bank.findOne({ bank_id: temp_id }).exec((err, bank) => {
          if (err) {
            return res.status(400).json({
              error: "Đã lỗi",
            });
          }
          if (!bank) {
            let bank = new Bank({
              bank_id: temp_id,
              bank_class: "Lớp 1",
              list_view: body.view,
            });
            bank.save((err, bank) => {
              if (err) {
                return res.status(400).json({
                  error: "Đã lỗi",
                });
              }
              field_id.bank_id = bank._id;
            });
          }
        });
      }

      if (types.indexOf("payoneer") !== -1) {
        Payoneer.findOne({ payoneer_id: temp_id }).exec((err, payoneer) => {
          if (err) {
            return res.status(400).json({
              error: "Đã lỗi",
            });
          }
          if (!payoneer) {
            let payoneer = new Payoneer({
              payoneer_id: temp_id,
              payoneer_class: "Lớp 1",
              list_view: body.view,
            });
            payoneer.save((err, payoneer) => {
              if (err) {
                return res.status(400).json({
                  error: "Đã lỗi",
                });
              }
              field_id.payoneer_id = payoneer._id;
            });
          }
        });
      }

      if (types.indexOf("paypal") !== -1) {
        Paypal.findOne({ paypal_id: temp_id }).exec((err, paypal) => {
          if (err) {
            return res.status(400).json({
              error: "Đã lỗi",
            });
          }
          if (!paypal) {
            let paypal = new Paypal({
              paypal_id: temp_id,
              paypal_class: "Lớp 1",
              list_view: body.view,
            });
            paypal.save((err, paypal) => {
              if (err) {
                return res.status(400).json({
                  error: "Đã lỗi",
                });
              }
              field_id.paypal_id = paypal._id;
            });
          }
        });
      }

      if (types.indexOf("pingpong") !== -1) {
        Pingpong.findOne({ pingpong_id: temp_id }).exec((err, pingpong) => {
          if (err) {
            return res.status(400).json({
              error: "Đã lỗi",
            });
          }
          if (!pingpong) {
            let pingpong = new Pingpong({
              pingpong_id: temp_id,
              pingpong_class: "Lớp 1",
              list_view: body.view,
            });
            pingpong.save((err, pingpong) => {
              if (err) {
                return res.status(400).json({
                  error: "Đã lỗi",
                });
              }
              field_id.pingpong_id = pingpong._id;
            });
          }
        });
      }

      if (types.indexOf("ebay") !== -1) {
        Ebay.findOne({ ebay_id: temp_id }).exec((err, ebay) => {
          if (err) {
            return res.status(400).json({
              error: "Đã lỗi",
            });
          }
          if (!ebay) {
            let ebay = new Ebay({
              ebay_id: temp_id,
              ebay_class: "Lớp 1",
              list_view: body.view,
            });
            ebay.save((err, ebay) => {
              if (err) {
                return res.status(400).json({
                  error: "Đã lỗi",
                });
              }
              field_id.ebay_id = ebay._id;
            });
          }
        });
      }

      if (types.indexOf("etsy") !== -1) {
        Etsy.findOne({ etsy_id: temp_id }).exec((err, etsy) => {
          if (err) {
            return res.status(400).json({
              error: "Đã lỗi",
            });
          }
          if (!etsy) {
            let etsy = new Etsy({
              etsy_id: temp_id,
              etsy_class: "Lớp 1",
              list_view: body.view,
            });
            etsy.save((err, etsy) => {
              if (err) {
                return res.status(400).json({
                  error: "Đã lỗi",
                });
              }
              field_id.etsy_id = etsy._id;
            });
          }
        });
      }

      if (types.indexOf("amazon") !== -1) {
        Amazon.findOne({ amazon_id: temp_id }).exec((err, amazon) => {
          if (err) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
          if (!amazon) {
            let amazon = new Amazon({
              amazon_id: temp_id,
              amazon_class: "Lớp 1",
              list_view: body.view,
            });
            amazon.save((err, amazon) => {
              if (err) {
                return res.status(400).json({
                  error: "Đã lỗi",
                });
              }
              field_id.amazon_id = amazon._id;
            });
          }
        });
      }

      if (types.indexOf("shopee") !== -1) {
        Shopee.findOne({ shopee_id: temp_id }).exec((err, shopee) => {
          if (err) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
          if (!shopee) {
            let shopee = new Shopee({
              shopee_id: temp_id,
              shopee_class: "Lớp 1",
              list_view: body.view,
            });
            shopee.save((err, shopee) => {
              if (err) {
                return res.status(400).json({
                  error: "Đã lỗi",
                });
              }
              field_id.shopee_id = shopee._id;
            });
          }
        });
      }

      if (types.indexOf("facebook") !== -1) {
        Facebook.findOne({ facebook_id: temp_id }).exec((err, facebook) => {
          if (err) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
          if (!facebook) {
            let facebook = new Facebook({
              facebook_id: temp_id,
              facebook_class: "Lớp 1",
              list_view: body.view,
            });
            facebook.save((err, facebook) => {
              if (err) {
                return res.status(400).json({
                  error: "Đã lỗi",
                });
              }
              field_id.facebook_id = facebook._id;
            });
          }
        });
      }

      if (types.indexOf("tiktok") !== -1) {
        Tiktok.findOne({ tiktok_id: temp_id }).exec((err, tiktok) => {
          if (err) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
          if (!tiktok) {
            let tiktok = new Tiktok({
              tiktok_id: temp_id,
              tiktok_class: "Lớp 1",
              list_view: body.view,
            });
            tiktok.save((err, tiktok) => {
              if (err) {
                return res.status(400).json({
                  error: "Đã lỗi",
                });
              }
              field_id.tiktok_id = tiktok._id;
            });
          }
        });
      }

      if (types.indexOf("customer") !== -1) {
        Customer.findOne({ customer_id: temp_id }).exec((err, customer) => {
          if (err) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
          if (!customer) {
            let customer = new Customer({
              customer_id: temp_id,
              customer_class: "Lớp 1",
            });
            customer.save((err, customer) => {
              if (err) {
                return res.status(400).json({
                  error: "Đã lỗi",
                });
              }
            });
          }
        });
      }

      // Update
      setTimeout(() => {
        if (types.indexOf("device") !== -1) {
          let device_item = JSON.parse(JSON.stringify(field_id));
          device_item.device_id = temp_id;
          Device.findOneAndUpdate(
            { device_id: temp_id },
            { $set: device_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }

        if (types.indexOf("proxy") !== -1) {
          let proxy_item = JSON.parse(JSON.stringify(field_id));
          proxy_item.proxy_id = temp_id;
          Proxy.findOneAndUpdate(
            { proxy_id: temp_id },
            { $set: proxy_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }

        if (types.indexOf("info") !== -1) {
          let info_item = JSON.parse(JSON.stringify(field_id));
          info_item.info_id = temp_id;
          Info.findOneAndUpdate(
            { info_id: temp_id },
            { $set: info_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }

        if (types.indexOf("mail") !== -1) {
          let mail_item = JSON.parse(JSON.stringify(field_id));
          mail_item.mail_id = temp_id;
          Mail.findOneAndUpdate(
            { mail_id: temp_id },
            { $set: mail_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }

        if (types.indexOf("sim") !== -1) {
          let sim_item = JSON.parse(JSON.stringify(field_id));
          sim_item.sim_id = temp_id;
          Sim.findOneAndUpdate(
            { sim_id: temp_id },
            { $set: sim_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }

        if (types.indexOf("bank") !== -1) {
          let bank_item = JSON.parse(JSON.stringify(field_id));
          bank_item.bank_id = temp_id;
          Bank.findOneAndUpdate(
            { bank_id: temp_id },
            { $set: bank_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }

        if (types.indexOf("payoneer") !== -1) {
          let payoneer_item = JSON.parse(JSON.stringify(field_id));
          payoneer_item.payoneer_id = temp_id;
          Payoneer.findOneAndUpdate(
            { payoneer_id: temp_id },
            { $set: payoneer_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }

        if (types.indexOf("paypal") !== -1) {
          let paypal_item = JSON.parse(JSON.stringify(field_id));
          paypal_item.paypal_id = temp_id;
          Paypal.findOneAndUpdate(
            { paypal_id: temp_id },
            { $set: paypal_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }

        if (types.indexOf("pingpong") !== -1) {
          let pingpong_item = JSON.parse(JSON.stringify(field_id));
          pingpong_item.pingpong_id = temp_id;
          Pingpong.findOneAndUpdate(
            { pingpong_id: temp_id },
            { $set: pingpong_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }

        if (types.indexOf("ebay") !== -1) {
          let ebay_item = JSON.parse(JSON.stringify(field_id));
          ebay_item.ebay_id = temp_id;
          Ebay.findOneAndUpdate(
            { ebay_id: temp_id },
            { $set: ebay_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }

        if (types.indexOf("etsy") !== -1) {
          let etsy_item = JSON.parse(JSON.stringify(field_id));
          etsy_item.etsy_id = temp_id;
          Etsy.findOneAndUpdate(
            { etsy_id: temp_id },
            { $set: etsy_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }
        if (types.indexOf("amazon") !== -1) {
          let amazon_item = JSON.parse(JSON.stringify(field_id));
          amazon_item.amazon_id = temp_id;
          Amazon.findOneAndUpdate(
            { amazon_id: temp_id },
            { $set: amazon_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }

        if (types.indexOf("shopee") !== -1) {
          let shopee_item = JSON.parse(JSON.stringify(field_id));
          shopee_item.shopee_id = temp_id;
          Shopee.findOneAndUpdate(
            { shopee_id: temp_id },
            { $set: shopee_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }
        if (types.indexOf("facebook") !== -1) {
          let facebook_item = JSON.parse(JSON.stringify(field_id));
          facebook_item.facebook_id = temp_id;
          Facebook.findOneAndUpdate(
            { facebook_id: temp_id },
            { $set: facebook_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }

        if (types.indexOf("tiktok") !== -1) {
          let tiktok_item = JSON.parse(JSON.stringify(field_id));
          tiktok_item.tiktok_id = temp_id;
          Tiktok.findOneAndUpdate(
            { tiktok_id: temp_id },
            { $set: tiktok_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }
      }, 8000);
    });
  }

  if (types.indexOf("update") !== -1) {
    if (types.indexOf("device") !== -1) {
      data.forEach((item, index) => {
        let value = item.split("|");
        let temp_id = value[0];
        var device_data = {
          device_id: temp_id,
          device_user: value[1],
          device_password: value[2],
          device_detail: value[3],
          device_limit: value[4],
          device_item: value[5],
          device_sold: value[6],
          device_feedback: value[7],
          device_plan: body.plan,
          device_block: body.block,
          list_view: body.view,
          device_processing: body.processing,
          device_sell_status: body.sell_status,
          device_error: body.error,
          device_employee: body.employee,
          device_owner: body.owner,
          device_status: body.status,
          device_type: body.type,
        };
        if (body.class) {
          device_data.device_class = body.class.replace("Lớp", "PC");
        }
        for (const key in device_data) {
          if (
            device_data[key] == "" ||
            typeof device_data[key] === "undefined"
          ) {
            delete device_data[key];
          }
        }
        Device.findOneAndUpdate(
          { device_id: temp_id },
          { $set: device_data },
          { useFindAndModify: false }
        ).exec((err, item) => {
          if (err) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
        });
      });
    }

    if (types.indexOf("proxy") !== -1) {
      data.forEach((item, index) => {
        let value = item.split("|");
        let temp_id = value[0];
        var proxy_data = {
          proxy_id: temp_id,
          proxy_user: value[1],
          proxy_password: value[2],
          proxy_detail: value[3],
          proxy_limit: value[4],
          proxy_item: value[5],
          proxy_sold: value[6],
          proxy_feedback: value[7],
          proxy_plan: body.plan,
          proxy_block: body.block,
          list_view: body.view,
          proxy_processing: body.processing,
          proxy_sell_status: body.sell_status,
          proxy_error: body.error,
          proxy_class: body.class,
          proxy_employee: body.employee,
          proxy_owner: body.owner,
          proxy_status: body.status,
          proxy_type: body.type,
        };
        for (const key in proxy_data) {
          if (proxy_data[key] == "" || typeof proxy_data[key] === "undefined") {
            delete proxy_data[key];
          }
        }
        Proxy.findOneAndUpdate(
          { proxy_id: temp_id },
          { $set: proxy_data },
          { useFindAndModify: false }
        ).exec((err, item) => {
          if (err) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
        });
      });
    }

    if (types.indexOf("info") !== -1) {
      data.forEach((item, index) => {
        let value = item.split("|");
        let temp_id = value[0];
        var info_data = {
          info_id: temp_id,
          info_sex: value[1],
          infodate_birthday: value[2],
          info_fullname: value[3],
          info_passport: value[4],
          info_ssn: value[5],
          info_origin: value[6],
          info_residence: value[7],
          info_code: value[8],
          info_identifying: value[9],
          info_password: value[10],
          infodate_expiry: value[11],
          infodate_start: value[12],
          infodate_import: value[13],
          info_plan: body.plan,
          info_block: body.block,
          list_view: body.view,
          info_processing: body.processing,
          info_sell_status: body.sell_status,
          info_error: body.error,
          info_class: body.class,
          info_employee: body.employee,
          info_owner: body.owner,
          info_status: body.status,
          info_type: body.type,
        };
        for (const key in info_data) {
          if (info_data[key] == "" || typeof info_data[key] === "undefined") {
            delete info_data[key];
          }
        }
        Info.findOneAndUpdate(
          { info_id: temp_id },
          { $set: info_data },
          { useFindAndModify: false }
        ).exec((err, item) => {
          if (err) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
        });
      });
    }

    if (types.indexOf("mail") !== -1) {
      data.forEach((item, index) => {
        let value = item.split("|");
        let temp_id = value[0];
        var mail_data = {
          mail_id: temp_id,
          mail_user: value[1],
          mail_password: value[2],
          mail_detail: value[3],
          mail_limit: value[4],
          mail_item: value[5],
          mail_sold: value[6],
          mail_feedback: value[7],
          mail_plan: body.plan,
          mail_block: body.block,
          list_view: body.view,
          mail_processing: body.processing,
          mail_sell_status: body.sell_status,
          mail_error: body.error,
          mail_class: body.class,
          mail_employee: body.employee,
          mail_owner: body.owner,
          mail_status: body.status,
          mail_type: body.type,
        };
        for (const key in mail_data) {
          if (mail_data[key] == "" || typeof mail_data[key] === "undefined") {
            delete mail_data[key];
          }
        }
        Mail.findOneAndUpdate(
          { mail_id: temp_id },
          { $set: mail_data },
          { useFindAndModify: false }
        ).exec((err, item) => {
          if (err) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
        });
      });
    }

    if (types.indexOf("sim") !== -1) {
      data.forEach((item, index) => {
        let value = item.split("|");
        let temp_id = value[0];
        var sim_data = {
          sim_id: temp_id,
          sim_user: value[1],
          sim_password: value[2],
          sim_detail: value[3],
          sim_limit: value[4],
          sim_item: value[5],
          sim_sold: value[6],
          sim_feedback: value[7],
          sim_plan: body.plan,
          sim_block: body.block,
          list_view: body.view,
          sim_processing: body.processing,
          sim_sell_status: body.sell_status,
          sim_error: body.error,
          sim_class: body.class,
          sim_employee: body.employee,
          sim_owner: body.owner,
          sim_status: body.status,
          sim_type: body.type,
        };
        for (const key in sim_data) {
          if (sim_data[key] == "" || typeof sim_data[key] === "undefined") {
            delete sim_data[key];
          }
        }
        Sim.findOneAndUpdate(
          { sim_id: temp_id },
          { $set: sim_data },
          { useFindAndModify: false }
        ).exec((err, item) => {
          if (err) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
        });
      });
    }

    if (types.indexOf("bank") !== -1) {
      data.forEach((item, index) => {
        let value = item.split("|");
        let temp_id = value[0];
        var bank_data = {
          bank_id: temp_id,
          bank_user: value[1],
          bank_password: value[2],
          bank_detail: value[3],
          bank_limit: value[4],
          bank_item: value[5],
          bank_sold: value[6],
          bank_feedback: value[7],
          bank_plan: body.plan,
          bank_block: body.block,
          list_view: body.view,
          bank_processing: body.processing,
          bank_sell_status: body.sell_status,
          bank_error: body.error,
          bank_class: body.class,
          bank_employee: body.employee,
          bank_owner: body.owner,
          bank_status: body.status,
          bank_type: body.type,
        };
        for (const key in bank_data) {
          if (bank_data[key] == "" || typeof bank_data[key] === "undefined") {
            delete bank_data[key];
          }
        }
        Bank.findOneAndUpdate(
          { bank_id: temp_id },
          { $set: bank_data },
          { useFindAndModify: false }
        ).exec((err, item) => {
          if (err) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
        });
      });
    }

    if (types.indexOf("payoneer") !== -1) {
      data.forEach((item, index) => {
        let value = item.split("|");
        let temp_id = value[0];
        var payoneer_data = {
          payoneer_id: temp_id,
          payoneer_user: value[1],
          payoneer_password: value[2],
          payoneer_detail: value[3],
          payoneer_limit: value[4],
          payoneer_item: value[5],
          payoneer_sold: value[6],
          payoneer_feedback: value[7],
          payoneer_plan: body.plan,
          payoneer_block: body.block,
          list_view: body.view,
          payoneer_processing: body.processing,
          payoneer_sell_status: body.sell_status,
          payoneer_error: body.error,
          payoneer_class: body.class,
          payoneer_employee: body.employee,
          payoneer_owner: body.owner,
          payoneer_status: body.status,
          payoneer_type: body.type,
        };
        for (const key in payoneer_data) {
          if (
            payoneer_data[key] == "" ||
            typeof payoneer_data[key] === "undefined"
          ) {
            delete payoneer_data[key];
          }
        }
        Payoneer.findOneAndUpdate(
          { payoneer_id: temp_id },
          { $set: payoneer_data },
          { useFindAndModify: false }
        ).exec((err, item) => {
          if (err) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
        });
      });
    }

    if (types.indexOf("paypal") !== -1) {
      data.forEach((item, index) => {
        let value = item.split("|");
        let temp_id = value[0];
        var paypal_data = {
          paypal_id: temp_id,
          paypal_user: value[1],
          paypal_password: value[2],
          paypal_detail: value[3],
          paypal_limit: value[4],
          paypal_item: value[5],
          paypal_sold: value[6],
          paypal_feedback: value[7],
          paypal_plan: body.plan,
          paypal_block: body.block,
          list_view: body.view,
          paypal_processing: body.processing,
          paypal_sell_status: body.sell_status,
          paypal_error: body.error,
          paypal_class: body.class,
          paypal_employee: body.employee,
          paypal_owner: body.owner,
          paypal_status: body.status,
          paypal_type: body.type,
        };
        for (const key in paypal_data) {
          if (
            paypal_data[key] == "" ||
            typeof paypal_data[key] === "undefined"
          ) {
            delete paypal_data[key];
          }
        }
        Paypal.findOneAndUpdate(
          { paypal_id: temp_id },
          { $set: paypal_data },
          { useFindAndModify: false }
        ).exec((err, item) => {
          if (err) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
        });
      });
    }

    if (types.indexOf("pingpong") !== -1) {
      data.forEach((item, index) => {
        let value = item.split("|");
        let temp_id = value[0];
        var pingpong_data = {
          pingpong_id: temp_id,
          pingpong_user: value[1],
          pingpong_password: value[2],
          pingpong_detail: value[3],
          pingpong_limit: value[4],
          pingpong_item: value[5],
          pingpong_sold: value[6],
          pingpong_feedback: value[7],
          pingpong_plan: body.plan,
          pingpong_block: body.block,
          list_view: body.view,
          pingpong_processing: body.processing,
          pingpong_sell_status: body.sell_status,
          pingpong_error: body.error,
          pingpong_class: body.class,
          pingpong_employee: body.employee,
          pingpong_owner: body.owner,
          pingpong_status: body.status,
          pingpong_type: body.type,
        };
        for (const key in pingpong_data) {
          if (
            pingpong_data[key] == "" ||
            typeof pingpong_data[key] === "undefined"
          ) {
            delete pingpong_data[key];
          }
        }
        Pingpong.findOneAndUpdate(
          { pingpong_id: temp_id },
          { $set: pingpong_data },
          { useFindAndModify: false }
        ).exec((err, item) => {
          if (err) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
        });
      });
    }

    if (types.indexOf("ebay") !== -1) {
      data.forEach((item, index) => {
        let value = item.split("|");
        let temp_id = value[0];
        var ebay_data = {
          ebay_id: temp_id,
          ebay_user: value[1],
          ebay_password: value[2],
          ebay_detail: value[3],
          ebay_limit: value[4],
          ebay_item: value[5],
          ebay_sold: value[6],
          ebay_feedback: value[7],
          ebay_plan: body.plan,
          ebay_block: body.block,
          list_view: body.view,
          ebay_processing: body.processing,
          ebay_sell_status: body.sell_status,
          ebay_error: body.error,
          ebay_class: body.class,
          ebay_employee: body.employee,
          ebay_owner: body.owner,
          ebay_status: body.status,
          ebay_type: body.type,
        };
        for (const key in ebay_data) {
          if (ebay_data[key] == "" || typeof ebay_data[key] === "undefined") {
            delete ebay_data[key];
          }
        }
        Ebay.findOneAndUpdate(
          { ebay_id: temp_id },
          { $set: ebay_data },
          { useFindAndModify: false }
        ).exec((err, item) => {
          if (err) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
        });
      });
    }

    if (types.indexOf("etsy") !== -1) {
      data.forEach((item, index) => {
        let value = item.split("|");
        let temp_id = value[0];
        var etsy_data = {
          etsy_id: temp_id,
          etsy_user: value[1],
          etsy_password: value[2],
          etsy_detail: value[3],
          etsy_limit: value[4],
          etsy_item: value[5],
          etsy_sold: value[6],
          etsy_feedback: value[7],
          etsy_plan: body.plan,
          etsy_block: body.block,
          list_view: body.view,
          etsy_processing: body.processing,
          etsy_sell_status: body.sell_status,
          etsy_error: body.error,
          etsy_class: body.class,
          etsy_employee: body.employee,
          etsy_owner: body.owner,
          etsy_status: body.status,
          etsy_type: body.type,
        };
        for (const key in etsy_data) {
          if (etsy_data[key] == "" || typeof etsy_data[key] === "undefined") {
            delete etsy_data[key];
          }
        }
        Etsy.findOneAndUpdate(
          { etsy_id: temp_id },
          { $set: etsy_data },
          { useFindAndModify: false }
        ).exec((err, item) => {
          if (err) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
        });
      });
    }

    if (types.indexOf("amazon") !== -1) {
      data.forEach((item, index) => {
        let value = item.split("|");
        let temp_id = value[0];
        var amazon_data = {
          amazon_id: temp_id,
          amazon_user: value[1],
          amazon_password: value[2],
          amazon_detail: value[3],
          amazon_limit: value[4],
          amazon_item: value[5],
          amazon_sold: value[6],
          amazon_feedback: value[7],
          amazon_plan: body.plan,
          amazon_block: body.block,
          list_view: body.view,
          amazon_processing: body.processing,
          amazon_sell_status: body.sell_status,
          amazon_error: body.error,
          amazon_class: body.class,
          amazon_employee: body.employee,
          amazon_owner: body.owner,
          amazon_status: body.status,
          amazon_type: body.type,
        };
        for (const key in amazon_data) {
          if (
            amazon_data[key] == "" ||
            typeof amazon_data[key] === "undefined"
          ) {
            delete amazon_data[key];
          }
        }
        Amazon.findOneAndUpdate(
          { amazon_id: temp_id },
          { $set: amazon_data },
          { useFindAndModify: false }
        ).exec((err, item) => {
          if (err) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
        });
      });
    }

    if (types.indexOf("shopee") !== -1) {
      data.forEach((item, index) => {
        let value = item.split("|");
        let temp_id = value[0];
        var shopee_data = {
          shopee_id: temp_id,
          shopee_user: value[1],
          shopee_password: value[2],
          shopee_detail: value[3],
          shopee_limit: value[4],
          shopee_item: value[5],
          shopee_sold: value[6],
          shopee_feedback: value[7],
          shopee_plan: body.plan,
          shopee_block: body.block,
          list_view: body.view,
          shopee_processing: body.processing,
          shopee_sell_status: body.sell_status,
          shopee_error: body.error,
          shopee_class: body.class,
          shopee_employee: body.employee,
          shopee_owner: body.owner,
          shopee_status: body.status,
          shopee_type: body.type,
        };
        for (const key in shopee_data) {
          if (
            shopee_data[key] == "" ||
            typeof shopee_data[key] === "undefined"
          ) {
            delete shopee_data[key];
          }
        }
        Shopee.findOneAndUpdate(
          { shopee_id: temp_id },
          { $set: shopee_data },
          { useFindAndModify: false }
        ).exec((err, item) => {
          if (err) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
        });
      });
    }

    if (types.indexOf("facebook") !== -1) {
      data.forEach((item, index) => {
        let value = item.split("|");
        let temp_id = value[0];
        var facebook_data = {
          facebook_id: temp_id,
          facebook_user: value[1],
          facebook_password: value[2],
          facebook_detail: value[3],
          facebook_limit: value[4],
          facebook_item: value[5],
          facebook_sold: value[6],
          facebook_feedback: value[7],
          facebook_plan: body.plan,
          facebook_block: body.block,
          list_view: body.view,
          facebook_processing: body.processing,
          facebook_sell_status: body.sell_status,
          facebook_error: body.error,
          facebook_class: body.class,
          facebook_employee: body.employee,
          facebook_owner: body.owner,
          facebook_status: body.status,
          facebook_type: body.type,
        };
        for (const key in facebook_data) {
          if (
            facebook_data[key] == "" ||
            typeof facebook_data[key] === "undefined"
          ) {
            delete facebook_data[key];
          }
        }
        Facebook.findOneAndUpdate(
          { facebook_id: temp_id },
          { $set: facebook_data },
          { useFindAndModify: false }
        ).exec((err, item) => {
          if (err) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
        });
      });
    }

    if (types.indexOf("tiktok") !== -1) {
      data.forEach((item, index) => {
        let value = item.split("|");
        let temp_id = value[0];
        var tiktok_data = {
          tiktok_id: temp_id,
          tiktok_user: value[1],
          tiktok_password: value[2],
          tiktok_detail: value[3],
          tiktok_limit: value[4],
          tiktok_item: value[5],
          tiktok_sold: value[6],
          tiktok_feedback: value[7],
          tiktok_plan: body.plan,
          tiktok_block: body.block,
          list_view: body.view,
          tiktok_processing: body.processing,
          tiktok_sell_status: body.sell_status,
          tiktok_error: body.error,
          tiktok_class: body.class,
          tiktok_employee: body.employee,
          tiktok_owner: body.owner,
          tiktok_status: body.status,
          tiktok_type: body.type,
        };
        for (const key in tiktok_data) {
          if (
            tiktok_data[key] == "" ||
            typeof tiktok_data[key] === "undefined"
          ) {
            delete tiktok_data[key];
          }
        }
        Tiktok.findOneAndUpdate(
          { tiktok_id: temp_id },
          { $set: tiktok_data },
          { useFindAndModify: false }
        ).exec((err, item) => {
          if (err) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
        });
      });
    }

    if (types.indexOf("customer") !== -1) {
      data.forEach((item, index) => {
        let value = item.split("|");
        let temp_id = value[0];
        var customer_data = {
          customer_id: temp_id,
          customer_user: value[1],
          customer_password: value[2],
          customer_phone2: value[3],
          customer_facebook: value[4],
          customer_website: value[5],
          customer_address: value[6],
          customer_payment: value[7],
          customer_processing: body.processing,

          customer_error: body.error,
          customer_class: body.class,
          customer_employee: body.employee,
          customer_owner: body.owner,
          customer_status: body.status,
          customer_type: body.type,
        };
        for (const key in customer_data) {
          if (
            customer_data[key] == "" ||
            typeof customer_data[key] === "undefined"
          ) {
            delete customer_data[key];
          }
        }
        Customer.findOneAndUpdate(
          { customer_id: temp_id },
          { $set: customer_data },
          { useFindAndModify: false }
        ).exec((err, item) => {
          if (err) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
        });
      });
    }
  }

  if (types.indexOf("link") !== -1) {
    data.forEach((item, index) => {
      let value = item.split("|");
      let field_id = {};
      let temp_id = value[0];

      if (types.indexOf("device") !== -1) {
        Device.findOne({ device_id: temp_id }).exec((err, device) => {
          if (err || !device) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
          field_id.device_id = device._id;
        });
      }

      if (types.indexOf("proxy") !== -1) {
        Proxy.findOne({ proxy_id: temp_id }).exec((err, proxy) => {
          if (err || !proxy) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
          field_id.proxy_id = proxy._id;
        });
      }

      if (types.indexOf("info") !== -1) {
        Info.findOne({ info_id: temp_id }).exec((err, info) => {
          if (err || !info) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
          field_id.info_id = info._id;
        });
      }

      if (types.indexOf("mail") !== -1) {
        Mail.findOne({ mail_id: temp_id }).exec((err, mail) => {
          field_id.mail_id = mail._id;
          if (err || !mail) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
        });
      }

      if (types.indexOf("sim") !== -1) {
        Sim.findOne({ sim_id: temp_id }).exec((err, sim) => {
          if (err || !sim) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
          field_id.sim_id = sim._id;
        });
      }

      if (types.indexOf("bank") !== -1) {
        Bank.findOne({ bank_id: temp_id }).exec((err, bank) => {
          if (err || !bank) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
          field_id.bank_id = bank._id;
        });
      }

      if (types.indexOf("payoneer") !== -1) {
        Payoneer.findOne({ payoneer_id: temp_id }).exec((err, payoneer) => {
          if (err || !payoneer) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
          field_id.payoneer_id = payoneer._id;
        });
      }

      if (types.indexOf("paypal") !== -1) {
        Paypal.findOne({ paypal_id: temp_id }).exec((err, paypal) => {
          if (err || !paypal) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
          field_id.paypal_id = paypal._id;
        });
      }

      if (types.indexOf("pingpong") !== -1) {
        Pingpong.findOne({ pingpong_id: temp_id }).exec((err, pingpong) => {
          if (err || !pingpong) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
          field_id.pingpong_id = pingpong._id;
        });
      }

      if (types.indexOf("ebay") !== -1) {
        Ebay.findOne({ ebay_id: temp_id }).exec((err, ebay) => {
          if (err || !ebay) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
          field_id.ebay_id = ebay._id;
        });
      }

      if (types.indexOf("etsy") !== -1) {
        Etsy.findOne({ etsy_id: temp_id }).exec((err, etsy) => {
          if (err || !etsy) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
          field_id.etsy_id = etsy._id;
        });
      }

      if (types.indexOf("amazon") !== -1) {
        Amazon.findOne({ amazon_id: temp_id }).exec((err, amazon) => {
          if (err || !amazon) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
          field_id.amazon_id = amazon._id;
        });
      }

      if (types.indexOf("shopee") !== -1) {
        Shopee.findOne({ shopee_id: temp_id }).exec((err, shopee) => {
          if (err || !shopee) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
          field_id.shopee_id = shopee._id;
        });
      }

      if (types.indexOf("facebook") !== -1) {
        Facebook.findOne({ facebook_id: temp_id }).exec((err, facebook) => {
          if (err || !facebook) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
          field_id.facebook_id = facebook._id;
        });
      }

      if (types.indexOf("tiktok") !== -1) {
        Tiktok.findOne({ tiktok_id: temp_id }).exec((err, tiktok) => {
          if (err || !tiktok) {
            return res.status(400).json({ error: "Đã Lỗi" });
          }
          field_id.tiktok_id = tiktok._id;
        });
      }

      // Update
      setTimeout(() => {
        if (types.indexOf("device") !== -1) {
          let device_item = JSON.parse(JSON.stringify(field_id));
          device_item.device_id = temp_id;
          Device.findOneAndUpdate(
            { device_id: temp_id },
            { $set: device_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }

        if (types.indexOf("proxy") !== -1) {
          let proxy_item = JSON.parse(JSON.stringify(field_id));
          proxy_item.proxy_id = temp_id;
          Proxy.findOneAndUpdate(
            { proxy_id: temp_id },
            { $set: proxy_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }

        if (types.indexOf("info") !== -1) {
          let info_item = JSON.parse(JSON.stringify(field_id));
          info_item.info_id = temp_id;
          Info.findOneAndUpdate(
            { info_id: temp_id },
            { $set: info_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }

        if (types.indexOf("mail") !== -1) {
          let mail_item = JSON.parse(JSON.stringify(field_id));
          mail_item.mail_id = temp_id;
          Mail.findOneAndUpdate(
            { mail_id: temp_id },
            { $set: mail_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }

        if (types.indexOf("sim") !== -1) {
          let sim_item = JSON.parse(JSON.stringify(field_id));
          sim_item.sim_id = temp_id;
          Sim.findOneAndUpdate(
            { sim_id: temp_id },
            { $set: sim_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }

        if (types.indexOf("bank") !== -1) {
          let bank_item = JSON.parse(JSON.stringify(field_id));
          bank_item.bank_id = temp_id;
          Bank.findOneAndUpdate(
            { bank_id: temp_id },
            { $set: bank_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }

        if (types.indexOf("payoneer") !== -1) {
          let payoneer_item = JSON.parse(JSON.stringify(field_id));
          payoneer_item.payoneer_id = temp_id;
          Payoneer.findOneAndUpdate(
            { payoneer_id: temp_id },
            { $set: payoneer_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }

        if (types.indexOf("paypal") !== -1) {
          let paypal_item = JSON.parse(JSON.stringify(field_id));
          paypal_item.paypal_id = temp_id;
          Paypal.findOneAndUpdate(
            { paypal_id: temp_id },
            { $set: paypal_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }

        if (types.indexOf("pingpong") !== -1) {
          let pingpong_item = JSON.parse(JSON.stringify(field_id));
          pingpong_item.pingpong_id = temp_id;
          Pingpong.findOneAndUpdate(
            { pingpong_id: temp_id },
            { $set: pingpong_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }

        if (types.indexOf("ebay") !== -1) {
          let ebay_item = JSON.parse(JSON.stringify(field_id));
          ebay_item.ebay_id = temp_id;
          Ebay.findOneAndUpdate(
            { ebay_id: temp_id },
            { $set: ebay_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }

        if (types.indexOf("etsy") !== -1) {
          let etsy_item = JSON.parse(JSON.stringify(field_id));
          etsy_item.etsy_id = temp_id;
          Etsy.findOneAndUpdate(
            { etsy_id: temp_id },
            { $set: etsy_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }
        if (types.indexOf("amazon") !== -1) {
          let amazon_item = JSON.parse(JSON.stringify(field_id));
          amazon_item.amazon_id = temp_id;
          Amazon.findOneAndUpdate(
            { amazon_id: temp_id },
            { $set: amazon_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }

        if (types.indexOf("shopee") !== -1) {
          let shopee_item = JSON.parse(JSON.stringify(field_id));
          shopee_item.shopee_id = temp_id;
          Shopee.findOneAndUpdate(
            { shopee_id: temp_id },
            { $set: shopee_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }
        if (types.indexOf("facebook") !== -1) {
          let facebook_item = JSON.parse(JSON.stringify(field_id));
          facebook_item.facebook_id = temp_id;
          Facebook.findOneAndUpdate(
            { facebook_id: temp_id },
            { $set: facebook_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }

        if (types.indexOf("tiktok") !== -1) {
          let tiktok_item = JSON.parse(JSON.stringify(field_id));
          tiktok_item.tiktok_id = temp_id;
          Tiktok.findOneAndUpdate(
            { tiktok_id: temp_id },
            { $set: tiktok_item },
            { useFindAndModify: false }
          ).exec((err, item) => {
            if (err) {
              return res.status(400).json({ error: "Đã Lỗi" });
            }
          });
        }
      }, 7000);
    });
  }
};
