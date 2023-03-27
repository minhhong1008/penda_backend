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
            $in: ["Lớp 11", "Lớp 12"],
          },
        },
      },
      { $sample: { size: 1 } },
    ]).exec((err, ebay) => {
      if (err || !ebay) {
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
       
        if (device.device_user ==" " || device.device_password ==" ") {
          
          return res.status(400).json({
            error: "Đã Lỗi rồi",
          });
          
        }else{
          res.json(device);
        }
        // Reverse sắp xếp các ebay theo thứ tự tạo mới nhất
        
      });
    });
  };