import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const timeSheetSchema = mongoose.Schema(
  {
    users_name:{
      type: String,
    },
    working_session: {
      type: String,
    },
    working_date: {
      type: String,
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("TimeSheet", timeSheetSchema);
