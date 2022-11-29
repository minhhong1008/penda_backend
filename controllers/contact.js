import Contact from '../models/contact';
import formidable from 'formidable';
import _ from 'lodash';


export const create = (req, res) => {

    const contact = new Contact(req.body);
    contact.save((err, contact) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: "Không thể gửi liên hệ"
            })
        }
        res.json(contact)
    })
}

export const list = (req, res) => {
    Contact.find((err, data) => {
        if(err){
            error: "Không tìm thấy liên hệ"
        }
        res.json( { data } )
    })
}

export const contactByID = (req, res, next, id) => {
    Contact.findById(id).exec((err, contact) => {
        if (err || !contact) {
            res.status(400).json({
                message: "Không tìm thấy liên hệ"
            })  
        }
        req.contact = contact;
        next();
    })
}

export const read = (req, res) => {
    return res.json(req.contact)
}

export const remove = (req, res) => {
    let contact = req.contact;
    contact.remove((err, deleteContact) => {
        if (err) {
            return res.status(400).json({
                message: "Xóa liên hệ không thành công"
            })
        }
        res.json({
            deleteContact,
            message: "Xóa liên hệ thành công"
        })
    })
}


