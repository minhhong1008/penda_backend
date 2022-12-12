import mongoose from "mongoose";

const bankSchema = mongoose.Schema(
  {
    bank_id: { type: String, required: true },
    bank_user: { type: String },
    bank_password: { type: String },
    bank_detail: { type: String },
    bank_processing: { type: String },
    bank_type: { type: String },
    bank_sell_status: { type: String },
    bank_owner: { type: String },
    bank_employee: { type: String, default: "Nguyễn Hoài" },
    bank_outline: { type: String },
    bank_status: { type: String },
    bank_class: { type: String },
    bank_date_start: { type: String },
    bank_date_verify: { type: String },
    bank_note: { type: String },
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

module.exports = mongoose.model("Bank", bankSchema);
