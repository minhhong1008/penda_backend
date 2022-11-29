import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const productSchema = mongoose.Schema({
    name: {
        type: String,
        strim: true,
        maxLength: 100,
        required: true
    },
    quantity: {
        type: Number
    },
    description: {
        type: String,
        require: true,
        maxLength: 2000
    },
    price: {
        require: true,
        type: Number
    },
    shipping: {
        type: Boolean
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    category: {
        type: ObjectId,
        ref: 'Category'
    }
}, { timeStamps: true });

module.exports = mongoose.model("Product", productSchema);