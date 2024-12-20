import { Schema, model, Types } from "mongoose";

import {courseSchema } from "./course.js"

const studentSchema = Schema({
    date: { type: Date, default: new Date() },
    finishDate: {
        type: Date, default: () => {
            let d = new Date()
            return d.setDate(d.getDate() + 60)
        }
    },
    userId: {
        type: Types.ObjectId,
        ref: "users"//ממנה בעת הצורך הוא ידע לשלוך את היוזר המתאים לפי הקוד
    },
    course: [courseSchema],
  
    isPay: { type: Boolean, default: false }

})

export const studentModel = model("student", studentSchema);
 