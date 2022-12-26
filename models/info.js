import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const infoSchema = mongoose.Schema(
  {
    info_id: { type: String, required: true },
    info_sex: { type: String },
    infodate_birthday: { type: String },
    info_fullname: { type: String },
    info_passport: { type: String },
    info_ssn: { type: String },
    info_origin: { type: String },
    info_code: { type: String },
    info_residence: { type: String },
    info_identifying: { type: String },
    info_password:{ type: String },
    infodate_expiry: { type: String },
    infodate_start: { type: String },
    infodate_import: { type: String },
    info_type: { type: String },
    info_owner: { type: String },
    info_employee: { type: String },
    info_status: { type: String },
    info_class: { type: String },
    info_note: { type: String },

    info_plan: { type: String },
    info_block: { type: String },
    info_error: { type: String },
    info_processing: { type: String },
    info_type: { type: String },
    info_sell_status: { type: String },
    info_owner: { type: String },
    info_employee: { type: String },
    info_outline: { type: String },
    info_status: { type: String },
    info_class: { type: String },
    info_support: { type: String },

    //Liên kết field
    list_view: { type: String },

    device_id: { type: String, ref: "Device" },
    proxy_id:{ type: String, ref: "Proxy"},
    mail_id: { type: ObjectId, ref: "Mail"},
    sim_id: { type: ObjectId, ref: "Sim" },
    bank_id: { type: ObjectId, ref: "Bank" },
    payoneer_id: { type: ObjectId, ref: "Payoneer"},
    paypal_id: { type: ObjectId, ref: "Paypal" },
    pingpong_id: {type: ObjectId, ref: "Pingpong" },
    ebay_id: {type: ObjectId, ref: "Ebay" },
    etsy_id: { type: ObjectId, ref: "Etsy"},
    amazon_id: { type: ObjectId, ref: "Amazon"},
    shopee_id: { type: ObjectId, ref: "Shopee"},
    facebook_id: { type: ObjectId, ref: "Facebook"},
    tiktok_id: { type: ObjectId, ref: "Tiktok"},


    info_image_url: { type: String },
    info_history: { type: String },

    infodate_delivery: { type: String },
    infodate_nextclass: { type: String },
  },
  { timeStamps: true }
);
module.exports = mongoose.model("Info", infoSchema);
