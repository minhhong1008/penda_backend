import Product from '../models/product.js';
import formidable from 'formidable';
import fs from 'fs';
import _ from 'lodash';


export const create = (req, res) => {
    const form = formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                message: "Thêm sản phẩm thất bại"
            })
        }
        const { name, description, price } = fields;
        if (!name || !description || !price) {
            return res.status(400).json({
                message: "Hãy nhập đầy đủ thông tin"
            })
        }
        console.log(fields);
        let product = new Product(fields);
        if (files.photo) {
            if (files.photo.size > 10000000) {
                res.status(400).json({
                    message: "Bạn nên Upload ảnh dưới 10MB"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, data) => {
            if (err) {
                
                return res.status(400).json({
                    message: "Không thể thêm sản phẩm"
                })
            }
            res.json(data)
        })
    })
}

export const list = (req, res) => {
    Product.find((err, data) => {
        if(err){
            error: "Không tìm thấy sản phẩm"
        }
        res.json( { data } )
    })
}

export const productByID = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            res.status(400).json({
                message: "Không tìm thấy sản phẩm"
            })  
        }
        req.product = product;
        next();
    })
}

export const read = (req, res) => {
    return res.json(req.product)
}

export const remove = (req, res) => {
    let product = req.product;
    product.remove((err, deleteProduct) => {
        if (err) {
            return res.status(400).json({
                message: "Xóa sản phẩm không thành công"
            })
        }
        res.json({
            deleteProduct,
            message: "Xóa sản phẩm thành công"
        })
    })
}

export const update = (req, res) => {
    const form = formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                message: "Sửa sản phẩm thất bại"
            })
        }
        const { name, description, price } = fields;
        if (!name || !description || !price) {
            return res.status(400).json({
                message: "Hãy nhập đầy đủ thông tin"
            })
        }
        console.log(fields);
        let product = req.product;
            product = _.assignIn(product, fields);

        if (files.photo) {
            if (files.photo.size > 10000000) {
                res.status(400).json({
                    message: "Bạn nên Upload ảnh dưới 1MB"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
        product.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    message: "Không thể sửa sản phẩm"
                })
            }
            res.json(data)
        })
    })
}

export const photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}

