import mongoose from "mongoose";

const amazonSchema = mongoose.Schema(
  {
    amazon_id: { type: String, required: true },
    amazon_user: { type: String },
    amazon_password: { type: String },
    amazon_detail: { type: String },
    amazon_plan: { type: String },
    amazon_processing: { type: String },
    amazon_type: { type: String },
    amazon_sell_status: { type: String },
    amazon_owner: { type: String },
    amazon_employee: { type: String, default: "Nguyễn Hoài" },
    amazon_outline: { type: String },
    amazon_status: { type: String },
    amazon_class: { type: String },
    amazon_date_start: { type: String },
    amazon_date_verify: { type: String },
    amazon_note: { type: String },
    info_id: { type: String },
    mail_id: { type: String },
    sim_id: { type: String },
    card_id: { type: String },
    bank_id: { type: String },
    shopee_id: { type: String },
    device_id: { type: String },
    list_view: { type: String },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Amazon", amazonSchema);
