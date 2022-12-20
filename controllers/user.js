import User from '../models/user';
import jwt from "jsonwebtoken"; // Tạo ra mã JWT

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

// hàm phân quyền trong user
export const canViewUser = (req, res, next) => {
    const data = req.headers["x-access-token"] || req.headers["authorization"];
    const token = data.split(" ");
    if (!token) {
      return res.status(401).send("Bạn chưa đăng nhập, không tồn tại token");
    }
    try {
      const decoded = jwt.verify(token[1], "duy");
      User.findOne({ _id: decoded._id }).exec((err, user) => {
        if (!user) {
          return res.status(403).json({
            error: "Bạn chưa đăng nhập",
          });
        }
        if (
        user.users_owner.indexOf("Phòng hành chính nhân sự") != -1
        ) {
          next();
        } else {
          res.status(403).json({
            error: "Không có quyền truy cập user",
          });
        }
      });
    } catch (ex) {
      res.status(400).send("Token không chính xác");
    }
  };