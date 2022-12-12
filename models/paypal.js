import mongoose from "mongoose";

const paypalSchema = mongoose.Schema(
  {
    paypal_id: { type: String, required: true },
    paypal_user: { type: String },
    paypal_password: { type: String },
    paypal_detail: { type: String },
    paypal_processing: { type: String },
    paypal_type: { type: String },
    paypal_sell_status: { type: String },
    paypal_owner: { type: String },
    paypal_employee: { type: String, default: "Nguyễn Hoài" },
    paypal_outline: { type: String },
    paypal_status: { type: String },
    paypal_class: { type: String },
    paypal_date_start: { type: String },
    paypal_date_verify: { type: String },
    paypal_note: { type: String },
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

module.exports = mongoose.model("Paypal", paypalSchema);