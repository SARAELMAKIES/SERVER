import { Router } from "express";
import { getAllUser, getById, addUser, update, updatePassword, getUserByUsernamePassword_Login } from "../controllers/user.js"
import { isUserIn, isUserManager } from "../middlewares/isUserIn.js";

const router = Router();
router.get("/",isUserManager, getAllUser);
router.get("/:id", getById);
router.post("/", addUser);
router.post("/login", getUserByUsernamePassword_Login);
router.put("/:id", update);
router.put("/password/:id", updatePassword);

export default router;