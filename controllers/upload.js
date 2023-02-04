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

      let fileData = "";
      let fileName = "";
      if (files.file.path && files.file.name) {
        fileData = fs.readFileSync(files.file.path);
        fileName = files.file.name;
      }
      fs.writeFile("../Image/" + fileName, fileData, function (err) {
        if (err) {
          console.log(err);
          return;
        }
        res.json({
          status: "success",
          url: "https://files.penda.vn/" + fileName,
        });
      });
    }
  });
};

export const read = (req, res) => {};
