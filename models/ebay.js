import mongoose from 'mongoose';

const ebaySchema = mongoose.Schema({
    ebay_id: {type: String,required: true},
    ebay_user: {type: String},
    ebay_password: {type: String},
    ebay_processing: {type: String},
    ebay_type: {type: String},
    ebay_sell_status: {type: String},
    ebay_owner: {type: String},
    ebay_employee: {type: String,default: "Nguyễn Hoài"},
    ebay_outline: {type: String},
    ebay_status: {type: String},
    ebay_class: {type: String},
    ebaydate_creat: {type: String},
    ebaydate_verify: {type: String},
    ebaydate_seller: {type: String},
    ebaydate_list1: {type: String},
    ebaydate_list2: {type: String},
    ebaydate_list3: {type: String},
    ebaydate_list4: {type: String},
    ebaydate_list5: {type: String},
    ebaydate_list6: {type: String},
    ebaydate_suspended: {type: String},
    ebaydate_contact: {type: String},
    ebaydate_restore: {type: String},
    ebaydate_class: {type: String},
    ebaydate_request_upseller: {type: String},
    ebaydate_request_list1: {type: String},
    ebaydate_request_list2: {type: String},
    ebaydate_request_list3: {type: String},
    ebaydate_request_list4: {type: String},
    ebay_note: {type: String}
}, { timeStamps: true });

module.exports = mongoose.model("Ebay", ebaySchema);