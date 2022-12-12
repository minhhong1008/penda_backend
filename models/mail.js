import mongoose from "mongoose";

const mailSchema = mongoose.Schema(
  {
    mail_id: { type: String, required: true },
    mail_user: { type: String },
    mail_password: { type: String },
    mail_detail: { type: String },
    mail_processing: { type: String },
    mail_type: { type: String },
    mail_sell_status: { type: String },
    mail_owner: { type: String },
    mail_employee: { type: String, default: "Nguyễn Hoài" },
    mail_outline: { type: String },
    mail_status: { type: String },
    mail_class: { type: String },
    mail_date_start: { type: String },
    mail_date_verify: { type: String },
    mail_note: { type: String },
    info_id: { type: String },
    etsy_id: { type: String },
    sim_id: { type: String },
    card_id: { type: String },
    bank_id: { type: String },
    ebay_id: { type: String },
    amazon_id: { type: String },
    shopee_id: { type: String },
    device_id: { type: String },
    list_view: { type: String },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Mail", mailSchema);