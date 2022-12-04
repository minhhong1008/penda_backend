import mongoose from 'mongoose';

const ebaySchema = mongoose.Schema({
    ebay_user: {
        type: String,
        required: true
    },
    birth_date: {
        type: String,
    },
    ebay_password: {
        type: String,
    },
    ebay_status: {
        type: String,
    },
    ebay_class: {
        type: String,
        default: "Lớp 1",
    },
    ebay_employee: {
        type: String,
        default: "Nguyễn Hoài"
    }
}, { timeStamps: true });

module.exports = mongoose.model("Ebay", ebaySchema);