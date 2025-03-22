import bcrypt from 'bcrypt';
import { userModel, validateUser } from "../models/user.js";
import { generateToken } from "../utils/generateToken.js";

//שליפת כל המשתמשים 
export const getAllUser = async (req, res) => {
    try {
        let data = await userModel.find().select('-password');
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot get all user", message: err.message });
    }
}

//שליפת משתמש לפי ID
export const getById = async (req, res) => {
    let { id } = req.params;
    try {
        let data = await userModel.findById(Types.ObjectId(id)).select('-password');
        if (!data) return res.status(404).json({ title: "cannot find by id", message: "user with such id not found" });
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot get by id", message: err.message });
    }
};

//הוספת משתמש
export const addUser = async (req, res) => {
    let { body } = req;
    console.log(body);

    if (!body.password || !body.email)
        return res.status(400).json({ title: "cannot add user", message: "password, email are required" });
    //תקינות מjoy 
    let validate = validateUser(req.body);
    if (validate.error)
        return res.status(400).json(validate.error.details[0].message);
    try {

   //בדיקה על מייל שהוא יחודי
        let exist = await userModel.findOne({ email: body.email });
        if (exist)
            return res.status(409).json({ title: "cannot add user", message: "thid email alrday exist" });
    
    
        // הצפנת הסיסמה לפני שמירת המשתמש
        const hashedPassword = await bcrypt.hash(body.password, 10);


        // שמירה של המשתמש עם הסיסמה המוצפנת
        let newUser = new userModel({ ...body, password: hashedPassword });
        await newUser.save();

        let token = generateToken(newUser);
    
        res.json({ ...newUser.toObject(), token });
    } catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot add this user", message: err.message });
    }

};



//עדכון פרטי משתמש ללא סיסמא
export const update = async (req, res) => {
    let { id } = req.params;
    let body = req.body;
    if (body.password)
        return res.status(404).json({ title: "cannot update password", message: "cannot update password here" });

    try {
        let data = await userModel.findByIdAndUpdate(id, body, { new: true }).select('-password');
        if (!data) return res.status(404).json({ title: "cannot update by id", message: "user with such id not found" });
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot update", message: err.message });
    }
}

//עדכון סיסמא
export const updatePassword = async (req, res) => {
    let { id } = req.params;
    let body = req.body;
    if (!body.password || body.userName || body.email)
        return res.status(404).json({ title: "only update password", message: "cannot update email or userName" });

    try {


        // הצפנת הסיסמה החדשה לפני שמירתה
        const hashedPassword = await bcrypt.hash(body.password, 10);

        let data = await userModel.findByIdAndUpdate(id, { password: hashedPassword }, { new: true }).select('-password');
        if (!data) return res.status(404).json({ title: "cannot update by id", message: "user with such id not found" });
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot update", message: err.message });
    }
}
//כניסה
export async function getUserByUsernamePassword_Login(req, res) {
    try {
        if (!req.body.password || !req.body.email)
            return res.status(404).json({ title: "miising username or password", message: "missing" });
        let data = await userModel.findOne({ email: req.body.email }).lean();
        if (!data) {
            return res.status(404).json({ title: "no such user", message: "cannot found user with such email" });
        }

        let verifyPassword = await bcrypt.compare(req.body.password, data.password);
        if (!verifyPassword)
            return res.status(404).json({ title: "cannot found user with such deatekies", message: "worng password" });

        let token = generateToken({ ...data });

        let { password, ...other } = data;

        other.token = token;
        console.log(other);
        res.json(other);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot log in user", message: err.message });
    }
}