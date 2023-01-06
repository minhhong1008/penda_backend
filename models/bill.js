import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const billSchema = mongoose.Schema(
  {
    bill_date: { type: String },
    bill_type: { type: String },
    bill_action: { type: String },
    bill_owner: { type: String },
    bill_employee: { type: String },
    bill_supplier: { type: String },
    bill_contact_phone: { type: String },
    bill_contact_social1: { type: String },
    bill_contact_social2: { type: String },
    bill_payment: { type: String },
    bill_debt: { type: String },
    bill_expiry_date: { type: String },
    bill_note: { type: String },
    // 
    bill_work: { type: String },
    bill_content: { type: String },
    bill_number: { type: String },
    bill_price: { type: String },
    bill_total: { type: String },
    //upload ảnh
    bill_image_url: { type: String },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Bill", billSchema);
