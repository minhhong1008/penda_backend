import Category from '../models/category';
import formidable from 'formidable';
import _ from 'lodash';


export const create = (req, res) => {
    const form = formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {
        if (err) {
            return res.status(400).json({
                message: "Thêm danh mục thất bại"
            })
        }
        const { name } = fields;
        if (!name) {
            return res.status(400).json({
                message: "Hãy nhập đầy đủ thông tin"
            })
        }
        console.log(fields);
        let category = new Category(fields);
        category.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    message: "Không thể thêm danh mục"
                })
            }
            res.json(data)
        })
    })
}

export const cateByID = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            res.status(400).json({
                message: "Không tìm thấy danh mục"
            })
        }
        req.category = category;
        next();
    })
}

export const list = (req, res) => {
    Category.find((err, data) => {
        if(err){
            error: "Không tìm thấy danh mục"
        }
        res.json( { data } )

    })
}


export const read = (req, res) => {
    return res.json(req.category)
}

export const remove = (req, res) => {
    let category = req.category;
    category.remove((err, deleteCategory) => {
        if (err) {
            return res.status(400).json({
                message: "Xóa danh mục không thành công"
            })
        }
        res.json({
            deleteCategory,
            message: "Xóa danh mục thành công"
        })
    })
}

export const update = (req, res) => {
    const form = formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {
        if (err) {
            return res.status(400).json({
                message: "Sửa danh mục thất bại"
            })
        }
        const { name } = fields;
        if (!name) {
            return res.status(400).json({
                message: "Hãy nhập đầy đủ thông tin"
            })
        }
        console.log(fields);
        
        let category = req.category;
            category = _.assignIn(category, fields);

        category.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    message: "Không thể sửa danh mục"
                })
            }
            res.json(data)
        })
    })
}


