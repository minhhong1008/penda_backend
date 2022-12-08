import mongoose from "mongoose";
const infoSchema = mongoose.Schema(
  {
    info_id: { type: String, required: true },
    info_sex: { type: String },
    infodate_birthday: { type: String },
    info_fullname: { type: String },
    info_passport: { type: String },
    info_ssn: { type: String },
    info_origin: { type: String },
    info_residence: { type: String },
    info_identifying: { type: String },
    infodate_expiry: { type: String },
    infodate_start: { type: String },
    infodate_import: { type: String },
    info_type: { type: String },
    info_owner: { type: String },
    info_employee: { type: String },
    info_status: { type: String },
    info_class: { type: String },
    info_note: { type: String },
  },
  { timeStamps: true }
);
module.exports = mongoose.model("info", infoSchema);
