import mongoose from "mongoose";

const deviceSchema = mongoose.Schema(
  {
    device_id: { type: String, required: true },
    device_user: { type: String },
    device_password: { type: String },
    device_detail: { type: String },
    device_processing: { type: String },
    device_type: { type: String },
    device_sell_status: { type: String },
    device_owner: { type: String },
    device_employee: { type: String, default: "Nguyễn Hoài" },
    device_outline: { type: String },
    device_status: { type: String },
    device_class: { type: String },
    device_date_start: { type: String },
    device_date_verify: { type: String },
    device_note: { type: String },
    info_id: { type: String },
    mail_id: { type: String },
    sim_id: { type: String },
    card_id: { type: String },
    bank_id: { type: String },
    ebay_id: { type: String },
    amazon_id: { type: String },
    shopee_id: { type: String },
    etsy_id: { type: String },
    facebook_id: { type: String },
    list_view: { type: String },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Device", deviceSchema);
