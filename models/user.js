import mongoose from 'mongoose';
import crypto from 'crypto';

const { v1: uuidv1 } = require('uuid');

const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: 32
    },
    hashed_password: {
        type: String,
        required: true,
    },
    salt: {
        type: String
    },
    birth_date: {
        type: String,
        default: ''
    },
    about: {
        type: String,
        default: ''
    },
    role: {
        type: Number,
        default: 0
    },
    location: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    identity_card_number: {
        type: String,
        default: ''
    },
    bank_name: {
        type: String,
        default: ''
    },
    bank_number: {
        type: String,
        default: ''
    },
    salary: {
        type: Number,
        default: 0
    },
    actived: {
        type: Boolean,
        default: false
    },
    department: {
        type: ObjectId,
        ref: 'Department'
    }

}, { timestamps: true });


userSchema.virtual('password')
    .set(function (password) {
        this._password = password
        this.salt = uuidv1()
        this.hashed_password = this.encrytPassword(password)
    })
    .get(function () {
        return this._password
    })
userSchema.methods = {
    authenticate: function (plainText) {
        return this.encrytPassword(plainText) === this.hashed_password;
    },
    encrytPassword: function (password) {
        if (!password) {
            return '';
        }
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (error) {
            return '';
        }
    }
}

module.exports = mongoose.model("User", userSchema);
