import mongoose from "mongoose";

const etsySchema = mongoose.Schema(
  {
    etsy_id: { type: String, required: true },
    etsy_user: { type: String },
    etsy_password: { type: String },
    etsy_detail: { type: String },
    etsy_processing: { type: String },
    etsy_type: { type: String },
    etsy_sell_status: { type: String },
    etsy_owner: { type: String },
    etsy_employee: { type: String, default: "Nguyễn Hoài" },
    etsy_outline: { type: String },
    etsy_status: { type: String },
    etsy_class: { type: String },
    etsy_date_start: { type: String },
    etsy_date_verify: { type: String },
    etsy_note: { type: String },
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

module.exports = mongoose.model("Etsy", etsySchema);
