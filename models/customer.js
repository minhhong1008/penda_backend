import mongoose from "mongoose";
import Sim from "../models/sim";
const { ObjectId } = mongoose.Schema;

const customerSchema = mongoose.Schema(
  {
    customer_id: { type: String, required: true },
    customer_user: { type: String },
    customer_password: { type: String },
    customer_phone1: { type: String },
    customer_phone2: { type: String },
    customer_facebook: { type: String },
    customer_website: { type: String },
    customer_address: { type: String },
    customer_payment: { type: String },
    customer_detail: { type: String },
    customer_error: { type: String },
    customer_processing: { type: String },
    customer_type: { type: String },
    customer_owner: { type: String },
    customer_employee: { type: String },
    customer_status: { type: String },
    customer_class: { type: String },
    customer_support: { type: String },
    customer_note: { type: String },
    

    customer_image_url: { type: String },
    customer_history: { type: String },
    
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
