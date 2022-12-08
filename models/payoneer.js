import mongoose from "mongoose";

const payoneerSchema = mongoose.Schema(
  {
    payoneer_id: { type: String, required: true },
    payoneer_user: { type: String },
    payoneer_password: { type: String },
    payoneer_type: { type: String },
    payoneer_owner: { type: String },
    payoneer_employee: { type: String, default: "Nguyễn Hoài" },
    payoneer_status: { type: String },
    payoneer_class: { type: String },
    payoneerdate_creat: { type: String },
    payoneerdate_verify: { type: String },
    payoneer_note: { type: String },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("payoneer", payoneerSchema);
