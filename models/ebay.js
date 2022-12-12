import mongoose from "mongoose";

const ebaySchema = mongoose.Schema(
  {
    ebay_id: { type: String, required: true },
    ebay_user: { type: String },
    ebay_password: { type: String },
    ebay_detail: { type: String },
    ebay_plan: { type: String },
    ebay_processing: { type: String },
    ebay_type: { type: String },
    ebay_sell_status: { type: String },
    ebay_owner: { type: String },
    ebay_employee: { type: String, default: "Nguyễn Hoài" },
    ebay_outline: { type: String },
    ebay_status: { type: String },
    ebay_class: { type: String },
    ebay_date_start: { type: String },
    ebay_date_verify: { type: String },
    ebay_note: { type: String },
    info_id: { type: String },
    mail_id: { type: String },
    sim_id: { type: String },
    card_id: { type: String },
    bank_id: { type: String },
    amazon_id: { type: String },
    shopee_id: { type: String },
    device_id: { type: String },
    list_view: { type: String },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Ebay", ebaySchema);
