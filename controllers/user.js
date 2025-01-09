import { userModel } from "../models/user.js"
//שליפת כל המשתמשים 
export const getAllUser = async (req, res) => {
    try {
        let data = await userModel.find().select('-password');
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot get all user", message: err.message })

    }
}
//שליפת משתמש לפי ID

export const getById = async (req, res) => {
    let { id } = req.params;
    try {
        let data = await userModel.findById(id).select('-password');
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
    if (!body.password || !body.email)
        return res.status(400).json({ title: "cannot add user", message: "password, email are require" })
    try {
        let newUser = new userModel(body);
        await newUser.save();
        res.json(newUser);
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot add this user", message: err.message })
    }
}

//עדכון פרטי משתמש ללא סיסמא

export const update = async (req, res) => {
    let { id } = req.params;
    let body = req.body;
    if (body.password)
        return res.status(404).json({ title: "cannot update password", message: "cannot update here password" })
    try {
        let data = await userModel.findByIdAndUpdate(id, body, { new: true }).select('-password');
        if (!data) return res.status(404).json({ title: "cannot update by id", message: "user with such id not found" });
        res.json(data);
    } catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot update", message: err.message });
    }
}
//עדכון  סיסמא
export const updatePassword = async (req, res) => {
    let { id } = req.params;
    let body = req.body;
    if (!body.password || body.userName || body.email)
      return  res.status(404).json({ title: "only update password", message: "cannot update email userName" })
    try {
        let data = await userModel.findByIdAndUpdate(id, { password: body.password }, { new: true }).select('-password');
        if (!data) return res.status(404).json({ title: "cannot update by id", message: "user with such id not found" });
        res.json(data);
    } catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot update", message: err.message });
    }
}


//כניסה 
export async function getUserByUsernamePassword_Login(req, res) {
    try {
        let data = await userModel.findOne({
            password: req.body.password,
            username: req.body.userName
        }).select('-password');

        if (!data) {
            return res.status(404).json({
                title: "cannot find user with such details",
                message: "wrong username or password"
            });
        }

        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            title: "cannot log in user",
            message: err.message
        });
    }
}


