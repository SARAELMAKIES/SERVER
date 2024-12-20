import { Router } from "express";
import { add, deleteById, getAllcourse, getById, update } from "../controllers/course.js";

const router = Router();
router.get("/", getAllcourse);
router.get("/:id", getById);
router.delete("/:id", deleteById);
router.post("/", add);
router.put("/:id", update);


export default router;