import mongoose from "mongoose";

const payoneerSchema = mongoose.Schema(
  {
    payoneer_id: { type: String, required: true },
    payoneer_user: { type: String },
    payoneer_password: { type: String },
    payoneer_detail: { type: String },
    payoneer_plan: { type: String },
    payoneer_processing: { type: String },
    payoneer_type: { type: String },
    payoneer_sell_status: { type: String },
    payoneer_owner: { type: String },
    payoneer_employee: { type: String, default: "Nguyễn Hoài" },
    payoneer_outline: { type: String },
    payoneer_status: { type: String },
    payoneer_class: { type: String },
    payoneer_date_start: { type: String },
    payoneer_date_verify: { type: String },
    payoneer_note: { type: String },
    info_id: { type: String },
    mail_id: { type: String },
    sim_id: { type: String },
    card_id: { type: String },
    bank_id: { type: String },
    payoneer_id: { type: String },
    amazon_id: { type: String },
    shopee_id: { type: String },
    device_id: { type: String },
    list_view: { type: String },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Payoneer", payoneerSchema);
