import mongoose from "mongoose";

const proxySchema = mongoose.Schema(
  {
    proxy_id: { type: String, required: true },
    proxy_user: { type: String },
    proxy_password: { type: String },
    proxy_detail: { type: String },
    proxy_limit: { type: String,},
    proxy_item: { type: String },
    proxy_sold: { type: String },
    proxy_feedback: { type: String },
    proxy_plan: { type: String,default: "chrome"},
    proxy_processing: { type: String },
    proxy_type: { type: String },
    proxy_sell_status: { type: String },
    proxy_owner: { type: String },
    proxy_employee: { type: String, default: "Nguyễn Hoài" },
    proxy_outline: { type: String },
    proxy_status: { type: String },
    proxy_class: { type: String },
    proxy_support:{ type: String },
    proxy_note: { type: String },
    device_id: { type: String },
    proxy_id:{ type: String },
    info_id: { type: String },
    mail_id: { type: String },
    sim_id: { type: String },
    bank_id: { type: String },
    payoneer_id: { type: String },
    paypal_id: { type: String },
    pingpong_id: { type: String },
    ebay_id: { type: String },
    etsy_id: { type: String },
    amazon_id: { type: String },
    shopee_id: { type: String },
    facebook_id: { type: String },
    tiktok_id: { type: String },
    list_view: { type: String },
    proxy_image_url: { type: String },
    // List date
    proxydate_delivery:{ type: String },
    proxydate_start: { type: String },
    proxydate_nextclass: { type: String },
    proxydate_verify: { type: String },
    proxydate_seller: { type: String },
    proxydate_verifybank: { type: String },
    proxydate_draft: { type: String },
    proxydate_list1: { type: String },
    proxydate_list2: { type: String },
    proxydate_list3: { type: String },
    proxydate_list4: { type: String },
    proxydate_list5: { type: String },
    proxydate_expectedseller: { type: String },
    proxydate_expectedlist1: { type: String },
    proxydate_expectedlist2: { type: String },
    proxydate_expectedlist3: { type: String },
    proxydate_expectedlist4: { type: String },
    proxydate_expectedlist5: { type: String },
    proxydate_suspended: { type: String },
    proxydate_checksus1: { type: String },
    proxydate_contact1: { type: String },
    proxydate_contact2: { type: String },
    proxydate_contact3: { type: String },
    proxydate_contact4: { type: String },
    proxydate_contact5: { type: String },
    proxydate_checksus2: { type: String },
    proxydate_checksus3: { type: String },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Proxy", proxySchema);