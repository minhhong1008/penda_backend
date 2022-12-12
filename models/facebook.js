import mongoose from "mongoose";

const facebookSchema = mongoose.Schema(
  {
    facebook_id: { type: String, required: true },
    facebook_user: { type: String },
    facebook_password: { type: String },
    facebook_detail: { type: String },
    facebook_processing: { type: String },
    facebook_type: { type: String },
    facebook_sell_status: { type: String },
    facebook_owner: { type: String },
    facebook_employee: { type: String, default: "Nguyễn Hoài" },
    facebook_outline: { type: String },
    facebook_status: { type: String },
    facebook_class: { type: String },
    facebook_date_start: { type: String },
    facebook_date_verify: { type: String },
    facebook_note: { type: String },
    info_id: { type: String },
    mail_id: { type: String },
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

module.exports = mongoose.model("Facebook", facebookSchema);
