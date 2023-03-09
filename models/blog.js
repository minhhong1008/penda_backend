import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const blogSchema = mongoose.Schema(
  {
    
    blog_title: { type: String },
    blog_thumbnail: { type: String },
    blog_description: { type: String },
    blog_view: { type: String },
    blog_date: { type: String },
    blog_employee: { type: String },
    blog_page: { type: String },
    blog_type: { type: String },
    blog_star: { type: String },
    blog_sort: { type: String },
    blog_content: { type: String },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
