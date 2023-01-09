import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const projectSchema = mongoose.Schema(
  {
    project_id: { type: String },
    project_date_start: { type: String },
    project_date_end: { type: String },
    project_content: { type: String },
    project_number:{ type: String },
    project_owner: { type: String },
    project_employee: { type: String },
    project_employee_request: { type: String },
    project_status: { type: String },
    project_work: { type: String },
    project_review: { type: String },
    project_error: { type: String },
    project_processing: { type: String },
    project_type: { type: String },
    project_work_item: { type: String },
    project_note: { type: String },
    project_note_active: { type: String },
   
    project_image_url: { type: String },
   
  },
  { timeStamps: true }
);

module.exports = mongoose.model("project", projectSchema);
