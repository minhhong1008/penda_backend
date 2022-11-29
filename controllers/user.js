import User from '../models/user';

export const userbyId = (req, res, next, id) => {
    User.findById(id).exec((error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        req.profile = user;
        next()
    })
}

export const read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;

    return res.json(req.profile);
}

export const update = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.profile.id },
        { $set: req.body },
        { new: true },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: 'Bạn không được phép thực hiện hành động này'
                })
            }
            req.profile.hashed_password = undefined;
            req.profile.salt = undefined;
            res.json(user);
        }
    )
}

export const list = (req, res) => {
    User.find((err, data) => {
        if (err) {
            error: "Không tìm người dùng"
        }
        res.json({ data })
    })
}

export const remove = (req, res) => {
    let user = req.profile;
    user.remove((err, deleteUser) => {
        if (err) {
            return res.status(400).json({
                message: "Xóa người dùng không thành công"
            })
        }
        res.json({
            deleteUser,
            message: "Xóa người dùng thành công"
        })
    })
}