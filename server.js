import express from "express";
import userRouter from "./routers/user.js";
import productRouter from "./routers/product.js";
import orderRouter from "./routers/order.js";
import { connectToDb } from "./config/DB.js"; // הייבוא אחרי תיקון

import dotenv from "dotenv";
import { connect } from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();
connectToDb(); // חיבור למסד נתונים
app.use(cors());
app.use(express.json());
app.use("/api/order", orderRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

let port = process.env.PORT;
app.listen(port, "0.0.0.0", () => {
    console.log("app is listening on port " + port);
});
