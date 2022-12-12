import mongoose from "mongoose";

const shopeeSchema = mongoose.Schema(
  {
    shopee_id: { type: String, required: true },
    shopee_user: { type: String },
    shopee_password: { type: String },
    shopee_detail: { type: String },
    shopee_processing: { type: String },
    shopee_type: { type: String },
    shopee_sell_status: { type: String },
    shopee_owner: { type: String },
    shopee_employee: { type: String, default: "Nguyễn Hoài" },
    shopee_outline: { type: String },
    shopee_status: { type: String },
    shopee_class: { type: String },
    shopee_date_start: { type: String },
    shopee_date_verify: { type: String },
    shopee_note: { type: String },
    info_id: { type: String },
    mail_id: { type: String },
    sim_id: { type: String },
    card_id: { type: String },
    bank_id: { type: String },
    ebay_id: { type: String },
    amazon_id: { type: String },
    device_id: { type: String },
    list_view: { type: String },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Shopee", shopeeSchema);
