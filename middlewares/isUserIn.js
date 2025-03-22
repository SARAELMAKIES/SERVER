import jwt from "jsonwebtoken";
let verify = jwt.verify;

export function isUserIn(req, res, next) {
    if (!req.headers.authorization)

        return res.status(401).json({ title: "מתשמש לא רשום", message: "קודם בצע כניסה או הרשמה" })
    let authorization = req.headers.authorization;
    try {


        let result = verify(authorization, process.env.SECRET_KEY);
        req.u = result;
        return next()
    }
    catch (err) {
        return res.status(401).json({ title: "מתשמש לא רשום", message: "קודם בצע כניסה או הרשמה" + err.message })
    }

}
export function isUserManager(req, res, next) {
    if (!req.headers.authorization)

        return res.status(401).json({ title: "מתשמש לא רשום", message: "קודם בצע כניסה או הרשמה" })
    let authorization = req.headers.authorization;
    try {


        let result = verify(authorization, process.env.SECRET_KEY);
        req.u = result;
        console.log(result);
        
        if (result.role != "MANAGER")
            return res.status(403).json({ title: "אין לך רשות לפבצע פעולה זו", message: "נדרשת השראת מנהל...." })
        return next()
    }
    catch (err) {
        return res.status(401).json({ title: "מתשמש לא רשום", message: "קודם בצע כניסה או הרשמה" + err.message })
    }

}