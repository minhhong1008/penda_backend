import User from '../models/user';
import jwt from 'jsonwebtoken'; // Tạo ra mã JWT
import expressJwt from 'express-jwt'; // Kiểm tra đăng nhập


export const signup = (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: "Không thể đăng kí tài khoản"
            })
        }
        res.json(user)
    })

}

export const signin = (req, res) => {
    //Lấy email, password từ client gửi lên
    const { email, password } = req.body;
    //Tìm email trong db xem có tồn tại không
    User.findOne({ email }, (error, user) => {
        if (error || !user) {
            //Nếu không tồn tại email trong db return về error
            return res.status(400).json({
                error: 'Tài khoản với email không tồn tại, hãy đăng kí tài khoản mới'
            })
        }
        // Nếu email có tồn tại tiếp tục so sánh mật khẩu
        // Sử dụng phương thức authenticate trong model với tham số là password để so sánh với password trong db
        if (!user.authenticate(password)) {
            //Nếu password không trùng khớp return về error
            return res.status(401).json({
                error: 'Email hoặc mật khẩu nhập vào không chính xác'
            })
        }
        // Tạo ra 1 token mới bằng thông tin nhập vào và mã JWT secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        console.log(token);
        // Lưu token vào cookie với key = 't' và value = token
        res.cookie('t', token, { expire: new Date() + 9999 });

        //Tạo ra user mới bằng dữ liệu trong db
        const { _id, name, email, role } = user;
        
        //Trả dữ liệu về client bằng user và json web token 
        return res.json(
            {
                token, user: { _id, email, name, role }
            }
        )
    })
}

export const requireSignin = expressJwt({
    secret: 'duy',
    algorithms: ["HS256"],
    userProperty: "auth",
});


export const signout = (req, res) => {
    res.clearCookie('t');
    res.json({
        message: 'Đăng xuất thành công'
    })
}


export const isAuth = (req, res, next) =>  {
    const data = req.headers["x-access-token"] || req.headers["authorization"];
    const token = data.split(' ')
    if (!token) {         
        return res.status(401).send("Bạn chưa đăng nhập, không tồn tại token")
    }
    try {
        const decoded = jwt.verify(token[1],'duy')
        let user = req.profile && req.profile._id == decoded._id
        if (!user) {
            return res.status(403).json({
                error: "Bạn chưa đăng nhập",
            })
        }
        next();
    } catch (ex) {
        console.log(ex)
        res.status(400).send("Token không chính xác");       
    }
}

export const isAdmin = (req, res, next) => {
    if (req.profile.role == 0) {
        return res.status(403).json({
            error: "Bạn không có quyền truy cập trang này"
        })
    }
    next();
}