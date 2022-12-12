import mongoose from "mongoose";

const tiktokSchema = mongoose.Schema(
  {
    tiktok_id: { type: String, required: true },
    tiktok_user: { type: String },
    tiktok_password: { type: String },
    tiktok_detail: { type: String },
    tiktok_processing: { type: String },
    tiktok_type: { type: String },
    tiktok_sell_status: { type: String },
    tiktok_owner: { type: String },
    tiktok_employee: { type: String, default: "Nguyễn Hoài" },
    tiktok_outline: { type: String },
    tiktok_status: { type: String },
    tiktok_class: { type: String },
    tiktok_date_start: { type: String },
    tiktok_date_verify: { type: String },
    tiktok_note: { type: String },
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

module.exports = mongoose.model("Tiktok", tiktokSchema);
