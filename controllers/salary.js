import Salary from "../models/salary";
export const list = (req, res) => {
    let date = req.query.month.toString() + "-" + req.query.year.toString();
    Salary.find({ time: date }).exec((err, data) => {
        if(err || !data){
            return
        } else {
            return res.json(data);
        }
    })
}