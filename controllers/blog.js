import Blog from "../models/blog";

export const create = (req, res) => {
  const blog = new Blog(req.body);
  blog.save((err, blog) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm bài viết không thành công",
      });
    }
    res.json(blog);
  });
};

export const update = (req, res) => {
  var datablog = req.body.values;
    for (const key in datablog) {
      if (datablog[key] == "" || datablog[key] == "undefinded") {
        delete datablog[key];
      }
    }
  Blog.findOneAndUpdate(
    { _id: req.body.id },
    { $set: datablog },
    { useFindAndModify: false },
    (err, blog) => {
      if (err) {
        return res.status(400).json({
          error: "Bạn không được phép thực hiện hành động này",
        });
      }
      
      res.json(blog);
    }
  );
};


export const list = (req, res) => {
  Blog.find({ blog_page: req.query.blog_page })
    .sort({ blog_sort: "descending" })
    .collation({ locale: "en_US", numericOrdering: true })
    .exec((err, blog) => {
      if (err || !blog) {
        return res.status(400).json({
          error: "không thành công",
        });
      } else {
        return res.status(200).json(blog);
      }
    });
};

export const content = (req, res) => {
  let id = req.params.id;
  Blog.findOne({ _id: id }).exec((err, blog) => {
    if (err || !blog) {
      return;
    } else {
      return res.status(200).json(blog);
    }
  });
};
