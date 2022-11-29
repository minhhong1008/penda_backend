import Department from '../models/department'

export const create = (req, res) => {
    const department = new Department(req.body);
    department.save(( err, department ) => {
        if(err) {
            console.log(err);
            return res.status(400).json({
                error: "Thêm phòng ban không thành công"
            })
        }
        res.json(department)
    } )
}

export const list = (req, res) => {
    Department.find((err, data) => {
        if(err){
            error: "Không tìm thấy phòng ban"
        }
        res.json( { data } )
    })
}



export const remove = (req, res) => {
    const id = req.body.id
    Department.findByIdAndRemove(id).exec( (err, department) => {
        if(err){
            return res.json(
                {
                    error: err
                }
            )
        }
        return res.json({
            message: "Xóa phòng ban thành công",
            department,
        });
    })
}