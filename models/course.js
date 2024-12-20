import { model, Schema } from "mongoose";


const teacherSchema = Schema({
    firstName: String,
    lastName: String,
    address: String
})


const courseSchema = Schema({
    name: String,
    numRoom: Number,
    publishDate: { type: Date, default: new Date() },
    teacher: teacherSchema
    
})
//לכתוב שם ביחיד כי הוא הופך לרבים

export const courseModel = model("course", courseSchema);