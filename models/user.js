import mongoose from "mongoose";
import crypto from "crypto";

const { v1: uuidv1 } = require("uuid");

const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    hashed_password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    users_id: { type: String },
    users_sex: { type: String },
    usersdate_birthday: { type: String },
    users_fullname: { type: String },
    users_passport: { type: String },
    users_ssn: { type: String },
    users_origin: { type: String },
    users_code: { type: String },
    users_residence: { type: String },
    usersdate_expiry: { type: String },
    usersdate_start: { type: String },
    usersdate_begin: { type: String },
    users_name: { type: String },
    users_passwords: { type: String },
    users_name: { type: String },
    users_aliases: { type: String },
    users_phone: { type: String },
    users_fb: { type: String },
    users_mail: { type: String },
    users_bank: { type: String },
    users_banknumber: { type: String },
    users_sort: { type: String },
    users_level: { type: String },
    users_major: { type: String },
    users_function: { type: String },
    users_owner: { type: String },
    manage_view: { type: String },
    users_status: { type: String, default: "New" },
    users_salary: { type: String },
    email: { type: String }
  },
  { timestamps: true }
);

userSchema
  .virtual("users_password")
  .set(function (users_password) {
    this._password = users_password;
    this.salt = uuidv1();
    this.hashed_password = this.encrytPassword(users_password);
  })
  .get(function () {
    return this._password;
  });
userSchema.methods = {
  authenticate: function (plainText) {
    return this.encrytPassword(plainText) === this.hashed_password;
  },
  encrytPassword: function (users_password) {
    if (!users_password) {
      return "";
    }
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(users_password)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
