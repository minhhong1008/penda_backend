import mongoose from 'mongoose';

const mailSchema = mongoose.Schema({
    mail_id: {type: String,required: true},
    mail_user: {type: String,},
    mail_password: {type: String},
    mail_recover: {type: String},
    mail_forward: {type: String},
    mail_type: {type: String},
    mail_owner: {type: String},
    mail_employee: {type: String,default: "Nguyễn Hoài"},
    mail_status: {type: String},
    mail_class: {type: String},
    maildate_creat: {type: String},
    maildate_verify: {type: String},
    mail_note: {type: String}
}, { timeStamps: true });

module.exports = mongoose.model("mail", mailSchema);