import mongoose from "mongoose";

const simSchema = mongoose.Schema(
  {
    sim_id: { type: String, required: true },
    sim_user: { type: String },
    sim_password: { type: String },
    sim_detail: { type: String },
    sim_processing: { type: String },
    sim_type: { type: String },
    sim_sell_status: { type: String },
    sim_owner: { type: String },
    sim_employee: { type: String, default: "Nguyễn Hoài" },
    sim_outline: { type: String },
    sim_status: { type: String },
    sim_class: { type: String },
    sim_date_start: { type: String },
    sim_date_verify: { type: String },
    sim_note: { type: String },
    info_id: { type: String },
    mail_id: { type: String },
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

module.exports = mongoose.model("Sim", simSchema);
