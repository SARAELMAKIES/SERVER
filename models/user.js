import { Schema, model } from "mongoose";
import Joi from "joi";

const userSchema = Schema({
    userName: String,
    email: String,
    password: String,
    role: { type: String, default: "USER" },
    date: { type: Date, default: new Date() },
    token: { type: String }
});

export const userModel = model("user", userSchema);

/**
 * סכמה לאימות נתוני משתמש באמצעות Joi
 */
export const validateUser = (user) => {
    const userJoi = Joi.object({
        userName: Joi.string().min(3).max(30).required().messages({
            "string.empty": "שם המשתמש הוא שדה חובה",
            "string.min": "שם המשתמש חייב להכיל לפחות 3 תווים",
            "string.max": "שם המשתמש לא יכול להכיל יותר מ-30 תווים"
        }),
        email: Joi.string().email().required().messages({
            "string.email": "האימייל אינו תקין",
            "string.empty": "האימייל הוא שדה חובה"
        }),
        password: Joi.string().min(8).max(100).required().pattern(new RegExp("^[A-Za-z\\d]{8,}$")).messages({
            "string.min": "הסיסמה חייבת להכיל לפחות 8 תווים",
             "string.pattern": "הסיסמה חייבת לכלול אות גדולה, אות קטנה, מספר ותו מיוחד"
        })
    }).unknown();
    return userJoi.validate(user);
};


