import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const projectSchema = mongoose.Schema(
  {
    project_id: { type: String, required: true },
    project_sex: { type: String },
    projectdate_birthday: { type: String },
    project_fullname: { type: String },
    project_passport: { type: String },
    project_ssn: { type: String },
    project_origin: { type: String },
    project_code: { type: String },
    project_residence: { type: String },
    project_identifying: { type: String },
    project_password:{ type: String },
    projectdate_expiry: { type: String },
    projectdate_start: { type: String },
    projectdate_import: { type: String },
    project_type: { type: String },
    project_owner: { type: String },
    project_employee: { type: String },
    project_status: { type: String },
    project_class: { type: String },
    project_note: { type: String },


    project_plan: { type: String },
    project_block: { type: String },
    project_error: { type: String },
    project_processing: { type: String },
    project_type: { type: String },
    project_sell_status: { type: String },
    project_owner: { type: String },
    project_employee: { type: String },
    project_outline: { type: String },
    project_status: { type: String },
    project_class: { type: String },
    project_support: { type: String },
   
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

    project_image_url: { type: String },
    project_history: { type: String },
    // List date
    projectdate_delivery: { type: String },
    projectdate_nextclass: { type: String },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("project", projectSchema);
