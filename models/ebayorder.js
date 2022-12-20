import mongoose from "mongoose";

const ebayorderSchema = mongoose.Schema(
  {
    ebayorder_id: { type: String, required: true },
    ebayorder_user: { type: String },
    ebayorder_password: { type: String },
    ebayorder_detail: { type: String },
    ebayorder_limit: { type: String,},
    ebayorder_item: { type: String },
    ebayorder_sold: { type: String },
    ebayorder_feedback: { type: String },

    ebayorder_plan: { type: String,default: "chrome"},
    ebayorder_processing: { type: String },
    ebayorder_type: { type: String },
    ebayorder_sell_status: { type: String },
    ebayorder_owner: { type: String },
    ebayorder_employee: { type: String, default: "Nguyễn Hoài" },
    ebayorder_outline: { type: String },
    ebayorder_status: { type: String },
    ebayorder_class: { type: String },

    ebayorder_date_start: { type: String },
    ebayorder_date_verify: { type: String },
    ebayorder_note: { type: String },
    
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

module.exports = mongoose.model("Ebayorder", ebayorderSchema);
