import mongoose from "mongoose";
import Sim from "../models/sim";
const { ObjectId } = mongoose.Schema;

const personSchema = mongoose.Schema(
  {
    person_id: { type: String, required: true },
    person_sex: { type: String },
    persondate_birthday: { type: String },
    person_fullname: { type: String },
    person_passport: { type: String },
    person_ssn: { type: String },
    person_origin: { type: String },
    person_code: { type: String },
    person_residence: { type: String },
    person_identifying: { type: String },
    person_password:{ type: String },
    persondate_expiry: { type: String },
    persondate_start: { type: String },
    persondate_import: { type: String },
    person_type: { type: String },
    person_owner: { type: String },
    person_employee: { type: String },
    person_status: { type: String },
    person_class: { type: String },
    person_note: { type: String },


    person_plan: { type: String },
    person_block: { type: String },
    person_error: { type: String },
    person_processing: { type: String },
    person_type: { type: String },
    person_sell_status: { type: String },
    person_owner: { type: String },
    person_employee: { type: String },
    person_outline: { type: String },
    person_status: { type: String },
    person_class: { type: String },
    person_support: { type: String },
   
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

    person_image_url: { type: String },
    person_history: { type: String },
    // List date
    persondate_delivery: { type: String },
    persondate_nextclass: { type: String },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Person", personSchema);
