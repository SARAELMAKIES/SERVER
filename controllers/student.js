import { studentModel } from "../models/student.js"
import { userModel } from "../models/user.js";

export const getAllStudents = async (req, res) => {

    try {
        let result = await studentModel.find();
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ title: "cannot get all", message: err.message })
    }
}
export const getStudentById = async (req, res) => {
    try {
        let result = await studentModel.findById(req.params.id);
        if (!result)
            return res.status(404).json({ title: "cannot find by id", message: "student  with such id not found" })
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ title: "cannot get byID", message: err.message })
    }
}
export const getStudentByUserId = async (req, res) => {
    let { userid } = req.params;
    try {
        let result = await studentModel.find({ userId: userid });
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ title: "cannot get all by user id", message: err.message })
    }

}
export const returnStudent = async (req, res) => {
    try {
        let result = await studentModel.findByIdAndUpdate(req.params.id,{ isPay: true }, { new: true });
        if (!result)
            return res.status(404).json({ title: "cannot update by id", message: "student  with such id not found" })
        if (new Date(result.finishDate) < new Date()) {
            let user = await userModel.findByIdAndUpdate(result.userId, { fine: { $inc:  10 } }, { new: true })
            res.json({ result: result, message: "too late you got a fine" });
        }
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ title: "cannot update byID", message: err.message })
    }


}
// export const updateReturnDateById = async (req, res) => {
//     let body = req.body
//     if (new Date(body.returnDate) < new Date())
//         return res.status(404).json({ title: "cannot update too past date", message: "" })
//     try {
//         let x = await borrowModel.findById(req.params.id);
//         if (x.date > body.returnDate)
//             return res.status(409).json({ title: "cannot update return date", message: "return date cannot be before taking date" })
//         let result = await borrowModel.findByIdAndUpdate(req.params.id, { returnDate: body.returnDate }, { new: true });
//         if (!result)
//             return res.status(404).json({ title: "cannot update by id", message: "borrow with such id not found" })
//         res.json(result);
//     }
//     catch (err) {
//         res.status(400).json({ title: "cannot update return date", message: err.message })
//     }

// }
export const addStudent = async (req, res) => {
    let { body } = req;
    if (!body.userId || !body.course)
        return res.status(404).json({ title: "cannot add borreow", message: "missing details:userId/course" })
    try {
        let user = await userModel.findById(body.userId)
        if (!user)
            return res.status(404).json({ title: "no such user", message: "" })
        if (user.fine > 0)
            return res.status(403).json({ title: "this user neewd to pay fine", message: "cannot borrow" })
        let newstudent = new studentModel(body)
        await newstudent.save();
        res.json(newstudent);
    }
    catch (err) {
        res.status(400).json({ title: "cannot update byIDnewstudent", message: err.message })
    }
}