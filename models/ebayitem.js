import mongoose from "mongoose";

const ebayitemSchema = mongoose.Schema(
  {
    ebayitem_id: { type: String, required: true },
    ebayitem_user: { type: String },
    ebayitem_password: { type: String },
    ebayitem_detail: { type: String },
    ebayitem_limit: { type: String,},
    ebayitem_item: { type: String },
    ebayitem_sold: { type: String },
    ebayitem_feedback: { type: String },

    ebayitem_plan: { type: String,default: "chrome"},
    ebayitem_processing: { type: String },
    ebayitem_type: { type: String },
    ebayitem_sell_status: { type: String },
    ebayitem_owner: { type: String },
    ebayitem_employee: { type: String, default: "Nguyễn Hoài" },
    ebayitem_outline: { type: String },
    ebayitem_status: { type: String },
    ebayitem_class: { type: String },

    ebayitem_date_start: { type: String },
    ebayitem_date_verify: { type: String },
    ebayitem_note: { type: String },
    
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

module.exports = mongoose.model("Ebayitem", ebayitemSchema);
