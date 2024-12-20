import { Router } from "express";
import { add_signUp, getAllUsers, getById, getUserByUsernamePassword_Login, update } from "../controllers/user.js";

const router = Router();
router.get("/", getAllUsers);
router.get("/:id", getById);

router.post("/", add_signUp);
router.put("/:id", update);
router.post("/login", getUserByUsernamePassword_Login);


export default router;