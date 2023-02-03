import mongoose from "mongoose";

const ebayitemSchema = mongoose.Schema(
  {
    ebayitem_sku: { type: String, required: true },
    ebayitem_title: { type: String },
    ebayitem_price: { type: String },
    ebayitem_brand: { type: String },
    ebayitem_color: { type: String },
    ebayitem_compatible_devices: { type: String },
    ebayitem_form_factor: { type: String },
    ebayitem_shell_type: { type: String },
    ebayitem_description: { type: String },
    ebayitem_list_img: { type: String },

  },
  { timeStamps: true }
);

module.exports = mongoose.model("Ebayitem", ebayitemSchema);
