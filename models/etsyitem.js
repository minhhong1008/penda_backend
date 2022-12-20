import mongoose from "mongoose";

const etsyitemSchema = mongoose.Schema(
  {
    etsyitem_id: { type: String, required: true },
    etsyitem_user: { type: String },
    etsyitem_password: { type: String },
    etsyitem_detail: { type: String },
    etsyitem_limit: { type: String },
    etsyitem_item: { type: String },
    etsyitem_sold: { type: String },
    etsyitem_feedback: { type: String },

    etsyitem_plan: { type: String },
    etsyitem_processing: { type: String },
    etsyitem_type: { type: String },
    etsyitem_sell_status: { type: String },
    etsyitem_owner: { type: String },
    etsyitem_employee: { type: String, default: "Nguyễn Hoài" },
    etsyitem_outline: { type: String },
    etsyitem_status: { type: String },
    etsyitem_class: { type: String },

    etsyitem_date_start: { type: String },
    etsyitem_date_verify: { type: String },
    etsyitem_note: { type: String },
    
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

module.exports = mongoose.model("Etsyitem", etsyitemSchema);