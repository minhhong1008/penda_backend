import mongoose from "mongoose";
import Sim from "../models/sim";
const { ObjectId } = mongoose.Schema;

const amazonSchema = mongoose.Schema(
  {
    amazon_id: { type: String, required: true },
    amazon_user: { type: String },
    amazon_password: { type: String },
    amazon_detail: { type: String },
    amazon_limit: { type: String },
    amazon_item: { type: String },
    amazon_sold: { type: String },
    amazon_feedback: { type: String },
    amazon_plan: { type: String },
    amazon_block: { type: String },
    amazon_error: { type: String },
    amazon_processing: { type: String },
    amazon_type: { type: String },
    amazon_sell_status: { type: String },
    amazon_owner: { type: String },
    amazon_employee: { type: String },
    amazon_outline: { type: String },
    amazon_status: { type: String },
    amazon_class: { type: String },
    amazon_support: { type: String },
    amazon_note: { type: String },
    //Liên kết field
    list_view: { type: String },
    device_id: { type: String, ref: "Device" },
    proxy_id:{ type: String, ref: "Proxy"},
    info_id: { type: String , ref: "Info"},

    mail_id: { type: ObjectId, ref: "Mail"},
    sim_id: { type: ObjectId, ref: "Sim" },
    bank_id: { type: ObjectId, ref: "Bank" },
    payoneer_id: { type: ObjectId, ref: "Payoneer"},
    paypal_id: { type: ObjectId, ref: "Paypal" },
    pingpong_id: {type: ObjectId, ref: "Pingpong" },
    ebay_id: {type: ObjectId, ref: "Ebay" },
    etsy_id: { type: ObjectId, ref: "Etsy"},
    //amazon_id: { type: ObjectId, ref: "Amazon"},
    shopee_id: { type: ObjectId, ref: "Shopee"},
    facebook_id: { type: ObjectId, ref: "Facebook"},
    tiktok_id: { type: ObjectId, ref: "Tiktok"},


    amazon_image_url: { type: String },
    amazon_history: { type: String },
    // List date
    amazondate_delivery: { type: String },
    amazondate_start: { type: String },
    amazondate_nextclass: { type: String },
    amazondate_verify: { type: String },
    amazondate_seller: { type: String },
    amazondate_verifybank: { type: String },
    amazondate_draft: { type: String },
    amazondate_list1: { type: String },
    amazondate_list2: { type: String },
    amazondate_list3: { type: String },
    amazondate_list4: { type: String },
    amazondate_list5: { type: String },
    amazondate_calendarseller: { type: String },
    amazondate_calendarlist1: { type: String },
    amazondate_calendarlist2: { type: String },
    amazondate_calendarlist3: { type: String },
    amazondate_calendarlist4: { type: String },
    amazondate_calendarlist5: { type: String },
    amazondate_moveroom: { type: String },
    amazondate_error: { type: String },
    amazondate_restrict: { type: String },
    amazondate_suspended: { type: String },
    amazondate_contact1: { type: String },
    amazondate_contact2: { type: String },
    amazondate_contact3: { type: String },
    amazondate_contact4: { type: String },
    amazondate_contact5: { type: String },
    amazondate_checksus1: { type: String },
    amazondate_checksus2: { type: String },
    amazondate_checksus3: { type: String },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Amazon", amazonSchema);
