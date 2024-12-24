import express from "express"
import courseRouter from "./routers/course.js";
import userRouter from "./routers/user.js";
import { connectToDb } from "./config/DB.js";
import dotenv from "dotenv"
import fs from "fs/promises";
import cors from "cors"
async function PrintToLog(req, res, next) {

    try {
    
    await fs.appendFile("./log.txt", ` ${new Date().toLocaleDateString()} ${req.method} ${req.url}`);
    
    next();
    
    } catch (err) {
    
    return res.status(400).json({ title: "error in print to Log", message: err.message });
    
    }
    
    }
    

// function PrintToLog(req, res, next) {
//     try {


//         fs.appendFile("./log.txt", ` ${new Date().toLocaleDateString()} ${req.method} ${req.url}`)
//         next();
//     }
//     catch (err) {
//         return res.status(400).json({ title: "error in printto Log", message: err.message })
//     }
// }

dotenv.config()
const app = express();
connectToDb()
app.use(PrintToLog)
app.use(cors())
app.use(express.json())
app.use("/api/course", courseRouter);
app.use("/api/user", userRouter);

let port = process.env.PORT;

app.listen(port, "localhost", () => {
    console.log("app is listening on port " + port)
})