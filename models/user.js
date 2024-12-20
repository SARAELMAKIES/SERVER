import { Schema ,model} from "mongoose";

const userSchema = Schema({
    username: String,
    password: String,
    email: String,
    phone: String
})

export const userModel=model("user",userSchema)