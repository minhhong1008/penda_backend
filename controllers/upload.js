import formidable from "formidable";
import fs from "fs";
import _ from "lodash";
import path from "path";

export const upload = (req, res) => {
  const form = formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        message: "Upload lỗi",
      });
    }
    if (files) {
      if (files.size > 10000000) {
        res.status(400).json({
          message: "Bạn nên Upload ảnh dưới 10MB",
        });
      }
      let fileData = fs.readFileSync(files.file.path);
      let fileName = files.file.name;
      fs.writeFile("../Image/" + fileName, fileData, function (err) {
        if (err) {
          return console.log(err);
        }
        res.json({
            status: "success",
            url: "C:/Users/ADMIN/Desktop/penda_nodejs/Image/" + fileName
        })
      });
    }
  });
};

export const read = (req, res) => {

}
