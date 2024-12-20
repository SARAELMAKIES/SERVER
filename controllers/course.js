import { courseModel } from "../models/course.js"


// export const getAllBooks = (req, res) => {
//     bookModel.find().then(data => {
//         res.json(data)
//     }).catch(err => {
//         console.log(err)
//         res.status(400).json({ title: "cannot get all", message: err.message })
//     })
// }
export const getAllcourse = async (req, res) => {
    try {
        let data = await courseModel.find();
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot get all", message: err.message })
    }
}
export const getById = async (req, res) => {
    let { id } = req.params
    try {
        let data = await courseModel.findById(id)
        if (!data)
            return res.status(404).json({ title: "cannot find by id", message: "book with such id not found" })
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot get byid", message: err.message })
    }
}
export const update = async (req, res) => {
    let { id } = req.params
    let body = req.body;
    try {

        let data = await courseModel.findByIdAndUpdate(id, body, { new: true })
        if (!data)
            return res.status(404).json({ title: "cannot update by id", message: "book with such id not found" })
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot update", message: err.message })
    }
}
export const deleteById = async (req, res) => {
    let { id } = req.params
    try {
        let data = await courseModel.findByIdAndDelete(id)
        if (!data)
            return res.status(404).json({ title: "cannot delete by id", message: "book with such id not found" })
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot delete", message: err.message })
    }
}
export const add = async (req, res) => {

    let { body } = req;
    if (!body.name || !body.numPages)
        return res.json({ title: "cannot add", message: "missing parameters name or numPages" })
    try {
        let newcourse = new courseModel(body);
        let data = await newcourse.save()
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot add", message: err.message })
    }
}