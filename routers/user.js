import { Router } from "express";
import {getAllUser,getById,addUser,update,updatePassword,getUserByUsernamePassword_Login} from "../controllers/user.js"

const router = Router();
router.get("/",getAllUser);
router.get("/:id", getById);
router.post("/", addUser);
router.post("/:id", getUserByUsernamePassword_Login);
router.put("/:id", update);
router.put("/password/:id", updatePassword);

export default router;