// Import model
import Ebay from "../models/ebay";
import Device from "../models/device";
import jwt from "jsonwebtoken"; // Tạo ra mã JWT
import Users from "../models/user";
import moment from "moment";

//
export const Gologincare = (req, res) => {
 
  Ebay.aggregate([
    { $project: { ebay_class: 1, ebay_user: 1, ebay_id: 1 } },
    {
      $match: {
        ebay_class: {
          $in:  ["Lớp 11","Lớp 12"],
        },
      },
    },
    { $sample: { size: 1 } },
  ]).exec((err, ebay) => {
    if (err || !ebay || ebay.length == 0) {
      return res.status(400).json({
        error: "Đã Lỗi",
      });
    }
    if(!ebay[0].ebay_id){
      return res.status(400).json({
        error: "Đã Lỗi ",
      });
    }
    let device_id = ebay[0].ebay_id;
    console.log(device_id);
    Device.findOne(
      { device_id: device_id },
      { device_class: 1, device_password: 1, device_user: 1 }
    ).exec((err, device) => {
      if (err || !device) {
        return res.status(400).json({
          error: "Đã Lỗi rồi",
        });
      }

      if (device.device_user == " " || device.device_password == " ") {
        return res.status(400).json({
          error: "Đã Lỗi rồi",
        });
      } else {
        res.json(device);
      }
      // Reverse sắp xếp các ebay theo thứ tự tạo mới nhất
    });
  });
};

export const GologinAllcare = (req, res) => {
  
  Ebay.aggregate([
    { $project: { ebay_class: 1, ebay_user: 1, ebay_id: 1 } },
    {
      $match: {
        ebay_class: {
          $in: ["Lớp 2", "Lớp 3","Lớp 4","Lớp 5","Lớp 6","Lớp 7","Lớp 8","Lớp 9","Lớp 10","Lớp 11","Lớp 12","Lớp 13","Lớp 14","Lớp 15"],
        },
      },
    },
    { $sample: { size: 1 } },
  ]).exec((err, ebay) => {
    if (err || !ebay || ebay.length == 0) {
      return res.status(400).json({
        error: "Đã Lỗi",
      });
    }
    if (!ebay[0].ebay_id) {
      return res.status(400).json({
        error: "Đã Lỗi",
      });
    }
    let device_id = ebay[0].ebay_id;

    Device.findOne(
      { device_id: device_id },
      { device_class: 1, device_password: 1, device_user: 1 }
    ).exec((err, device) => {
      if (err || !device) {
        return res.status(400).json({
          error: "Đã Lỗi rồi",
        });
      }

      if (device.device_user == " " || device.device_password == " ") {
        return res.status(400).json({
          error: "Đã Lỗi rồi",
        });
      } else {
        res.json(device);
      }
      // Reverse sắp xếp các ebay theo thứ tự tạo mới nhất
    });
  });
};

export const Gologinreg = (req, res) => {
  console.log(req.data);
  var users_name_filter = new RegExp("(.*)" + "Auto" + "(.*)");
  
  var filter_ebay = "";
  filter_ebay = {
    ebay_class: "Lớp 0",
    ebay_employee: users_name_filter,
    //ebay_status: "Live"
  };

  Ebay.findOne(filter_ebay).exec((err, ebay) => {
    if (err || !ebay) {
      res.status(400).json({
        message: "Không tìm thấy ebay",
      });
    }
    res.json(ebay);
    var dataEbay = ebay;
    dataEbay.ebay_class = "Lớp 1";
    for (const key in dataEbay) {
      if (dataEbay[key] == "") {
        delete dataEbay[key];
      }
    }

    Ebay.findOneAndUpdate(
      { ebay_id: ebay.ebay_id },
      { $set: dataEbay },
      { useFindAndModify: false },
      (err, ebay) => {
        if (err) {
          return res.status(400).json({
            error: "Bạn không được phép thực hiện hành động này",
          });
        }
        
      }
    );
  });

  /* Ebay.aggregate([
    { $project: { ebay_class: 1, ebay_user: 1, ebay_id: 1, ebay_employee: 1} },
    {
      $match: {
        ebay_class: "Lớp 0",
        ebay_employee: users_name_filter,
        //ebay_employee: users_name_filter
      },
    },
    { $sample: { size: 1 } },
  ]).exec((err, ebay) => {
    if (err || !ebay || ebay.length == 0) {
      return res.status(400).json({
        error: "Đã Lỗi",
      });
    }
   
    let device_id = ebay[0].ebay_id;
    Device.findOne(
      { device_id: device_id },
      { device_class: 1, device_password: 1, device_user: 1 }
    ).exec((err, device) => {
      if (err || !device) {
        return res.status(400).json({
          error: "Đã Lỗi rồi",
        });
      }

      if (device.device_user == " " || device.device_password == " ") {
        return res.status(400).json({
          error: "Đã Lỗi rồi",
        });
      } else {
        res.json(device);
      }
      // Reverse sắp xếp các ebay theo thứ tự tạo mới nhất
    });
  }); */
};



export const PostGologinreg = (req, res) => {
  console.log(req.body.ebay_class);
  res.json(req.body);
};