import mongoose from "mongoose";

const etsyorderSchema = mongoose.Schema(
  {
    etsyorder_id: { type: String, required: true },
    etsyorder_user: { type: String },
    etsyorder_password: { type: String },
    etsyorder_detail: { type: String },
    etsyorder_limit: { type: String },
    etsyorder_item: { type: String },
    etsyorder_sold: { type: String },
    etsyorder_feedback: { type: String },

    etsyorder_plan: { type: String },
    etsyorder_processing: { type: String },
    etsyorder_type: { type: String },
    etsyorder_sell_status: { type: String },
    etsyorder_owner: { type: String },
    etsyorder_employee: { type: String, default: "Nguyễn Hoài" },
    etsyorder_outline: { type: String },
    etsyorder_status: { type: String },
    etsyorder_class: { type: String },

    etsyorder_date_start: { type: String },
    etsyorder_date_verify: { type: String },
    etsyorder_note: { type: String },
    
    device_id: { type: String },
    info_id: { type: String },
    mail_id: { type: String },
    sim_id: { type: String },
    bank_id: { type: String },
    payoneer_id: { type: String },
    paypal_id: { type: String },
    pingpong_id: { type: String },
    
    list_view: { type: String },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Etsyorder", etsyorderSchema);
