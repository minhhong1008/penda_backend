import mongoose from 'mongoose';

const departmentSchema = mongoose.Schema({
    name: {
        type: String,
        strim: true,
        maxLength: 32,
        required: true
    },
    employees_number: {
        type: Number,
        require: true,
    }
}, { timeStamps: true });

module.exports = mongoose.model("Department", departmentSchema)